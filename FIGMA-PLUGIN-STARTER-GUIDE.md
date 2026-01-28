# Figma Plugin Infrastructure Resources

**Reusable templates and guides for kickstarting new Figma plugins**

This project includes comprehensive documentation for setting up the complete infrastructure stack used in TokenMatch. Use these resources to rapidly create production-ready Figma plugins with modern tooling, beautiful UI, and professional polish.

---

## 📚 Available Resources

### 🚀 Quick Start (5 minutes)
**[FIGMA-PLUGIN-QUICK-START.md](./FIGMA-PLUGIN-QUICK-START.md)**

A rapid-start template with all the essential code snippets and configuration files. Perfect for when you want to get a plugin up and running quickly without reading detailed explanations.

**What's included:**
- ✅ Copy-paste dependency installation commands
- ✅ Complete configuration files (package.json, tsconfig.json, tailwind.config.js)
- ✅ Starter UI template with custom scrollbar
- ✅ Minimal backend template
- ✅ Pre-launch checklist

**Use this when:** You want to start coding immediately and already understand the basics.

---

### 📘 Complete Guide (30 minutes)
**[FIGMA-PLUGIN-INFRASTRUCTURE-SETUP.md](./FIGMA-PLUGIN-INFRASTRUCTURE-SETUP.md)**

A comprehensive, step-by-step guide that explains every part of the infrastructure setup in detail. Perfect for understanding the "why" behind each decision and for reference when customizing.

**What's included:**
- ✅ Detailed explanation of each dependency
- ✅ UI framework configuration with Preact + @create-figma-plugin
- ✅ Tailwind CSS v4 setup and best practices
- ✅ Custom scrollbar implementation (with full code walkthrough)
- ✅ Light/dark mode theming guide
- ✅ Build system explanation
- ✅ TypeScript configuration details
- ✅ Best practices and anti-patterns
- ✅ Troubleshooting guide
- ✅ Common customizations

**Use this when:** You want to understand the architecture deeply or need to make advanced customizations.

---

## 🎯 Infrastructure Features

Both guides help you set up a plugin with:

### 🎨 Modern UI Stack
- **@create-figma-plugin** - Official Figma plugin framework
- **Preact** - Lightweight React alternative (3KB)
- **Tailwind CSS v4** - Utility-first CSS with modern features
- **TypeScript** - Type safety and better DX

### ✨ Premium Features
- **Custom Scrollbar** - Beautiful overlay scrollbar that doesn't affect layout
- **Automatic Theming** - Seamless light/dark mode using Figma design tokens
- **Hot Reload** - Fast development with watch mode
- **Resizable Window** - Professional window resize functionality

### ⚡ Developer Experience
- **Fast Builds** - Optimized build pipeline with parallel CSS/JS compilation
- **Type Safety** - Full TypeScript support with Figma API types
- **Modern Tooling** - Latest versions of all dependencies
- **Clear Structure** - Well-organized project structure

---

## 🎬 Getting Started

**Choose your path:**

### Option A: Quick Start (Recommended for experienced developers)
1. Read: [FIGMA-PLUGIN-QUICK-START.md](./FIGMA-PLUGIN-QUICK-START.md)
2. Copy-paste the setup commands
3. Start building your plugin features

### Option B: Complete Guide (Recommended for first-time plugin developers)
1. Read: [FIGMA-PLUGIN-INFRASTRUCTURE-SETUP.md](./FIGMA-PLUGIN-INFRASTRUCTURE-SETUP.md)
2. Follow step-by-step instructions
3. Understand each component deeply
4. Use as reference for customizations

---

## 📦 What You'll Build

By following either guide, you'll create a plugin with this structure:

```
my-plugin/
├── src/
│   ├── main.ts           # Plugin backend (Figma API)
│   ├── ui.tsx            # UI components (Preact)
│   ├── input.css         # Tailwind source
│   └── output.css        # Generated CSS
├── types/                # TypeScript definitions
├── services/             # Business logic
├── build/                # Compiled output
├── package.json          # Dependencies & scripts
├── tsconfig.json         # TypeScript config
├── tailwind.config.js    # Tailwind config
└── manifest.json         # Auto-generated Figma manifest
```

---

## 🔑 Key Capabilities

### Custom Scrollbar Implementation
A production-ready custom scrollbar that:
- Overlays content (no layout shift)
- Auto-shows on hover
- Smooth drag interactions
- Adapts to theme colors
- Handles dynamic content

### Figma Design Token Integration
Automatic support for:
- `--figma-color-text-*` (text colors)
- `--figma-color-bg-*` (background colors)
- `--figma-color-border-*` (border colors)
- Theme-aware components
- Seamless light/dark mode switching

### Build System
- Parallel CSS + JS builds
- Watch mode with auto-reload
- Production minification
- TypeScript type checking
- Source maps for debugging

---

## 💡 Use Cases

**Perfect for:**
- ✅ Design system management plugins
- ✅ Token management tools
- ✅ Component inspection utilities
- ✅ Automation and workflow tools
- ✅ Data import/export plugins
- ✅ API integration plugins

**Infrastructure provides:**
- ✅ Professional UI that matches Figma's design language
- ✅ Reliable theming across all Figma versions
- ✅ Smooth scrolling for content-heavy interfaces
- ✅ Fast development iteration cycle
- ✅ Production-ready code quality

---

## 🎓 Learning Path

### For Beginners
1. Start with **[Quick Start Guide](./FIGMA-PLUGIN-QUICK-START.md)**
2. Build a simple plugin to understand the basics
3. Reference **[Complete Guide](./FIGMA-PLUGIN-INFRASTRUCTURE-SETUP.md)** for deeper understanding
4. Explore [Figma Plugin API docs](https://www.figma.com/plugin-docs/) for advanced features

### For Experienced Developers
1. Skim **[Quick Start Guide](./FIGMA-PLUGIN-QUICK-START.md)** for setup
2. Use **[Complete Guide](./FIGMA-PLUGIN-INFRASTRUCTURE-SETUP.md)** as reference
3. Focus on the custom scrollbar and theming sections
4. Customize for your specific needs

---

## 🧰 Additional Resources

### External Resources
- [Figma Plugin API Documentation](https://www.figma.com/plugin-docs/)
- [@create-figma-plugin Documentation](https://github.com/yuanqing/create-figma-plugin)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Preact Documentation](https://preactjs.com/)

---

## 📋 Quick Reference

### Commands
```bash
# Install dependencies
npm install

# Build once
npm run build

# Development with hot reload
npm run watch

# Build CSS only
npm run build:css

# Build JS only
npm run build:js
```

### Key Files
- `src/main.ts` - Plugin backend logic
- `src/ui.tsx` - UI components
- `src/input.css` - Tailwind source with custom styles
- `package.json` - Dependencies and figma-plugin config
- `tsconfig.json` - TypeScript configuration

### Figma Actions
- Import plugin: Plugins → Development → Import plugin from manifest
- Reload plugin: Cmd/Ctrl + Option/Alt + P → "Reload plugin"
- Open DevTools: Option/Alt + Cmd/Ctrl + I

---

## ✅ Success Checklist

Use this to verify your setup is complete:

- [ ] All dependencies installed (`npm install`)
- [ ] Build succeeds (`npm run build`)
- [ ] Watch mode works (`npm run watch`)
- [ ] Plugin loads in Figma
- [ ] UI displays correctly
- [ ] Light mode looks good
- [ ] Dark mode looks good
- [ ] Custom scrollbar appears and functions
- [ ] No console errors
- [ ] Hot reload works

---

## 🤝 Contributing

Found an issue or have an improvement?
- Open an issue describing the problem
- Submit a PR with improvements
- Share your plugin built with this infrastructure!

---

## 📄 License

MIT License - Feel free to use this infrastructure in your own Figma plugins, commercial or otherwise.

---

**Made with ❤️ for the Figma plugin developer community**

These resources were extracted from the **TokenMatch** plugin development process. They represent battle-tested infrastructure that powers a production plugin with thousands of lines of code.

**Questions?** Open an issue or reach out!

---

## 🎯 Next Steps

1. **Choose your guide**: Quick Start or Complete Guide
2. **Set up your project**: Follow the installation steps
3. **Build something awesome**: Use the infrastructure to focus on features, not setup
4. **Share your work**: Show the community what you've built!

Happy plugin building! 🚀
