# Comparison: This Documentation vs. Plugma vs. create-figma-plugin

## Quick Answer

**This documentation is framework-specific** and currently focuses on `@create-figma-plugin` (Preact-based). **Plugma** is a modern alternative toolkit that supports React, Svelte, Vue, and vanilla JS/TS with Vite and hot module reloading.

---

## The Three Options

### 1. **Plugma** (Modern, Multi-Framework)
**Website:** https://www.plugma.dev  
**Command:** `npm create plugma@latest`

**Key Features:**
- ✅ **Multiple frameworks**: React, Svelte, Vue, vanilla JS/TS
- ✅ **Vite-powered**: Lightning-fast builds and HMR (Hot Module Reloading)
- ✅ **Instant UI updates**: Changes reflect immediately without manual refresh
- ✅ **Browser preview**: Debug plugin UI in browser with Cmd+Opt+J
- ✅ **GitHub integration**: `plugma release` command for automated versioning
- ✅ **Zero config**: Works out of the box
- ✅ **Modern DX**: Fast iteration cycles, instant feedback

**Best for:** Developers who want modern tooling, HMR, and framework choice (React/Svelte/Vue)

---

### 2. **@create-figma-plugin** (Established, Preact-Based)
**Website:** https://yuanqing.github.io/create-figma-plugin/  
**Command:** `npx create-figma-plugin`  
**NPM:** `@create-figma-plugin/ui`, `@create-figma-plugin/utilities`

**Key Features:**
- ✅ **Preact framework**: Lightweight (3KB) React alternative
- ✅ **Native-looking UI components**: Matching Figma's design system
- ✅ **esbuild bundling**: Fast builds
- ✅ **TypeScript support**: Full type safety
- ✅ **Established ecosystem**: 1.1k+ GitHub stars, widely used
- ✅ **Plugin manifest configuration**: Simplified setup

**Best for:** Developers comfortable with Preact, those wanting native Figma UI components

---

### 3. **This Documentation** (AI-Optimized Guide)
**Repository:** https://github.com/invstd/Figma-Plugin-Quickstart  
**Focus:** `@create-figma-plugin` v4.0.3+ with comprehensive guidance

**Key Features:**
- ✅ **AI-optimized**: Structured for Claude, ChatGPT, Cursor
- ✅ **Complete design system**: All Figma design tokens documented
- ✅ **Production patterns**: Custom scrollbar, proper theming, layouts
- ✅ **Custom components**: Full implementations (Checkbox, Radio, Toggle, Tabs, Modal)
- ✅ **Typography rules**: Exact font sizes + line heights
- ✅ **Dark mode guidelines**: Proper color pairings
- ✅ **Claude skill + Cursor rules**: Seamless AI integration
- ✅ **Designer-friendly**: Enables non-coders to build via AI

**Best for:** AI-assisted development, designers using AI, comprehensive guidance for production-grade plugins

---

## Side-by-Side Comparison

| Feature | Plugma | @create-figma-plugin | This Documentation |
|---------|--------|---------------------|-------------------|
| **Framework** | React/Svelte/Vue/Vanilla | Preact | Preact (via create-figma-plugin) |
| **Build Tool** | Vite | esbuild | esbuild |
| **Hot Reload** | ✅ Yes (HMR) | ❌ No | ❌ No (but documented) |
| **Browser Preview** | ✅ Yes | ❌ No | ❌ No |
| **Native UI Components** | ❌ No (bring your own) | ✅ Yes | ✅ Yes + Custom implementations |
| **Design System Docs** | ❌ Not included | ⚠️ Implied | ✅ Fully documented |
| **TypeScript** | ✅ Yes | ✅ Yes | ✅ Yes |
| **GitHub Integration** | ✅ `plugma release` | ❌ Manual | ❌ Manual |
| **Setup Time** | ~2 min (zero config) | ~5 min (with config) | ~5 min (production-ready) |
| **AI Optimization** | ❌ No | ❌ No | ✅ Claude skill, Cursor rules |
| **Custom Components** | Build your own | Use framework components | ✅ Ready-to-use implementations |
| **Dark Mode** | Build your own | Supported | ✅ Fully documented with guidelines |
| **Learning Curve** | Low (familiar frameworks) | Medium (Preact + ecosystem) | Low (AI does the work) |
| **GitHub Stars** | ~New (V2 released 2025) | 1.1k+ | Documentation repo |

---

## Framework Differences

### Plugma
```bash
npm create plugma@latest

# Choose framework during setup:
# - plugin (vanilla)
# - react
# - svelte
# - vue
```

**What you get:**
- Vite dev server with HMR
- Framework of your choice
- Minimal boilerplate
- Fast iteration cycles

### @create-figma-plugin
```bash
npx create-figma-plugin
```

**What you get:**
- Preact + @create-figma-plugin/ui components
- esbuild compilation
- Native Figma-matching UI
- TypeScript setup

### This Documentation
```bash
# Follow Quick Start guide with:
npm install @create-figma-plugin/ui@^4.0.3 \
            @create-figma-plugin/utilities@^4.0.3 \
            preact@">=10"
```

**What you get:**
- Everything from @create-figma-plugin
- Complete design system documentation
- Production-ready patterns
- Custom component implementations
- AI-optimized structure

---

## What This Documentation Actually Is

### NOT a Framework
This documentation doesn't replace Plugma or @create-figma-plugin. It's an **enhanced documentation layer** built on top of @create-figma-plugin.

### What It Adds

#### 1. **Complete Design System**
Neither Plugma nor @create-figma-plugin document Figma's design tokens. This documentation includes:
- All `--figma-color-*` CSS variables
- Correct color pairings (e.g., `bg-success` + `text-onsuccess`)
- Typography scale with required line heights
- Spacing system usage

#### 2. **Production-Ready Patterns**
- Custom scrollbar (zero layout shift)
- Proper theme initialization
- Full-height layouts with overflow handling
- Correct spacing between form elements
- Hover state handling

#### 3. **Custom Component Library**
Neither framework includes these—this documentation provides full implementations:
- ✅ Checkbox (with indeterminate state)
- ✅ Radio buttons (with groups)
- ✅ Toggle switches
- ✅ Tabs component
- ✅ Modal dialogs

#### 4. **AI Integration**
- Claude skill (`.skill` file) for seamless AI collaboration
- Cursor rules (`.cursorrules`) for Cursor IDE
- Structured specifically for AI comprehension
- Step-by-step checklists
- Common mistake warnings

#### 5. **Comprehensive Documentation**
- Design Principles (PRIMARY)
- UI Components Reference
- Design System Specification
- Quick Start
- Cheat Sheet
- Starter Guide

---

## Decision Matrix

### Choose **Plugma** If:
- ✅ You want React, Svelte, or Vue (not Preact)
- ✅ Hot module reloading is essential
- ✅ You prefer modern Vite-based tooling
- ✅ You want browser preview for debugging
- ✅ You're comfortable building your own UI components
- ✅ Fast iteration is your priority

### Choose **@create-figma-plugin** If:
- ✅ You want native Figma-matching UI components
- ✅ Preact is acceptable (or preferred)
- ✅ You want an established, proven ecosystem
- ✅ You don't need HMR
- ✅ You want quick access to form components (Button, Textbox, Dropdown)

### Choose **This Documentation + @create-figma-plugin** If:
- ✅ You're working with AI assistants (Claude, ChatGPT, Cursor)
- ✅ You're a designer building plugins through AI
- ✅ You want comprehensive guidance for production-grade plugins
- ✅ You need complete design system documentation
- ✅ You want custom components (Checkbox, Radio, Toggle, etc.)
- ✅ You want proper dark mode from day one
- ✅ You need the plugin to look professionally native to Figma

---

## Can You Use This Documentation with Plugma?

**Currently: No** — This documentation is specific to @create-figma-plugin's Preact-based architecture and UI components.

**Future Possibility:** Yes — We could create Plugma-specific versions of:
- Design principles (framework-agnostic)
- Component implementations for React/Svelte/Vue
- AI-optimized setup guides

However, the core value (design system, color tokens, typography rules) is framework-agnostic and could be adapted.

---

## Architecture Comparison

### Plugma Setup
```
my-plugin/
├── src/
│   ├── main.ts           (plugin backend)
│   └── ui/               (React/Svelte/Vue)
│       └── App.tsx
├── manifest.json
├── package.json
└── vite.config.ts         (Vite configuration)
```

**Dev:** `plugma dev` (with HMR)  
**Build:** `plugma build`  
**Release:** `plugma release`

### @create-figma-plugin Setup
```
my-plugin/
├── src/
│   ├── main.ts           (plugin backend)
│   └── ui.tsx            (Preact UI)
├── manifest.json          (generated)
├── package.json
└── tsconfig.json
```

**Dev:** `npm run watch`  
**Build:** `npm run build`

### This Documentation's Setup
```
my-plugin/
├── src/
│   ├── main.ts                    (backend with proper event handlers)
│   ├── ui.tsx                     (full UI with design system)
│   ├── input.css                  (Tailwind + custom scrollbar)
│   ├── output.css
│   ├── components/                (custom implementations)
│   │   ├── Checkbox.tsx
│   │   ├── Radio.tsx
│   │   └── Toggle.tsx
│   └── services/
├── types/
│   └── events.ts
├── manifest.json
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

**Dev:** `npm run watch` (CSS + JS)  
**Build:** `npm run build`

---

## Real-World Example: Building a Color Picker Plugin

### With Plugma
```bash
npm create plugma@latest
# Choose "react"
# Build your own UI components
# Style with CSS/Tailwind
# Manual dark mode implementation
# ~30-60 min to production-ready
```

### With @create-figma-plugin
```bash
npx create-figma-plugin
# Use @create-figma-plugin/ui components
# Reference scattered examples
# Figure out dark mode yourself
# ~45-90 min to production-ready
```

### With This Documentation + @create-figma-plugin + AI
```bash
# Share docs with Claude/ChatGPT/Cursor
# "Build a color picker plugin that converts hex to RGB"
# AI creates:
#   - Proper UI with design system
#   - Correct colors (light + dark mode)
#   - Custom components if needed
#   - Type-safe events
#   - Error handling
# ~5-15 min to production-ready
```

---

## Summary

| Approach | Best For | Strength | Limitation |
|----------|----------|----------|------------|
| **Plugma** | Modern web developers | HMR, Vite, framework choice | No native UI components |
| **@create-figma-plugin** | Preact developers | Native UI, established | No HMR, limited docs |
| **This Documentation** | AI-assisted development | Complete guidance, custom components | Preact-only, no HMR |

---

## Recommendation

### For Solo Developers:
- **Want speed + HMR?** → Plugma
- **Want native Figma UI?** → @create-figma-plugin
- **Want comprehensive guidance?** → This documentation + @create-figma-plugin

### For AI-Assisted Development:
- **This documentation** is specifically designed for this use case

### For Teams:
- **Plugma** for teams familiar with React/Svelte/Vue
- **@create-figma-plugin** for teams wanting consistency with Figma's UI
- **This documentation** for onboarding junior developers or designers using AI

---

## Future Considerations

**For This Documentation:**
- [ ] Create Plugma-specific version
- [ ] Add React/Svelte/Vue component implementations
- [ ] Document HMR workflows
- [ ] Create framework-agnostic design system guide

**Why This Matters:**
Plugma's modern DX (HMR, Vite, browser preview) is compelling, but this documentation's value (design system, custom components, AI optimization) is framework-agnostic and could benefit Plugma users.

---

## Getting Started

### Option 1: Plugma
```bash
npm create plugma@latest
# Follow interactive prompts
```

### Option 2: @create-figma-plugin
```bash
npx create-figma-plugin
```

### Option 3: This Documentation + @create-figma-plugin
1. Follow the [Quick Start Guide](./FIGMA-PLUGIN-QUICK-START.md)
2. Share [Design Principles](./FIGMA-PLUGIN-DESIGN-PRINCIPLES.md) and [UI Components Reference](./FIGMA-PLUGIN-UI-COMPONENTS-REFERENCE.md) with your AI
3. Describe your plugin idea
4. Let AI build using these guidelines

---

**Bottom Line:**  
- **Plugma** = Modern tooling, framework flexibility, fast DX
- **@create-figma-plugin** = Native Figma UI, established ecosystem
- **This Documentation** = AI-optimized guidance for production-grade plugins using @create-figma-plugin

All three have value—choose based on your priorities: framework, tooling, or guidance.
