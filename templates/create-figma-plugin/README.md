# My Figma Plugin

A production-ready Figma plugin with native design system.

## Quick Start

```bash
npm install
npm run watch
```

Then in Figma:
1. **Plugins** → **Development** → **Import plugin from manifest**
2. Select your `manifest.json`
3. Run the plugin!

## Documentation

All documentation is in the `./docs/` directory:

- **Start here:** `FIGMA-PLUGIN-DESIGN-PRINCIPLES.md`
- **Components:** `FIGMA-PLUGIN-UI-COMPONENTS-REFERENCE.md`
- **Quick reference:** `FIGMA-PLUGIN-CHEAT-SHEET.md`

## Scripts

```bash
npm run build      # Build for production
npm run watch      # Development with hot reload
npm run build:css  # Build CSS only
```

## AI Integration

This project includes:
- `.cursorrules` — Optimized for Cursor IDE
- `figma-plugin.skill` — Claude skill file

Share the documentation with your AI assistant to build features faster!

## Project Structure

```
src/
├── main.ts           ← Backend logic
├── ui.tsx            ← UI components
├── input.css         ← Styles
└── components/       ← Custom components
```

## Customize

Edit `package.json` to set:
- Plugin name (`figma-plugin.name`)
- Plugin ID (`figma-plugin.id`)
- Window size (in `main.ts`)

## Need Help?

Read the docs in `./docs/` or check the [repository](https://github.com/invstd/Figma-Plugin-Quickstart).

---

Created with [@inversestudio/create-figma-plugin-native](https://www.npmjs.com/package/@inversestudio/create-figma-plugin-native)
