import prompts from 'prompts';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function create(projectName, options) {
  let targetDir = projectName;

  // Interactive prompts if no project name provided
  if (!projectName) {
    const response = await prompts([
      {
        type: 'text',
        name: 'projectName',
        message: 'Project name:',
        initial: 'my-figma-plugin',
        validate: (value) => value.length > 0 || 'Project name is required'
      },
      {
        type: 'select',
        name: 'template',
        message: 'Choose a template:',
        choices: [
          { title: '@create-figma-plugin (Preact)', value: 'create-figma-plugin', description: 'Native Figma UI components with Preact' },
          { title: 'Plugma (React/Svelte/Vue)', value: 'plugma', description: 'Modern tooling with HMR and framework choice' }
        ],
        initial: 0
      },
      {
        type: (prev) => prev === 'plugma' ? 'select' : null,
        name: 'framework',
        message: 'Choose a framework:',
        choices: [
          { title: 'React', value: 'react' },
          { title: 'Svelte', value: 'svelte' },
          { title: 'Vue', value: 'vue' },
          { title: 'Vanilla JS/TS', value: 'vanilla' }
        ],
        initial: 0
      },
      {
        type: 'confirm',
        name: 'tailwind',
        message: 'Include Tailwind CSS?',
        initial: true
      },
      {
        type: 'confirm',
        name: 'components',
        message: 'Include custom components (Checkbox, Radio, Toggle)?',
        initial: true
      },
      {
        type: 'confirm',
        name: 'docs',
        message: 'Include documentation?',
        initial: true
      },
      {
        type: 'confirm',
        name: 'skill',
        message: 'Include Claude skill?',
        initial: true
      },
      {
        type: 'confirm',
        name: 'cursor',
        message: 'Include Cursor rules?',
        initial: true
      }
    ]);

    if (!response.projectName) {
      console.log(chalk.red('✖') + ' Project creation cancelled');
      process.exit(1);
    }

    targetDir = response.projectName;
    Object.assign(options, response);
  }

  const root = path.resolve(targetDir);
  
  // Check if directory exists
  if (fs.existsSync(root)) {
    const { overwrite } = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: `Directory ${chalk.cyan(targetDir)} already exists. Overwrite?`,
      initial: false
    });

    if (!overwrite) {
      console.log(chalk.red('✖') + ' Project creation cancelled');
      process.exit(1);
    }

    await fs.emptyDir(root);
  }

  console.log();
  console.log(chalk.bold('Creating project at ') + chalk.cyan(root));
  console.log();

  // Create project directory
  await fs.ensureDir(root);

  // Copy template
  const template = options.template || 'create-figma-plugin';
  const templateDir = path.join(__dirname, '..', 'templates', template);
  
  console.log(chalk.gray('  Copying template files...'));
  await fs.copy(templateDir, root);

  // Update package.json with project name
  const pkgPath = path.join(root, 'package.json');
  const pkg = await fs.readJSON(pkgPath);
  pkg.name = targetDir;
  await fs.writeJSON(pkgPath, pkg, { spaces: 2 });

  // Copy documentation if requested
  if (options.docs !== false) {
    console.log(chalk.gray('  Adding documentation...'));
    const docsDir = path.join(__dirname, '..', 'docs');
    await fs.copy(docsDir, path.join(root, 'docs'));
  }

  // Copy custom components if requested
  if (options.components !== false) {
    console.log(chalk.gray('  Adding custom components...'));
    // Components are already in template
  }

  // Copy Claude skill if requested
  if (options.skill !== false) {
    console.log(chalk.gray('  Adding Claude skill...'));
    const skillPath = path.join(__dirname, '..', 'skills', 'figma-plugin.skill');
    if (await fs.pathExists(skillPath)) {
      await fs.copy(skillPath, path.join(root, 'figma-plugin.skill'));
    }
  }

  // Copy Cursor rules if requested
  if (options.cursor !== false) {
    console.log(chalk.gray('  Adding Cursor rules...'));
    // .cursorrules already in template
  }

  console.log();
  console.log(chalk.green('✨ Success!') + ' Created ' + chalk.cyan(targetDir) + ' at ' + chalk.gray(root));
  console.log();

  if (options.docs !== false) {
    console.log(chalk.bold('📚 Documentation installed in ./docs/'));
    console.log('   Read ' + chalk.cyan('FIGMA-PLUGIN-DESIGN-PRINCIPLES.md') + ' first!');
    console.log();
  }

  if (options.skill !== false || options.cursor !== false) {
    console.log(chalk.bold('🤖 AI Integration:'));
    if (options.cursor !== false) {
      console.log('   - .cursorrules configured for Cursor IDE');
    }
    if (options.skill !== false) {
      console.log('   - figma-plugin.skill available for Claude');
    }
    console.log();
  }

  console.log(chalk.bold('📦 Next steps:'));
  console.log('   1. ' + chalk.cyan(`cd ${targetDir}`));
  console.log('   2. ' + chalk.cyan('npm install'));
  console.log('   3. ' + chalk.cyan('npm run watch'));
  console.log();

  if (options.docs !== false) {
    console.log(chalk.bold('🎨 Building with AI:'));
    console.log('   Share ' + chalk.cyan('./docs/FIGMA-PLUGIN-DESIGN-PRINCIPLES.md') + ' with your AI assistant');
    console.log('   and describe what you want to build!');
    console.log();
  }

  console.log(chalk.gray('📖 Full documentation: ./docs/README.md'));
  console.log();
}
