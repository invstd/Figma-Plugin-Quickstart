# Figma Plugin Infrastructure Setup Guide

**A comprehensive guide for setting up a production-ready Figma plugin with modern tooling**

This document provides step-by-step instructions for creating a Figma plugin with the infrastructure used in TokenMatch. Use this as a reference for kickstarting new Figma plugin projects with a robust foundation.

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Core Infrastructure Setup](#core-infrastructure-setup)
4. [UI Framework Configuration](#ui-framework-configuration)
5. [Styling System (Tailwind CSS)](#styling-system-tailwind-css)
6. [Custom Scrollbar Implementation](#custom-scrollbar-implementation)
7. [Theme Support (Light/Dark Mode)](#theme-support-lightdark-mode)
8. [Build System](#build-system)
9. [TypeScript Configuration](#typescript-configuration)
10. [Project Structure](#project-structure)
11. [Verification & Testing](#verification--testing)
12. [Common Customizations](#common-customizations)

---

## Overview

This infrastructure provides:
- **@create-figma-plugin** framework for Figma-native UI components
- **Preact** for efficient, lightweight rendering
- **Tailwind CSS v4** for modern utility-first styling
- **Custom scrollbar** implementation with smooth interactions
- **Automatic light/dark mode** support using Figma design tokens
- **TypeScript** with proper type definitions
- **Hot reload** development workflow

---

## Prerequisites

Before starting, ensure you have:
- Node.js (v16 or higher)
- npm (v7 or higher)
- Figma desktop app (for testing)
- Basic knowledge of TypeScript/React patterns

---

## Core Infrastructure Setup

### Step 1: Initialize Project

```bash
# Create project directory
mkdir my-figma-plugin
cd my-figma-plugin

# Initialize npm project
npm init -y
```

### Step 2: Install Core Dependencies

```bash
# Install Figma plugin framework
npm install @create-figma-plugin/ui@^4.0.3 @create-figma-plugin/utilities@^4.0.3

# Install Preact (required by @create-figma-plugin)
npm install preact@">=10"
```

### Step 3: Install Development Dependencies

```bash
# Install build tools
npm install --save-dev @create-figma-plugin/build@^4.0.3
npm install --save-dev @create-figma-plugin/tsconfig@^4.0.3
npm install --save-dev @figma/plugin-typings@1.109.0

# Install Tailwind CSS v4
npm install --save-dev @tailwindcss/cli@">=4"
npm install --save-dev tailwindcss@">=4"

# Install TypeScript
npm install --save-dev typescript@">=5"

# Install concurrently for parallel builds
npm install --save-dev concurrently@">=9"
```

---

## UI Framework Configuration

### Step 4: Create package.json Configuration

Add the following `figma-plugin` configuration to your `package.json`:

```json
{
  "name": "my-figma-plugin",
  "version": "1.0.0",
  "description": "My Figma plugin description",
  "scripts": {
    "build": "npm run build:css && npm run build:js",
    "build:css": "npx @tailwindcss/cli --input ./src/input.css --output ./src/output.css",
    "build:js": "build-figma-plugin --typecheck --minify",
    "watch": "npm run build:css && concurrently npm:watch:css npm:watch:js",
    "watch:css": "npx @tailwindcss/cli --input ./src/input.css --output ./src/output.css --watch",
    "watch:js": "build-figma-plugin --typecheck --watch"
  },
  "figma-plugin": {
    "editorType": ["figma"],
    "id": "YOUR_PLUGIN_ID",
    "name": "My Plugin Name",
    "main": "src/main.ts",
    "ui": "src/ui.tsx",
    "documentAccess": "dynamic-page",
    "networkAccess": {
      "allowedDomains": []
    }
  }
}
```

**Key Configuration Options:**

- **`editorType`**: Set to `["figma"]` for Figma-only, or add `"figjam"` for FigJam support
- **`id`**: Your plugin's unique ID (obtained from Figma when creating a plugin)
- **`name`**: Display name in Figma
- **`documentAccess`**: 
  - `"dynamic-page"` - Access to current page and document structure
  - `"current-page"` - Current page only (more restricted)
- **`networkAccess`**: Specify allowed domains for API calls (e.g., `["https://api.github.com"]`)

---

## Styling System (Tailwind CSS)

### Step 5: Create Tailwind Configuration

Create `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}']
}
```

### Step 6: Create Input CSS File

Create `src/input.css`:

```css
@import "tailwindcss";

/* Hide native scrollbar for custom scrollbar containers */
.custom-scroll-container {
  position: relative;
  overflow: hidden;
}

.custom-scroll-content {
  overflow-y: scroll;
  height: 100%;
  /* Hide native scrollbar */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

.custom-scroll-content::-webkit-scrollbar {
  display: none; /* Chrome/Safari/Opera */
}

/* Custom scrollbar track */
.custom-scrollbar-track {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 8px;
  background: transparent;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.custom-scroll-container:hover .custom-scrollbar-track,
.custom-scrollbar-track.dragging {
  opacity: 1;
}

/* Custom scrollbar thumb */
.custom-scrollbar-thumb {
  position: absolute;
  right: 0;
  width: 8px;
  min-height: 30px;
  background: var(--figma-color-border);
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.custom-scrollbar-thumb:hover,
.custom-scrollbar-thumb.dragging {
  background: var(--figma-color-border-strong);
}

/* Default scrollbar styling for other elements */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--figma-color-border);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--figma-color-border-strong);
}

/* Fix for disabled button text visibility in light mode
   The @create-figma-plugin/ui library uses var(--figma-color-text-ondisabled)
   which may not have sufficient contrast in light mode. Override with explicit
   disabled text color to ensure readability in both themes. */
button[disabled] {
  color: var(--figma-color-text-disabled) !important;
}
```

**What this provides:**
- Tailwind CSS utilities for rapid styling
- Custom scrollbar styles (see next section)
- Figma-native design token variables
- Light/dark mode compatibility fixes

---

## Custom Scrollbar Implementation

### Step 7: Add Custom Scrollbar Hook

The custom scrollbar provides an overlay scrollbar that doesn't affect layout and works beautifully in both light and dark modes.

Add this to your `src/ui.tsx`:

```typescript
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';

// Custom scrollbar hook - creates an overlay scrollbar without layout shift
function useCustomScrollbar(contentRef: React.RefObject<HTMLDivElement>) {
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const dragStartRef = useRef<{ y: number; scrollTop: number } | null>(null);

  // Calculate thumb size and position
  const updateScrollbar = useCallback(() => {
    const content = contentRef.current;
    if (!content) return;

    const { scrollHeight, clientHeight, scrollTop } = content;
    const hasScroll = scrollHeight > clientHeight;
    setShowScrollbar(hasScroll);

    if (hasScroll) {
      const ratio = clientHeight / scrollHeight;
      const newThumbHeight = Math.max(30, clientHeight * ratio);
      const maxScrollTop = scrollHeight - clientHeight;
      const scrollRatio = scrollTop / maxScrollTop;
      const maxThumbTop = clientHeight - newThumbHeight;
      
      setThumbHeight(newThumbHeight);
      setThumbTop(scrollRatio * maxThumbTop);
    }
  }, [contentRef]);

  // Handle scroll events
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const handleScroll = () => updateScrollbar();
    content.addEventListener('scroll', handleScroll);
    
    // Initial calculation
    updateScrollbar();
    
    // Recalculate on resize
    const resizeObserver = new ResizeObserver(updateScrollbar);
    resizeObserver.observe(content);

    return () => {
      content.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
    };
  }, [contentRef, updateScrollbar]);

  // Handle thumb drag
  const handleThumbMouseDown = useCallback((e: MouseEvent) => {
    e.preventDefault();
    const content = contentRef.current;
    if (!content) return;

    setIsDragging(true);
    dragStartRef.current = { y: e.clientY, scrollTop: content.scrollTop };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!dragStartRef.current || !contentRef.current) return;
      
      const deltaY = moveEvent.clientY - dragStartRef.current.y;
      const content = contentRef.current;
      const { scrollHeight, clientHeight } = content;
      const maxScrollTop = scrollHeight - clientHeight;
      const thumbRange = clientHeight - thumbHeight;
      const scrollRatio = deltaY / thumbRange;
      
      content.scrollTop = dragStartRef.current.scrollTop + (scrollRatio * maxScrollTop);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragStartRef.current = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [contentRef, thumbHeight]);

  // Handle track click
  const handleTrackClick = useCallback((e: MouseEvent) => {
    const content = contentRef.current;
    if (!content || e.target !== e.currentTarget) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const { scrollHeight, clientHeight } = content;
    const clickRatio = clickY / clientHeight;
    
    content.scrollTop = (scrollHeight - clientHeight) * clickRatio;
  }, [contentRef]);

  return {
    thumbHeight,
    thumbTop,
    isDragging,
    showScrollbar,
    handleThumbMouseDown,
    handleTrackClick
  };
}
```

### Step 8: Implement Scrollbar in UI

```typescript
function Plugin() {
  // Create ref for scrollable content
  const mainScrollRef = useRef<HTMLDivElement>(null);
  const customScrollbar = useCustomScrollbar(mainScrollRef);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      overflow: 'hidden'
    }}>
      {/* Scrollable content area with custom scrollbar */}
      <div className="custom-scroll-container" style={{ flex: 1, position: 'relative' }}>
        <div 
          ref={mainScrollRef}
          className="custom-scroll-content"
          style={{ paddingBottom: '36px' }} // Space for footer if needed
        >
          {/* Your plugin content goes here */}
          <Container space="medium">
            {/* ... */}
          </Container>
        </div>
        
        {/* Custom scrollbar track and thumb */}
        {customScrollbar.showScrollbar && (
          <div 
            className={`custom-scrollbar-track ${customScrollbar.isDragging ? 'dragging' : ''}`}
            onClick={customScrollbar.handleTrackClick as any}
            style={{ opacity: 1 }}
          >
            <div 
              className={`custom-scrollbar-thumb ${customScrollbar.isDragging ? 'dragging' : ''}`}
              style={{ 
                height: `${customScrollbar.thumbHeight}px`,
                top: `${customScrollbar.thumbTop}px`
              }}
              onMouseDown={customScrollbar.handleThumbMouseDown as any}
            />
          </div>
        )}
      </div>
    </div>
  );
}
```

**Features:**
- Overlay scrollbar (doesn't affect layout)
- Smooth drag interactions
- Auto-hide/show on hover
- Responsive to content changes
- Works with ResizeObserver for dynamic content

---

## Theme Support (Light/Dark Mode)

### Step 9: Understanding Figma Design Tokens

Figma automatically provides CSS variables that adapt to the user's theme preference:

**Color Variables:**
```css
--figma-color-text              /* Primary text */
--figma-color-text-secondary    /* Secondary text */
--figma-color-text-tertiary     /* Tertiary text */
--figma-color-text-disabled     /* Disabled text */
--figma-color-text-brand        /* Brand/accent text */

--figma-color-bg                /* Primary background */
--figma-color-bg-secondary      /* Secondary background */
--figma-color-bg-tertiary       /* Tertiary background */
--figma-color-bg-hover          /* Hover state background */
--figma-color-bg-brand          /* Brand background */
--figma-color-bg-danger         /* Error/danger background */
--figma-color-bg-success        /* Success background */
--figma-color-bg-warning        /* Warning background */

--figma-color-border            /* Border color */
--figma-color-border-strong     /* Emphasized border */
```

**Usage Example:**
```typescript
<div style={{ 
  color: 'var(--figma-color-text)',
  backgroundColor: 'var(--figma-color-bg-secondary)',
  border: '1px solid var(--figma-color-border)'
}}>
  Content
</div>
```

**Best Practices:**
- ✅ Always use Figma color variables (not hardcoded colors)
- ✅ Test in both light and dark modes
- ✅ Use semantic color names (`--figma-color-text-secondary` not `#666`)
- ❌ Avoid hardcoded hex colors or RGB values

---

## Build System

### Step 10: Understanding the Build Process

The build system has two parallel processes:

**1. CSS Build (Tailwind)**
```bash
npm run build:css
# Processes: src/input.css → src/output.css
```

**2. JavaScript/TypeScript Build**
```bash
npm run build:js
# Processes: src/main.ts + src/ui.tsx → build/main.js + build/ui.js
```

**Development Workflow:**
```bash
npm run watch
# Runs both watchers in parallel with auto-reload
```

**Production Build:**
```bash
npm run build
# Creates optimized, minified builds
```

### Step 11: Create manifest.json

The `@create-figma-plugin` build tool automatically generates `manifest.json`, but you can verify it looks like this:

```json
{
  "api": "1.0.0",
  "editorType": ["figma"],
  "id": "YOUR_PLUGIN_ID",
  "name": "My Plugin Name",
  "main": "build/main.js",
  "ui": "build/ui.js",
  "documentAccess": "dynamic-page",
  "networkAccess": {
    "allowedDomains": []
  }
}
```

---

## TypeScript Configuration

### Step 12: Create tsconfig.json

```json
{
  "extends": "@create-figma-plugin/tsconfig",
  "compilerOptions": {
    "typeRoots": ["node_modules/@figma", "node_modules/@types"]
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"]
}
```

**What this provides:**
- Proper Figma API type definitions
- Preact JSX support
- Modern TypeScript features
- Optimal compiler settings for Figma plugins

---

## Project Structure

### Step 13: Create Standard Directory Structure

```
my-figma-plugin/
├── src/
│   ├── main.ts           # Plugin backend (Figma API interactions)
│   ├── ui.tsx            # Plugin UI (Preact components)
│   ├── input.css         # Tailwind input file
│   ├── output.css        # Generated CSS (gitignore this)
│   └── output.css.d.ts   # TypeScript definitions for CSS
├── build/                # Generated plugin files (gitignore this)
│   ├── main.js
│   └── ui.js
├── types/                # TypeScript type definitions
│   └── *.ts
├── services/             # Business logic services
│   └── *.ts
├── documentation/        # Project documentation
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── manifest.json         # Auto-generated
└── README.md
```

### Step 14: Create Basic UI Entry Point

Create `src/ui.tsx`:

```typescript
import { render, Button, Textbox, Text, Stack, Container } from '@create-figma-plugin/ui';
import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { on, emit } from '@create-figma-plugin/utilities';
import '!./output.css';

function Plugin() {
  const [message, setMessage] = useState('Hello, Figma!');

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      overflow: 'hidden'
    }}>
      <Container space="medium">
        <Stack space="medium">
          <Text style={{ fontSize: '13px', fontWeight: '600' }}>My Plugin</Text>
          <Textbox
            value={message}
            placeholder="Enter text..."
            onValueInput={setMessage}
          />
          <Button onClick={() => emit('submit-message', { message })}>
            Submit
          </Button>
        </Stack>
      </Container>
    </div>
  );
}

export default render(Plugin);
```

**Important Details:**
- `import '!./output.css'` - The `!` prefix tells webpack to skip CSS module processing
- `render()` wraps your component for Figma plugin context
- Use `emit()` to send messages to the plugin backend
- Use `on()` to receive messages from the plugin backend

### Step 15: Create Basic Plugin Backend

Create `src/main.ts`:

```typescript
import { showUI, on, emit } from '@create-figma-plugin/utilities';

export default function () {
  // Show the plugin UI
  showUI({ width: 400, height: 300 }, { resizable: true });

  // Handle messages from UI
  on('submit-message', (data: { message: string }) => {
    figma.notify(`Received: ${data.message}`);
  });
}
```

---

## Verification & Testing

### Step 16: Build and Test

**1. Build the plugin:**
```bash
npm run build
```

**2. Load in Figma:**
- Open Figma desktop app
- Go to Plugins → Development → Import plugin from manifest
- Select your `manifest.json` file
- Run the plugin

**3. Test features:**
- ✅ UI renders correctly
- ✅ Light/dark mode switches properly
- ✅ Custom scrollbar appears and functions
- ✅ Buttons and inputs work
- ✅ Communication between UI and backend works

**4. Development workflow:**
```bash
npm run watch
```
Then in Figma:
- Make changes to code
- Press Cmd+Option+P (Mac) or Ctrl+Alt+P (Windows)
- Type "Reload plugin"
- Plugin updates with your changes

---

## Common Customizations

### Adding Network Access

If your plugin needs to call external APIs:

```json
"networkAccess": {
  "allowedDomains": [
    "https://api.github.com",
    "https://api.yourservice.com"
  ]
}
```

### Adding Document Access

For more comprehensive access to the Figma document:

```json
"documentAccess": "dynamic-page"  // Recommended for most plugins
```

Options:
- `"current-page"` - Only current page (most restrictive)
- `"dynamic-page"` - Current page + document structure (recommended)

### Enabling Window Resizing

Make your plugin window resizable:

```typescript
showUI({ width: 400, height: 550 }, { resizable: true });
```

Add resize handle in UI:

```typescript
const handleWindowResizeStart = (e: MouseEvent) => {
  // Implement resize logic
  emit('resize-window', { width, height });
};
```

Backend handler:

```typescript
on('resize-window', (size: { width: number; height: number }) => {
  figma.ui.resize(size.width, size.height);
});
```

### Adding Icons

Use inline SVG with Figma color variables:

```typescript
<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
  <path 
    d="M12 15C13.6569 15..." 
    stroke="currentColor" 
    strokeWidth="1.25"
  />
</svg>
```

This automatically adapts to theme colors.

---

## Key Learnings & Best Practices

### ✅ Do's

1. **Always use Figma design tokens** for colors (never hardcode)
2. **Test in both light and dark modes** before releasing
3. **Use the custom scrollbar pattern** for better UX
4. **Implement proper loading states** for async operations
5. **Handle errors gracefully** with user-friendly messages
6. **Use TypeScript strictly** for better reliability
7. **Keep UI and backend logic separated**

### ❌ Don'ts

1. **Don't hardcode colors** - use `var(--figma-color-*)`
2. **Don't block the UI thread** - use async operations
3. **Don't ignore accessibility** - use semantic HTML
4. **Don't skip error handling** - always handle edge cases
5. **Don't use large dependencies** - keep bundle size small
6. **Don't forget to test with large files** - performance matters

---

## Troubleshooting

### CSS not updating
```bash
# Force rebuild CSS
rm src/output.css
npm run build:css
```

### Plugin not loading
- Check `manifest.json` exists and is valid
- Verify `build/main.js` and `build/ui.js` exist
- Check console for errors in Figma DevTools

### TypeScript errors
```bash
# Reinstall type definitions
npm install --save-dev @figma/plugin-typings@latest
```

### Scrollbar not working
- Ensure `.custom-scroll-container` has `position: relative`
- Verify `.custom-scroll-content` has `height: 100%`
- Check that the ref is properly connected

---

## Next Steps

After setting up the infrastructure:

1. **Customize the UI** with your plugin's specific features
2. **Implement business logic** in service files
3. **Add state management** (useState, useReducer, or external store)
4. **Create documentation** for your plugin's features
5. **Test thoroughly** with real Figma files
6. **Prepare for publishing** (screenshots, description, etc.)

---

## Additional Resources

- [Figma Plugin API Documentation](https://www.figma.com/plugin-docs/)
- [@create-figma-plugin Documentation](https://github.com/yuanqing/create-figma-plugin)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Preact Documentation](https://preactjs.com/)

---

## Summary Checklist

Use this checklist when setting up a new plugin:

- [ ] Project initialized with npm
- [ ] All dependencies installed
- [ ] `package.json` configured with scripts and figma-plugin settings
- [ ] `tailwind.config.js` created
- [ ] `tsconfig.json` configured
- [ ] `src/input.css` created with custom scrollbar styles
- [ ] `src/ui.tsx` created with basic UI
- [ ] `src/main.ts` created with plugin backend
- [ ] Custom scrollbar hook implemented
- [ ] Build runs successfully (`npm run build`)
- [ ] Plugin loads in Figma
- [ ] Watch mode works (`npm run watch`)
- [ ] Light/dark mode tested
- [ ] Scrollbar functionality tested

---

**You now have a production-ready Figma plugin infrastructure!** 

This setup provides:
✅ Modern tooling and fast development workflow
✅ Beautiful UI with Figma-native components
✅ Proper light/dark mode support
✅ Custom scrollbar for better UX
✅ TypeScript for reliability
✅ Scalable architecture

Use this guide as a reference for all your future Figma plugin projects!
