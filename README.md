# @inversestudio/create-figma-plugin-native

> Scaffold production-ready Figma plugins with native design system, AI-optimized documentation, and best practices built in.

[![npm version](https://img.shields.io/npm/v/@inversestudio/create-figma-plugin-native.svg)](https://www.npmjs.com/package/@inversestudio/create-figma-plugin-native)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

🚀 **Quick Setup** — Production-ready in 5 minutes  
📚 **Complete Documentation** — 7 comprehensive guides for AI and humans  
🎨 **Native Design System** — Figma's design tokens fully documented  
🔧 **Custom Components** — Checkbox, Radio, Toggle, Tabs, Modal included  
🤖 **AI Integration** — Claude skill + Cursor rules built in  
🌗 **Dark Mode** — Proper color pairing from day one  
⚡ **Modern Tooling** — Preact + Tailwind CSS v4 + TypeScript

## Quick Start

```bash
npm create @inversestudio/figma-plugin-native@latest my-plugin
cd my-plugin
npm install
npm run watch
```

Then in Figma:
1. **Plugins** → **Development** → **Import plugin from manifest**
2. Select your `manifest.json`
3. Run the plugin!

## Interactive Mode

```bash
npm create @inversestudio/figma-plugin-native@latest
```

The CLI will guide you through:
- 📝 Project name
- 🎨 Framework choice (create-figma-plugin or Plugma)
- 🎯 Component selection
- 📚 Documentation options
- 🤖 AI integration files

## Command Line Options

```bash
npm create @inversestudio/figma-plugin-native@latest my-plugin [options]
```

### Options

- `--template, -t <name>` — Template: `create-figma-plugin` (default) or `plugma`
- `--framework, -f <name>` — For Plugma: `react`, `svelte`, `vue`, `vanilla`
- `--tailwind` — Include Tailwind CSS (default: true)
- `--components` — Include custom components (default: true)
- `--no-docs` — Skip documentation
- `--no-skill` — Skip Claude skill
- `--no-cursor` — Skip Cursor rules

### Examples

```bash
# Full setup with everything (default)
npm create @inversestudio/figma-plugin-native@latest my-plugin

# Minimal setup without docs
npm create @inversestudio/figma-plugin-native@latest my-plugin --no-docs

# With Plugma and React
npm create @inversestudio/figma-plugin-native@latest my-plugin --template plugma --framework react
```

## What's Included

### 📚 Documentation
- **Design Principles** — Essential guidelines for native Figma UI
- **UI Components Reference** — Complete API for all components
- **Design System** — Colors, typography, layout specifications
- **Quick Start** — Rapid setup guide
- **Cheat Sheet** — Quick reference for common patterns
- **Comparison** — This vs. Plugma vs. create-figma-plugin

### 🔧 Custom Components
- **Checkbox** — With indeterminate state
- **Radio Button** — With group management
- **Toggle Switch** — Native Figma styling
- **Tabs** — Fully accessible tabs component
- **Modal Dialog** — With backdrop and animations

### 🤖 AI Integration
- **`.cursorrules`** — Optimized for Cursor IDE
- **`figma-plugin.skill`** — Packaged Claude skill
- **AI-optimized docs** — Structured for AI comprehension

### 🎨 Design System
- All Figma CSS variables documented
- Proper dark mode color pairings
- Typography scale (11px, 12px, 13px with line heights)
- Spacing system (4px, 8px, 16px, 24px, 32px)
- Custom scrollbar (zero layout shift)

## Building with AI

1. Share `./docs/FIGMA-PLUGIN-DESIGN-PRINCIPLES.md` with your AI assistant (Claude, ChatGPT, Cursor)
2. Describe your plugin idea in plain language
3. Let AI build using the comprehensive documentation

**Example:**
> "Build a plugin that converts hex colors to Tailwind CSS classes"

Your AI will create a professional, production-ready plugin with proper theming, typography, and native Figma UI.

## Project Structure

```
my-plugin/
├── src/
│   ├── main.ts              ← Backend logic
│   ├── ui.tsx               ← UI with custom scrollbar
│   ├── input.css            ← Tailwind + custom styles
│   ├── components/          ← Custom components
│   │   ├── Checkbox.tsx
│   │   ├── Radio.tsx
│   │   └── Toggle.tsx
│   └── types/               ← TypeScript types
├── docs/                    ← Full documentation
│   ├── FIGMA-PLUGIN-DESIGN-PRINCIPLES.md
│   ├── FIGMA-PLUGIN-UI-COMPONENTS-REFERENCE.md
│   └── ... (7 guides total)
├── figma-plugin.skill       ← Claude skill
├── .cursorrules             ← Cursor IDE rules
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

## Development Workflow

```bash
# Development with hot reload
npm run watch

# Build for production
npm run build

# Build CSS only
npm run build:css
```

In Figma, reload with: **Cmd/Ctrl + Option/Alt + P** → "Reload plugin"

## Requirements

- Node.js 18+
- npm, yarn, pnpm, or bun
- Figma desktop app

## Why This Package?

| Feature | create-figma-plugin-native | create-figma-plugin | plugma |
|---------|---------------------------|---------------------|--------|
| **Documentation** | ✅ 7 comprehensive guides | ⚠️ Basic README | ⚠️ Basic docs |
| **Custom Components** | ✅ 5 components included | ❌ None | ❌ None |
| **AI Integration** | ✅ Claude + Cursor | ❌ No | ❌ No |
| **Design System** | ✅ Fully documented | ⚠️ Implied | ❌ Build your own |
| **Dark Mode Guide** | ✅ Complete | ⚠️ Basic | ❌ Manual |
| **Custom Scrollbar** | ✅ Included | ❌ No | ❌ No |

## Testimonials

> "This saved me hours of setup and documentation reading. The AI integration is game-changing."

> "Finally, a plugin starter that understands design systems. The dark mode just works."

> "The custom components are production-ready. No more fighting with Figma's UI."

## Links

- [GitHub Repository](https://github.com/invstd/Figma-Plugin-Quickstart)
- [Documentation](https://github.com/invstd/Figma-Plugin-Quickstart)
- [Report Issues](https://github.com/invstd/Figma-Plugin-Quickstart/issues)
- [npm Package](https://www.npmjs.com/package/@inversestudio/create-figma-plugin-native)

## License

MIT © [inversestudio](https://github.com/invstd)

## Contributing

Contributions welcome! Please read our [contributing guidelines](https://github.com/invstd/Figma-Plugin-Quickstart/blob/main/CONTRIBUTING.md) first.

---

**Built with ❤️ for the Figma community**

Ready to build? → `npm create @inversestudio/figma-plugin-native@latest`
