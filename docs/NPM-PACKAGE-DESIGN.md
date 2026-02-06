# npm Package Design: create-figma-plugin-ai

## Package Overview

**Name:** `create-figma-plugin-ai`  
**Command:** `npm create figma-plugin-ai@latest`  
**Tagline:** "Scaffold production-ready Figma plugins with AI-optimized documentation and best practices"

---

## What It Provides

### 1. **Interactive CLI Scaffolding Tool**
Similar to `create-react-app`, but for Figma plugins with AI documentation included.

```bash
npm create figma-plugin-ai@latest my-plugin

# Interactive prompts:
# 1. Choose framework: create-figma-plugin (Preact) or Plugma (React/Svelte/Vue)
# 2. Include Tailwind CSS? (Y/n)
# 3. Include custom components? (Checkbox, Radio, Toggle, etc.)
# 4. Include Claude skill? (Y/n)
# 5. Include Cursor rules? (Y/n)
# 6. Include documentation? (Y/n - full docs in /docs folder)
```

### 2. **Pre-Configured Project Templates**
Two templates included:

#### Template A: `@create-figma-plugin` (Preact)
- Full setup from Quick Start guide
- Tailwind CSS v4 configured
- Custom scrollbar styles
- Design system CSS variables
- TypeScript configured
- All documentation in `/docs`
- `.cursorrules` configured
- `figma-plugin.skill` included

#### Template B: `Plugma` (Multi-Framework)
- Plugma base setup
- Framework choice (React/Svelte/Vue)
- Design system CSS variables
- Custom component implementations adapted for chosen framework
- Documentation adapted for Plugma
- `.cursorrules` configured
- `figma-plugin.skill` included

### 3. **Bundled Documentation**
All documentation files installed in `./docs/`:
- FIGMA-PLUGIN-DESIGN-PRINCIPLES.md
- FIGMA-PLUGIN-UI-COMPONENTS-REFERENCE.md
- FIGMA-PLUGIN-DESIGN-SYSTEM.md
- FIGMA-PLUGIN-QUICK-START.md
- FIGMA-PLUGIN-CHEAT-SHEET.md
- COMPARISON.md

### 4. **Custom Components Library** (Optional)
Pre-built components in `./src/components/`:
- Checkbox.tsx
- Radio.tsx
- Toggle.tsx
- Tabs.tsx
- Modal.tsx

### 5. **AI Integration Files**
- `.cursorrules` - Cursor IDE rules
- `figma-plugin.skill` - Claude skill
- `AI-GUIDE.md` - Quick reference for AI assistants

---

## Package Structure

```
create-figma-plugin-ai/
├── package.json
├── README.md
├── bin/
│   └── create-figma-plugin-ai.js    (CLI entry point)
├── templates/
│   ├── create-figma-plugin/         (Preact template)
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── ui.tsx
│   │   │   ├── input.css
│   │   │   └── components/
│   │   │       ├── Checkbox.tsx
│   │   │       ├── Radio.tsx
│   │   │       └── Toggle.tsx
│   │   ├── types/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tailwind.config.js
│   │   └── .cursorrules
│   └── plugma/                       (Plugma template)
│       ├── src/
│       │   ├── main.ts
│       │   └── ui/
│       │       ├── App.tsx
│       │       └── components/
│       ├── package.json
│       ├── tsconfig.json
│       ├── vite.config.ts
│       └── .cursorrules
├── docs/                             (All documentation)
│   ├── FIGMA-PLUGIN-DESIGN-PRINCIPLES.md
│   ├── FIGMA-PLUGIN-UI-COMPONENTS-REFERENCE.md
│   ├── FIGMA-PLUGIN-DESIGN-SYSTEM.md
│   ├── FIGMA-PLUGIN-QUICK-START.md
│   ├── FIGMA-PLUGIN-CHEAT-SHEET.md
│   └── COMPARISON.md
├── skills/
│   └── figma-plugin.skill
└── cli/
    ├── create.js                    (Main scaffolding logic)
    ├── prompts.js                   (Interactive prompts)
    └── templates.js                 (Template processing)
```

---

## CLI Features

### Basic Usage
```bash
# Interactive mode
npm create figma-plugin-ai@latest

# With project name
npm create figma-plugin-ai@latest my-plugin

# With flags (skip prompts)
npm create figma-plugin-ai@latest my-plugin --template create-figma-plugin --tailwind --components
```

### Available Flags
```bash
--template, -t <name>     # 'create-figma-plugin' or 'plugma'
--framework, -f <name>    # For Plugma: 'react', 'svelte', 'vue', 'vanilla'
--tailwind               # Include Tailwind CSS
--components             # Include custom components
--no-docs                # Skip documentation
--no-skill               # Skip Claude skill
--no-cursor              # Skip Cursor rules
--typescript             # Use TypeScript (default: true)
--help, -h               # Show help
--version, -v            # Show version
```

### Example Commands
```bash
# Preact with everything
npm create figma-plugin-ai@latest my-plugin --template create-figma-plugin --tailwind --components

# React with Plugma, minimal
npm create figma-plugin-ai@latest my-plugin --template plugma --framework react --no-docs

# Interactive (recommended for first-time users)
npm create figma-plugin-ai@latest
```

---

## Post-Install Experience

After scaffolding, the CLI provides:

```
✨ Success! Created my-plugin at /path/to/my-plugin

📚 Documentation installed in ./docs/
   Read FIGMA-PLUGIN-DESIGN-PRINCIPLES.md first!

🤖 AI Integration:
   - .cursorrules configured for Cursor IDE
   - figma-plugin.skill available for Claude

📦 Next steps:
   1. cd my-plugin
   2. npm install
   3. npm run watch

🎨 Building with AI:
   Share ./docs/FIGMA-PLUGIN-DESIGN-PRINCIPLES.md with your AI assistant
   and describe what you want to build!

📖 Full documentation: ./docs/README.md
```

---

## Package.json for the npm Package

```json
{
  "name": "create-figma-plugin-ai",
  "version": "1.0.0",
  "description": "Scaffold production-ready Figma plugins with AI-optimized documentation",
  "type": "module",
  "bin": {
    "create-figma-plugin-ai": "./bin/create-figma-plugin-ai.js"
  },
  "files": [
    "bin",
    "templates",
    "docs",
    "skills",
    "cli",
    "README.md"
  ],
  "keywords": [
    "figma",
    "plugin",
    "widget",
    "scaffold",
    "cli",
    "create",
    "ai",
    "claude",
    "cursor",
    "preact",
    "react",
    "tailwind"
  ],
  "author": "Your Name",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/invstd/Figma-Plugin-Quickstart"
  },
  "bugs": {
    "url": "https://github.com/invstd/Figma-Plugin-Quickstart/issues"
  },
  "homepage": "https://github.com/invstd/Figma-Plugin-Quickstart#readme",
  "dependencies": {
    "prompts": "^2.4.2",
    "chalk": "^5.3.0",
    "fs-extra": "^11.2.0",
    "commander": "^12.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@types/prompts": "^2.4.9",
    "@types/fs-extra": "^11.0.4"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

## Additional Features

### 1. **Update Command**
```bash
npx create-figma-plugin-ai update

# Updates documentation in existing projects
# Checks for new component implementations
# Updates .cursorrules if outdated
```

### 2. **Add Component Command**
```bash
npx create-figma-plugin-ai add-component checkbox
npx create-figma-plugin-ai add-component radio
npx create-figma-plugin-ai add-component toggle

# Adds individual components to existing projects
```

### 3. **Docs Command**
```bash
npx create-figma-plugin-ai docs

# Opens documentation in browser
# Or shows path to local docs
```

---

## Value Propositions

### For Developers:
- ⚡ **Zero-config setup**: Production-ready in 5 minutes
- 📦 **All best practices included**: No need to research
- 🎨 **Professional UI**: Matches Figma's design system out of the box
- 🔧 **Custom components**: Ready-to-use Checkbox, Radio, Toggle, etc.

### For Designers Using AI:
- 🤖 **AI-optimized**: Documentation structured for Claude, ChatGPT, Cursor
- 📚 **Complete guidance**: Everything AI needs to build professional plugins
- 🎯 **No coding required**: Just describe your idea to AI
- ✅ **Production-ready**: Not prototypes—real, publishable plugins

### For Teams:
- 📐 **Consistent structure**: Same patterns across all plugins
- 📖 **Onboarding**: New developers get best practices from day one
- 🔄 **Reusable components**: Share across projects
- 🎓 **Learning resource**: Documentation teaches Figma plugin development

---

## Competitive Analysis

| Feature | `create-figma-plugin-ai` | `create-figma-plugin` | `plugma` |
|---------|-------------------------|---------------------|----------|
| **CLI Scaffolding** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Documentation** | ✅ Complete (7 guides) | ⚠️ Basic README | ⚠️ Basic docs |
| **Custom Components** | ✅ Included | ❌ No | ❌ No |
| **AI Integration** | ✅ Claude skill + Cursor rules | ❌ No | ❌ No |
| **Design System** | ✅ Fully documented | ⚠️ Implied | ❌ Build your own |
| **Dark Mode Guide** | ✅ Complete | ⚠️ Basic | ❌ Manual |
| **Tailwind Setup** | ✅ Pre-configured | ❌ Manual | ⚠️ Manual |
| **Multi-Framework** | ⚠️ Preact + Plugma support | ❌ Preact only | ✅ React/Svelte/Vue |
| **HMR** | ⚠️ Plugma template only | ❌ No | ✅ Yes |

---

## Marketing Positioning

**Tagline Options:**
1. "Build Figma plugins with AI—documentation included"
2. "Production-ready Figma plugins in 5 minutes"
3. "Figma plugin scaffolding optimized for AI development"
4. "From idea to plugin with AI assistance"

**One-liner:**
> Scaffold production-ready Figma plugins with comprehensive AI-optimized documentation, custom components, and best practices built in.

---

## Monetization Options (Optional)

### Free Tier (Open Source)
- Basic scaffolding
- Core documentation
- Preact template
- Custom components (Checkbox, Radio, Toggle)

### Pro Tier (Paid or Sponsorware)
- Plugma template with React/Svelte/Vue components
- Advanced components (Modal, Tabs, Dropdown enhancements)
- Priority support
- Video tutorials
- Plugin examples library

### Enterprise
- Custom templates for teams
- Private component library integration
- Consulting/support

---

## Implementation Roadmap

### Phase 1: MVP (v1.0.0)
- ✅ CLI scaffolding tool
- ✅ Preact template (@create-figma-plugin)
- ✅ All documentation bundled
- ✅ Custom components (Checkbox, Radio, Toggle)
- ✅ Claude skill + Cursor rules
- ✅ Basic README

### Phase 2: Multi-Framework (v1.1.0)
- ✅ Plugma template
- ✅ React component implementations
- ✅ Framework-specific docs
- ✅ Update command

### Phase 3: Enhanced Features (v1.2.0)
- ✅ Add-component command
- ✅ Svelte component implementations
- ✅ Vue component implementations
- ✅ Plugin examples library

### Phase 4: Community & Growth (v2.0.0)
- ✅ Community templates
- ✅ Plugin marketplace integration
- ✅ Video tutorials
- ✅ VS Code extension

---

## Technical Implementation Notes

### CLI Technology Stack
- **Runtime**: Node.js 18+
- **CLI Framework**: Commander.js
- **Prompts**: prompts library
- **File Operations**: fs-extra
- **Styling**: chalk (terminal colors)
- **Package Manager Detection**: Check for npm/yarn/pnpm/bun

### Template Processing
```javascript
// Pseudocode for template processing
async function scaffoldProject(name, options) {
  // 1. Create directory
  await fs.mkdir(name);
  
  // 2. Copy template based on choice
  const template = options.template === 'plugma' ? 'plugma' : 'create-figma-plugin';
  await fs.copy(`./templates/${template}`, `./${name}`);
  
  // 3. Process package.json (replace placeholders)
  const pkg = await fs.readJSON(`./${name}/package.json`);
  pkg.name = name;
  await fs.writeJSON(`./${name}/package.json`, pkg, { spaces: 2 });
  
  // 4. Copy docs if requested
  if (options.docs) {
    await fs.copy('./docs', `./${name}/docs`);
  }
  
  // 5. Copy components if requested
  if (options.components) {
    await fs.copy('./components', `./${name}/src/components`);
  }
  
  // 6. Copy AI files
  if (options.skill) {
    await fs.copy('./skills/figma-plugin.skill', `./${name}/figma-plugin.skill`);
  }
  if (options.cursor) {
    await fs.copy('./templates/.cursorrules', `./${name}/.cursorrules`);
  }
  
  // 7. Install dependencies
  await installDependencies(name, options.packageManager);
  
  // 8. Show success message
  showSuccessMessage(name);
}
```

---

## README.md for npm Package

```markdown
# create-figma-plugin-ai

Scaffold production-ready Figma plugins with AI-optimized documentation and best practices.

## Features

- 🚀 **Quick Setup**: Production-ready in 5 minutes
- 📚 **Complete Documentation**: 7 comprehensive guides for AI and humans
- 🎨 **Design System**: Figma's design tokens fully documented
- 🔧 **Custom Components**: Checkbox, Radio, Toggle, Tabs, Modal included
- 🤖 **AI Integration**: Claude skill + Cursor rules built in
- 🌗 **Dark Mode**: Proper color pairing from day one
- ⚡ **Two Templates**: Choose Preact or React/Svelte/Vue

## Quick Start

```bash
npm create figma-plugin-ai@latest my-plugin
cd my-plugin
npm install
npm run watch
```

## Usage

Interactive mode (recommended):
```bash
npm create figma-plugin-ai@latest
```

With options:
```bash
npm create figma-plugin-ai@latest my-plugin --template create-figma-plugin --tailwind --components
```

## Options

- `--template, -t` - Choose 'create-figma-plugin' or 'plugma'
- `--framework, -f` - For Plugma: 'react', 'svelte', 'vue'
- `--tailwind` - Include Tailwind CSS
- `--components` - Include custom components
- `--no-docs` - Skip documentation
- `--no-skill` - Skip Claude skill
- `--no-cursor` - Skip Cursor rules

## What's Included

### Documentation
- Design Principles (essential guidelines)
- UI Components Reference (complete API)
- Design System (colors, typography, layout)
- Quick Start (rapid setup)
- Cheat Sheet (quick reference)

### Components
- Checkbox (with indeterminate state)
- Radio Button (with groups)
- Toggle Switch
- Tabs
- Modal Dialog

### AI Integration
- `.cursorrules` for Cursor IDE
- `figma-plugin.skill` for Claude
- AI-optimized documentation structure

## Building with AI

1. Share `./docs/FIGMA-PLUGIN-DESIGN-PRINCIPLES.md` with your AI assistant
2. Describe your plugin idea
3. Let AI build using the documentation

## Documentation

Full documentation available in `./docs/` after scaffolding.

## License

MIT

## Links

- [GitHub Repository](https://github.com/invstd/Figma-Plugin-Quickstart)
- [Documentation](https://github.com/invstd/Figma-Plugin-Quickstart)
- [Issues](https://github.com/invstd/Figma-Plugin-Quickstart/issues)
```

---

## Next Steps to Create the Package

1. **Create new directory**: `create-figma-plugin-ai/`
2. **Implement CLI**: JavaScript CLI tool with Commander.js
3. **Copy templates**: Adapt Quick Start code into templates
4. **Bundle docs**: Copy all .md files
5. **Test locally**: `npm link` for local testing
6. **Publish to npm**: `npm publish`

Would you like me to start implementing this package?
