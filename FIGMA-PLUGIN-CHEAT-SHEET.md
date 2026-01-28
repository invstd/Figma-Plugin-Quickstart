# Figma Plugin Cheat Sheet

**Quick reference for essential commands, patterns, and variables**

> ⚠️ **Before you start:** Read the [Design Principles Guide](./FIGMA-PLUGIN-DESIGN-PRINCIPLES.md) to avoid common UI mistakes!

---

## 🚀 Setup Commands

```bash
# Create new plugin project
mkdir my-plugin && cd my-plugin && npm init -y

# Install all dependencies (one command)
npm i @create-figma-plugin/ui@^4.0.3 @create-figma-plugin/utilities@^4.0.3 preact@">=10" && npm i -D @create-figma-plugin/build@^4.0.3 @create-figma-plugin/tsconfig@^4.0.3 @figma/plugin-typings@1.109.0 @tailwindcss/cli@">=4" tailwindcss@">=4" typescript@">=5" concurrently@">=9"

# Create directory structure
mkdir -p src types services
```

---

## ⚙️ package.json Scripts

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
    "id": "YOUR_PLUGIN_ID",
    "name": "Plugin Name",
    "main": "src/main.ts",
    "ui": "src/ui.tsx",
    "documentAccess": "dynamic-page",
    "networkAccess": { "allowedDomains": [] }
  }
}
```

---

## 🎨 Figma Color Variables (Always Use These!)

**⚠️ NEVER use hardcoded colors!** See [Design Principles](./FIGMA-PLUGIN-DESIGN-PRINCIPLES.md) for complete guidelines.

### Text Colors
```typescript
color: 'var(--figma-color-text)'              // Primary text
color: 'var(--figma-color-text-secondary)'    // Secondary text
color: 'var(--figma-color-text-tertiary)'     // Tertiary text
color: 'var(--figma-color-text-disabled)'     // Disabled text
color: 'var(--figma-color-text-brand)'        // Brand/accent text

// IMPORTANT: Use matching "on" colors with semantic backgrounds!
color: 'var(--figma-color-text-onbrand)'      // With bg-brand
color: 'var(--figma-color-text-onsuccess)'    // With bg-success
color: 'var(--figma-color-text-onwarning)'    // With bg-warning
color: 'var(--figma-color-text-ondanger)'     // With bg-danger
```

**⚠️ Critical Color Pairing Rules:**
- `bg-success` → `text-onsuccess`
- `bg-warning` → `text-onwarning`
- `bg-danger` → `text-ondanger`
- `bg-brand` → `text-onbrand`

### Background Colors
```typescript
backgroundColor: 'var(--figma-color-bg)'                  // Primary background
backgroundColor: 'var(--figma-color-bg-secondary)'        // Secondary background
backgroundColor: 'var(--figma-color-bg-tertiary)'         // Tertiary background
backgroundColor: 'var(--figma-color-bg-hover)'            // Hover state
backgroundColor: 'var(--figma-color-bg-brand)'            // Brand background
backgroundColor: 'var(--figma-color-bg-danger)'           // Error/danger
backgroundColor: 'var(--figma-color-bg-success)'          // Success
backgroundColor: 'var(--figma-color-bg-warning)'          // Warning
backgroundColor: 'var(--figma-color-bg-brand-tertiary)'   // Brand tertiary
```

### Border Colors
```typescript
borderColor: 'var(--figma-color-border)'         // Standard border
borderColor: 'var(--figma-color-border-strong)'  // Emphasized border
```

---

## 📏 Typography Reference

**⚠️ IMPORTANT:** Figma does NOT provide CSS variables for typography. Use these fixed values:

### Figma's Standard Typography Scale

| Font Size | Line Height | Usage | Font Weight |
|-----------|-------------|-------|-------------|
| `11px` | `16px` | Body text, labels | `400` (default) |
| `12px` | `16px` | Slightly larger body | `400` |
| `13px` | `20px` | Section headers | `600` |

### Examples
```typescript
// Body text (most common)
style={{ fontSize: '11px', lineHeight: '16px', fontWeight: '400' }}

// Section header
style={{ fontSize: '13px', lineHeight: '20px', fontWeight: '600' }}

// Slightly larger body
style={{ fontSize: '12px', lineHeight: '16px', fontWeight: '400' }}
```

**Font Weights:**
- `400` - Regular (body text)
- `500` - Medium (subtle emphasis)
- `600` - Semibold (headers)

**❌ Never:**
- Use custom `font-family`
- Mix wrong font-size/line-height pairs
- Omit `lineHeight`

---

## 📡 UI ↔ Backend Communication

### Send from UI to Backend
```typescript
import { emit } from '@create-figma-plugin/utilities';

// Send message
emit('event-name', { data: 'value' });
```

### Receive in Backend
```typescript
import { on } from '@create-figma-plugin/utilities';

// Listen for message
on('event-name', (data: { data: string }) => {
  console.log(data.data);
});
```

### Send from Backend to UI
```typescript
import { emit } from '@create-figma-plugin/utilities';

// Send to UI
emit('ui-event', { result: 'success' });
```

### Receive in UI
```typescript
import { on } from '@create-figma-plugin/utilities';

useEffect(() => {
  on('ui-event', (data: { result: string }) => {
    console.log(data.result);
  });
}, []);
```

---

## 🎪 Common UI Components

### Button
```typescript
import { Button } from '@create-figma-plugin/ui';

<Button onClick={handleClick}>Primary Button</Button>
<Button onClick={handleClick} secondary>Secondary Button</Button>
<Button onClick={handleClick} disabled>Disabled</Button>
```

### Textbox
```typescript
import { Textbox } from '@create-figma-plugin/ui';

<Textbox
  value={text}
  placeholder="Enter text..."
  onValueInput={setText}
  password  // For password fields
  disabled  // For disabled state
/>
```

### Dropdown
```typescript
import { Dropdown } from '@create-figma-plugin/ui';

<Dropdown
  value={selected}
  options={[
    { value: 'opt1', text: 'Option 1' },
    { value: 'opt2', text: 'Option 2' }
  ]}
  placeholder="Select..."
  onValueChange={setSelected}
/>
```

### Layout Components
```typescript
import { Container, Stack, Inline, VerticalSpace } from '@create-figma-plugin/ui';

<Container space="medium">
  <Stack space="medium">
    {/* Items stacked vertically */}
  </Stack>
  
  <Inline space="small">
    {/* Items in a row */}
  </Inline>
  
  <VerticalSpace space="large" />
</Container>
```

### Text
```typescript
import { Text, Muted } from '@create-figma-plugin/ui';

<Text style={{ fontSize: '13px', fontWeight: '600' }}>Title</Text>
<Muted>Secondary text</Muted>
```

---

## 🖱️ Custom Scrollbar Markup

```typescript
<div className="custom-scroll-container" style={{ flex: 1, position: 'relative' }}>
  <div ref={scrollRef} className="custom-scroll-content">
    {/* Content */}
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
```

---

## 🔧 Common Backend Operations

### Show UI
```typescript
import { showUI } from '@create-figma-plugin/utilities';

// MUST include themeColors: true for design tokens to work!
showUI({ width: 400, height: 500 }, { themeColors: true });
```

### Show Notification
```typescript
figma.notify('Success message');
figma.notify('Error message', { error: true });
figma.notify('Info message', { timeout: 2000 });
```

### Close Plugin
```typescript
figma.closePlugin();
figma.closePlugin('Closing with message');
```

### Get Current Selection
```typescript
const selection = figma.currentPage.selection;
if (selection.length === 0) {
  figma.notify('Nothing selected');
  return;
}
```

### Navigate to Node
```typescript
const node = figma.getNodeById('node-id');
if (node) {
  figma.currentPage = node.parent as PageNode; // Switch page if needed
  figma.currentPage.selection = [node];
  figma.viewport.scrollAndZoomIntoView([node]);
}
```

### Load All Pages (for scanning)
```typescript
await figma.loadAllPagesAsync();
const pages = figma.root.children.filter(p => p.type === 'PAGE');
```

---

## 💾 Client Storage

### Save Data
```typescript
await figma.clientStorage.setAsync('key', { data: 'value' });
```

### Load Data
```typescript
const data = await figma.clientStorage.getAsync('key');
```

### Delete Data
```typescript
await figma.clientStorage.deleteAsync('key');
```

---

## 🎯 TypeScript Types

### Common Node Types
```typescript
type SceneNode = FrameNode | GroupNode | ComponentNode | InstanceNode | 
                 TextNode | RectangleNode | EllipseNode | LineNode | ...

type PageNode = PageNode
type ComponentNode = ComponentNode
type InstanceNode = InstanceNode
type FrameNode = FrameNode
type TextNode = TextNode
```

### Type Guards
```typescript
if (node.type === 'COMPONENT') {
  // node is ComponentNode
}

if (node.type === 'INSTANCE') {
  // node is InstanceNode
}

if ('children' in node) {
  // node has children
}
```

---

## 🏗️ File Structure

```
my-plugin/
├── src/
│   ├── main.ts           ← Backend
│   ├── ui.tsx            ← UI
│   └── input.css         ← Styles
├── types/                ← Type definitions
├── services/             ← Business logic
├── build/                ← Output (gitignore)
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

---

## 🐛 Debugging

### Open DevTools (in Figma)
```
Mac: Option + Cmd + I
Windows: Ctrl + Alt + I
```

### Reload Plugin
```
Mac: Cmd + Option + P
Windows: Ctrl + Alt + P
Then type: "Reload plugin"
```

### Console Logging
```typescript
console.log('Debug info:', data);
console.error('Error:', error);
console.warn('Warning:', warning);
```

---

## 📦 Build Commands

```bash
npm run build        # Build everything
npm run watch        # Watch mode (dev)
npm run build:css    # Build CSS only
npm run build:js     # Build JS only
```

---

## 🎨 CSS Classes Reference

### Custom Scrollbar
```css
.custom-scroll-container     /* Container */
.custom-scroll-content       /* Scrollable content */
.custom-scrollbar-track      /* Scrollbar track */
.custom-scrollbar-thumb      /* Scrollbar thumb */
```

---

## ⚡ Quick Patterns

### Loading State
```typescript
const [loading, setLoading] = useState(false);

const handleAction = async () => {
  setLoading(true);
  try {
    await doSomething();
  } finally {
    setLoading(false);
  }
};

<Button onClick={handleAction} disabled={loading}>
  {loading ? 'Loading...' : 'Submit'}
</Button>
```

### Error Handling
```typescript
const [error, setError] = useState<string | null>(null);

try {
  // Operation
  setError(null);
} catch (err) {
  setError(err.message);
}

{error && (
  <div style={{ 
    padding: '12px', 
    backgroundColor: 'var(--figma-color-bg-danger)',
    color: 'var(--figma-color-text-ondanger)',  // Correct pairing!
    borderRadius: '6px'
  }}>
    <Text>{error}</Text>
  </div>
)}
```

### Toast Notification
```typescript
const [toast, setToast] = useState<string | null>(null);

const showToast = (message: string) => {
  setToast(message);
  setTimeout(() => setToast(null), 3000);
};

{toast && (
  <div style={{
    position: 'fixed',
    bottom: '16px',
    left: '16px',
    right: '16px',
    padding: '12px',
    backgroundColor: 'var(--figma-color-bg-success)',
    color: 'var(--figma-color-text-onsuccess)',  // Correct pairing!
    borderRadius: '6px'
  }}>
    {toast}
  </div>
)}
```

---

## 📚 Full Documentation

- **Design Principles**: [FIGMA-PLUGIN-DESIGN-PRINCIPLES.md](./FIGMA-PLUGIN-DESIGN-PRINCIPLES.md) ⭐ **Read first!**
- **Quick Start**: [FIGMA-PLUGIN-QUICK-START.md](./FIGMA-PLUGIN-QUICK-START.md)
- **Complete Guide**: [FIGMA-PLUGIN-INFRASTRUCTURE-SETUP.md](./FIGMA-PLUGIN-INFRASTRUCTURE-SETUP.md)
- **Overview**: [FIGMA-PLUGIN-STARTER-GUIDE.md](./FIGMA-PLUGIN-STARTER-GUIDE.md)

---

**Keep this open while building!** 📌
