#!/usr/bin/env node

import { program } from 'commander';
import { create } from '../cli/create.js';

program
  .name('create-figma-plugin-native')
  .description('Scaffold production-ready Figma plugins with native design system')
  .version('1.0.0')
  .argument('[project-name]', 'name of the project')
  .option('-t, --template <name>', 'template to use: create-figma-plugin or plugma', 'create-figma-plugin')
  .option('-f, --framework <name>', 'framework for Plugma: react, svelte, vue, vanilla', 'react')
  .option('--tailwind', 'include Tailwind CSS', true)
  .option('--components', 'include custom components', true)
  .option('--no-docs', 'skip documentation')
  .option('--no-skill', 'skip Claude skill')
  .option('--no-cursor', 'skip Cursor rules')
  .option('--typescript', 'use TypeScript', true)
  .action(async (projectName, options) => {
    try {
      await create(projectName, options);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program.parse();
