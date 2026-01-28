# Figma Plugin Quick Start Template

**A rapid-start template for creating production-ready Figma plugins**

Use this as a quick reference when you want to start a new Figma plugin with the TokenMatch infrastructure. For detailed explanations, see [FIGMA-PLUGIN-INFRASTRUCTURE-SETUP.md](./FIGMA-PLUGIN-INFRASTRUCTURE-SETUP.md).

> ⚠️ **IMPORTANT:** Before building any UI, read the [Design Principles Guide](./FIGMA-PLUGIN-DESIGN-PRINCIPLES.md) to ensure your plugin matches Figma's interface and avoids common mistakes like wrong colors, missing line heights, and contrast issues.

---

## 🚀 Quick Setup (5 minutes)

```bash
# 1. Create and initialize project
mkdir my-plugin && cd my-plugin
npm init -y

# 2. Install dependencies (copy-paste this entire block)
npm install @create-figma-plugin/ui@^4.0.3 @create-figma-plugin/utilities@^4.0.3 preact@">=10"
npm install --save-dev @create-figma-plugin/build@^4.0.3 @create-figma-plugin/tsconfig@^4.0.3 @figma/plugin-typings@1.109.0 @tailwindcss/cli@">=4" tailwindcss@">=4" typescript@">=5" concurrently@">=9"

# 3. Create directory structure
mkdir -p src types services
```

---

## 📦 package.json Configuration

Add/replace in `package.json`:

```json
{
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
    "id": "YOUR_PLUGIN_ID_HERE",
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

---

## 📄 Configuration Files

### `tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}']
}
```

### `tsconfig.json`
```json
{
  "extends": "@create-figma-plugin/tsconfig",
  "compilerOptions": {
    "typeRoots": ["node_modules/@figma", "node_modules/@types"]
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"]
}
```

---

## 🎨 Essential Files

### `src/input.css` (Copy Entire File)

<details>
<summary>Click to expand full CSS file</summary>

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
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.custom-scroll-content::-webkit-scrollbar {
  display: none;
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

/* Default scrollbar styling */
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

/* Fix disabled button contrast */
button[disabled] {
  color: var(--figma-color-text-disabled) !important;
}
```
</details>

---

### `src/ui.tsx` (Minimal Starter with Scrollbar)

<details>
<summary>Click to expand starter UI template</summary>

```typescript
import { render, Button, Textbox, Text, Stack, Container } from '@create-figma-plugin/ui';
import { h } from 'preact';
import { useState, useEffect, useRef, useCallback } from 'preact/hooks';
import { on, emit } from '@create-figma-plugin/utilities';
import '!./output.css';

// Custom scrollbar hook
function useCustomScrollbar(contentRef: React.RefObject<HTMLDivElement>) {
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const dragStartRef = useRef<{ y: number; scrollTop: number } | null>(null);

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

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const handleScroll = () => updateScrollbar();
    content.addEventListener('scroll', handleScroll);
    
    updateScrollbar();
    
    const resizeObserver = new ResizeObserver(updateScrollbar);
    resizeObserver.observe(content);

    return () => {
      content.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
    };
  }, [contentRef, updateScrollbar]);

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

function Plugin() {
  const [message, setMessage] = useState('');
  const mainScrollRef = useRef<HTMLDivElement>(null);
  const customScrollbar = useCustomScrollbar(mainScrollRef);

  useEffect(() => {
    // Listen for messages from backend
    on('example-event', (data: any) => {
      console.log('Received:', data);
    });
  }, []);

  const handleSubmit = () => {
    emit('submit-message', { message });
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      overflow: 'hidden'
    }}>
      <div className="custom-scroll-container" style={{ flex: 1, position: 'relative' }}>
        <div 
          ref={mainScrollRef}
          className="custom-scroll-content"
        >
          <Container space="medium">
            <Stack space="medium">
              <div style={{ marginTop: '16px' }}>
                <Text style={{ fontSize: '13px', fontWeight: '600' }}>My Plugin</Text>
              </div>
              
              <Stack space="small">
                <Text>Enter Message</Text>
                <Textbox
                  value={message}
                  placeholder="Type something..."
                  onValueInput={setMessage}
                />
              </Stack>

              <Button onClick={handleSubmit}>
                Submit
              </Button>
            </Stack>
          </Container>
        </div>
        
        {customScrollbar.showScrollbar && (
          <div 
            className={`custom-scrollbar-track ${customScrollbar.isDragging ? 'dragging' : ''}`}
            onClick={customScrollbar.handleTrackClick as any}
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

export default render(Plugin);
```
</details>

---

### `src/main.ts` (Minimal Backend)

```typescript
import { showUI, on, emit } from '@create-figma-plugin/utilities';

export default function () {
  // Show plugin UI - themeColors MUST be true for design tokens to work!
  showUI({ width: 400, height: 500 }, { themeColors: true });

  // Handle messages from UI
  on('submit-message', (data: { message: string }) => {
    figma.notify(`Received: ${data.message}`);
    
    // Send response back to UI
    emit('example-event', { success: true });
  });
}
```

---

## 🎬 Build & Run

```bash
# Build once
npm run build

# Development with hot reload
npm run watch
```

**In Figma:**
1. Plugins → Development → Import plugin from manifest
2. Select your `manifest.json`
3. Run the plugin
4. To reload after changes: Cmd/Ctrl + Option/Alt + P → "Reload plugin"

---

## 🎨 Figma Design Tokens Reference

**⚠️ CRITICAL:** Always use Figma's built-in variables for theming. Never use hardcoded colors!

For complete design guidelines, see [FIGMA-PLUGIN-DESIGN-PRINCIPLES.md](./FIGMA-PLUGIN-DESIGN-PRINCIPLES.md).

### Colors
```typescript
// ✅ Correct - adapts to light/dark mode
style={{ 
  color: 'var(--figma-color-text)',
  backgroundColor: 'var(--figma-color-bg-secondary)',
  border: '1px solid var(--figma-color-border)'
}}

// ❌ Wrong - hardcoded colors break in dark mode
style={{ 
  color: '#333',
  backgroundColor: '#f5f5f5',
  border: '1px solid #ddd'
}}
```

### Typography

**⚠️ IMPORTANT:** Figma does NOT provide CSS variables for typography. Use these fixed values:

| Font Size | Line Height | Usage |
|-----------|-------------|-------|
| `11px` | `16px` | Body text, labels (DEFAULT) |
| `12px` | `16px` | Slightly larger body |
| `13px` | `20px` | Section headers |

```typescript
// ✅ Correct - body text with proper line height
style={{ 
  fontSize: '11px',
  lineHeight: '16px',
  fontWeight: '400'
}}

// ✅ Correct - section header
style={{ 
  fontSize: '13px',
  lineHeight: '20px',  // 13px uses 20px, not 16px!
  fontWeight: '600'
}}

// ❌ Wrong - missing line height
style={{ fontSize: '11px' }}

// ❌ Wrong - incorrect line height for 13px
style={{ fontSize: '13px', lineHeight: '16px' }}
```

**Common Variables:**
- `--figma-color-text` (primary text)
- `--figma-color-text-secondary` (secondary text)
- `--figma-color-bg` (primary background)
- `--figma-color-bg-secondary` (secondary background)
- `--figma-color-bg-hover` (hover states)
- `--figma-color-bg-brand` (accent/brand color)
- `--figma-color-border` (borders)
- `--figma-color-border-strong` (emphasized borders)

---

## 📦 Project Structure

```
my-plugin/
├── src/
│   ├── main.ts           ← Backend logic
│   ├── ui.tsx            ← UI components
│   ├── input.css         ← Tailwind input
│   └── output.css        ← Generated (gitignore)
├── types/                ← TypeScript types
├── services/             ← Business logic
├── build/                ← Generated (gitignore)
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── manifest.json         ← Auto-generated
```

---

## 🔧 Common Customizations

### Add Network Access
```json
"networkAccess": {
  "allowedDomains": [
    "https://api.github.com",
    "https://your-api.com"
  ]
}
```

### Enable FigJam Support
```json
"editorType": ["figma", "figjam"]
```

### Window Resize Handler
```typescript
// In main.ts
on('resize-window', (size: { width: number; height: number }) => {
  figma.ui.resize(size.width, size.height);
});
```

---

## ✅ Pre-Launch Checklist

- [ ] Plugin builds without errors (`npm run build`)
- [ ] Watch mode works (`npm run watch`)
- [ ] UI displays correctly in Figma
- [ ] Light mode looks good
- [ ] Dark mode looks good
- [ ] Custom scrollbar works
- [ ] All buttons/inputs functional
- [ ] UI ↔ Backend communication works
- [ ] No console errors
- [ ] Resizable window (if enabled)

---

## 🐛 Quick Troubleshooting

**CSS not updating?**
```bash
rm src/output.css && npm run build:css
```

**TypeScript errors?**
```bash
npm install --save-dev @figma/plugin-typings@latest
```

**Plugin won't load?**
- Check `manifest.json` exists
- Verify `build/main.js` and `build/ui.js` exist
- Open Figma DevTools (Option + Cmd + I / Ctrl + Alt + I)

---

## 📚 Full Documentation

For detailed explanations, architecture details, and advanced topics:
→ **[FIGMA-PLUGIN-INFRASTRUCTURE-SETUP.md](./FIGMA-PLUGIN-INFRASTRUCTURE-SETUP.md)**

---

**That's it! You're ready to build.** 🚀

This infrastructure gives you:
✅ Production-ready tooling
✅ Beautiful, responsive UI
✅ Automatic theme support
✅ Custom scrollbar
✅ TypeScript safety
✅ Fast development workflow
