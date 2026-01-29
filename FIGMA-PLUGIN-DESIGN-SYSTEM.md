# Figma Plugin Design System Specification

> **Purpose**: This document provides exact specifications for implementing Figma plugin UIs that follow Figma's native design system. Use this as a complete reference when building any Figma plugin interface.

## Table of Contents
1. [Design Principles](#design-principles)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Components](#components)
5. [Scrollbar Implementation](#scrollbar-implementation)
6. [Layout Structure](#layout-structure)
7. [States & Interactions](#states--interactions)

---

## Design Principles

### Core Guidelines
- **Native Figma Look**: Plugins should feel like native Figma interface elements
- **Use Figma Color Variables**: Always use `var(--figma-color-*)` CSS variables for automatic theming
- **No Layout Shift**: Custom scrollbars should overlay content, not push it
- **Minimal & Clean**: Follow Figma's minimal design aesthetic
- **Responsive**: Components should adapt to different plugin window sizes

---

## Color System

### Figma Color Variables

All colors MUST use Figma's CSS custom properties to ensure proper light/dark mode support.

#### Background Colors
```css
--figma-color-bg                    /* Primary background (main canvas) */
--figma-color-bg-secondary          /* Secondary background (cards, containers) */
--figma-color-bg-tertiary           /* Tertiary background (badges, tags) */
--figma-color-bg-hover              /* Hover state background */
--figma-color-bg-brand              /* Brand/accent background (blue) */
--figma-color-bg-brand-tertiary     /* Light brand background */
--figma-color-bg-success            /* Success state background (green) */
--figma-color-bg-warning            /* Warning state background (yellow) */
--figma-color-bg-danger             /* Error/danger state background (red) */
--figma-color-bg-disabled           /* Disabled element background */
```

#### Text Colors
```css
--figma-color-text                  /* Primary text */
--figma-color-text-secondary        /* Secondary text (less emphasis) */
--figma-color-text-tertiary         /* Tertiary text (lowest emphasis) */
--figma-color-text-disabled         /* Disabled text */
--figma-color-text-brand            /* Brand colored text */
--figma-color-text-onsuccess        /* Text on success background */
--figma-color-text-ondisabled       /* Text on disabled elements */
```

#### Border Colors
```css
--figma-color-border                /* Standard border */
--figma-color-border-strong         /* Stronger/darker border */
--figma-color-border-success        /* Success border */
--figma-color-border-brand          /* Brand colored border */
```

### Color Usage Examples

```css
/* Cards and containers */
background: var(--figma-color-bg-secondary);
border: 1px solid var(--figma-color-border);

/* Selected/highlighted items */
background: var(--figma-color-bg-brand);
color: #ffffff;

/* Error messages */
background: var(--figma-color-bg-danger);

/* Success indicators */
background: var(--figma-color-bg-success);
color: var(--figma-color-text-onsuccess);
border: 1px solid var(--figma-color-border-success);

/* Tags and badges */
background: var(--figma-color-bg-tertiary);
color: var(--figma-color-text);
```

---

## Typography

### Font Sizes
Figma plugins use a compact typography scale:

```css
/* Headers */
font-size: 13px; font-weight: 600;  /* Section headers */

/* Body */
font-size: 12px; font-weight: 400;  /* Standard text */
font-size: 11px; font-weight: 400;  /* Secondary text, card content */
font-size: 10px; font-weight: 400;  /* Small text, hints, metadata */

/* Labels */
font-size: 11px; font-weight: 500;  /* Input labels */
font-size: 11px; font-weight: 700;  /* Emphasized labels, titles */

/* Monospace */
font-family: monospace;
font-size: 10px;                    /* Code, hex values, technical data */
```

### Typography Patterns

#### Section Header
```tsx
<Text style={{ fontSize: '13px', fontWeight: '600' }}>
  Section Title
</Text>
```

#### Input Label
```tsx
<Text>Field Label</Text>  
/* Uses default @create-figma-plugin/ui styling */
```

#### Secondary Info
```tsx
<Text style={{ fontSize: '11px', color: 'var(--figma-color-text-secondary)' }}>
  Additional information or hint text
</Text>
```

#### Card Text
```tsx
<span style={{ 
  fontSize: '11px', 
  fontWeight: 400,
  color: 'var(--figma-color-text-secondary)' 
}}>
  Description or metadata
</span>
```

#### Metadata/Small Text
```tsx
<Text style={{ 
  fontSize: '10px', 
  color: 'var(--figma-color-text-tertiary)' 
}}>
  Plugin name or version
</Text>
```

---

## Components

### Buttons

#### Primary Button (from @create-figma-plugin/ui)
```tsx
<Button onClick={handleAction} disabled={loading}>
  Primary Action
</Button>
```

**Styling:**
- Height: `28px` (default from library)
- Padding: `0 16px`
- Border radius: `6px`
- Background: `var(--figma-color-bg-brand)` when enabled
- Color: White text
- Font size: `11px`, font-weight: `500`

**Disabled State:**
```css
background: var(--figma-color-bg-disabled);
color: var(--figma-color-text-disabled) !important;
cursor: not-allowed;
```

#### Secondary Button
```tsx
<Button onClick={handleAction} secondary>
  Secondary Action
</Button>
```

**Styling:**
- Same dimensions as primary
- Background: Transparent
- Border: `1px solid var(--figma-color-border)`
- Color: `var(--figma-color-text)`

#### Icon Button
```tsx
<button 
  onClick={handleClick}
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    border: '1px solid var(--figma-color-border)',
    borderRadius: '6px',
    background: 'transparent',
    cursor: 'pointer',
    color: 'var(--figma-color-text)'
  }}
>
  <svg width="16" height="16">...</svg>
</button>
```

### Input Fields

#### Textbox (from @create-figma-plugin/ui)
```tsx
<Textbox
  value={value}
  placeholder="Enter text..."
  disabled={!isReady}
  onValueInput={setValue}
/>
```

**Styling:**
- Height: `28px`
- Padding: `0 8px`
- Border: `1px solid var(--figma-color-border)`
- Border radius: `4px`
- Background: `var(--figma-color-bg)`
- Font size: `11px`

**States:**
- **Focus**: Border color brightens
- **Disabled**: Background becomes `var(--figma-color-bg-disabled)`, text is `var(--figma-color-text-disabled)`

#### Password Field
```tsx
<Textbox
  value={password}
  placeholder="Enter password"
  onValueInput={setPassword}
  password
/>
```

### Dropdown (from @create-figma-plugin/ui)
```tsx
<Dropdown
  value={selectedValue}
  options={[
    { value: 'option1', text: 'Option 1' },
    { value: 'option2', text: 'Option 2' }
  ]}
  placeholder="Select..."
  disabled={!isReady}
  onValueChange={handleChange}
/>
```

**Styling:**
- Height: `28px`
- Border: `1px solid var(--figma-color-border)`
- Border radius: `4px`
- Background: `var(--figma-color-bg)`
- Font size: `11px`

### Badges & Tags

#### Selected/Active Badge
```tsx
<div style={{ 
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '4px 8px', 
  backgroundColor: 'var(--figma-color-bg-brand)', 
  borderRadius: '4px',
  maxWidth: '100%'
}}>
  <span style={{ 
    fontSize: '11px', 
    fontWeight: '500',
    color: '#ffffff'
  }}>
    ✓ Selected Item
  </span>
  <div onClick={handleClear} style={{ cursor: 'pointer' }}>
    <svg width="10" height="10">
      <path d="M8 2L2 8M2 2L8 8" stroke="#ffffff" strokeWidth="1.5"/>
    </svg>
  </div>
</div>
```

#### Property Badge (Tertiary)
```tsx
<span style={{ 
  padding: '2px 6px',
  background: 'var(--figma-color-bg-tertiary)',
  borderRadius: '3px',
  color: 'var(--figma-color-text)',
  fontSize: '10px',
  fontWeight: 500
}}>
  Label
</span>
```

#### Value Badge (Brand Accent)
```tsx
<span style={{ 
  padding: '2px 6px',
  background: 'var(--figma-color-bg-brand-tertiary)',
  borderRadius: '3px',
  color: 'var(--figma-color-text-brand)',
  fontSize: '10px',
  fontWeight: 500,
  fontFamily: 'monospace'
}}>
  Value
</span>
```

### Cards

#### Standard Card
```tsx
<div style={{ 
  width: '100%',
  background: 'var(--figma-color-bg-secondary)',
  borderRadius: '4px',
  border: '1px solid var(--figma-color-border)',
  overflow: 'hidden'
}}>
  {/* Card header */}
  <div style={{ 
    height: '32px',
    padding: '0 8px',
    paddingRight: '4px',
    borderBottom: '1px solid var(--figma-color-border)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}>
    <span style={{ 
      color: 'var(--figma-color-text)', 
      fontSize: '11px', 
      fontWeight: 700 
    }}>
      Card Title
    </span>
    <Button secondary>Action</Button>
  </div>
  
  {/* Card content rows */}
  <div style={{ 
    minHeight: '32px',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  }}>
    {/* Content here */}
  </div>
</div>
```

#### Simple Card (No Header)
```tsx
<div style={{
  background: 'var(--figma-color-bg-secondary)',
  border: '1px solid var(--figma-color-border)',
  borderRadius: '4px',
  padding: '12px'
}}>
  {/* Card content */}
</div>
```

### Color Swatch
```tsx
<div style={{
  width: '16px',
  height: '16px',
  background: '#FF5733',
  borderRadius: '4px',
  border: '1px solid var(--figma-color-border)',
  flexShrink: 0
}} />
```

### Notification Panels

#### Success Panel
```tsx
<div style={{ 
  padding: '12px', 
  backgroundColor: 'var(--figma-color-bg-success)', 
  borderRadius: '6px',
  border: '1px solid var(--figma-color-border-success)'
}}>
  <Text style={{ 
    fontSize: '12px', 
    fontWeight: '600', 
    color: 'var(--figma-color-text-onsuccess)' 
  }}>
    ✓ Success message
  </Text>
</div>
```

#### Error Panel
```tsx
<div style={{ 
  padding: '12px', 
  backgroundColor: 'var(--figma-color-bg-danger)', 
  borderRadius: '6px' 
}}>
  <Text>Error message</Text>
</div>
```

#### Warning Panel
```tsx
<div style={{ 
  padding: '12px', 
  backgroundColor: 'var(--figma-color-bg-warning)', 
  borderRadius: '6px'
}}>
  <Text style={{ fontSize: '12px', fontWeight: '600' }}>
    ⚠ Warning message
  </Text>
</div>
```

#### Info Panel (Brand)
```tsx
<div style={{ 
  padding: '12px', 
  backgroundColor: 'var(--figma-color-bg-brand-tertiary)', 
  borderRadius: '6px', 
  border: '1px solid var(--figma-color-border-brand)' 
}}>
  <Text style={{ 
    fontSize: '11px', 
    fontWeight: '600', 
    color: 'var(--figma-color-text-brand)' 
  }}>
    Info message
  </Text>
</div>
```

### Toast Notification
```tsx
<div style={{
  position: 'fixed',
  bottom: '48px',
  left: '16px',
  right: '16px',
  padding: '10px 16px',
  backgroundColor: 'var(--figma-color-bg-success)',
  color: 'var(--figma-color-text-onsuccess)',
  borderRadius: '6px',
  fontSize: '12px',
  fontWeight: '500',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  zIndex: 1000
}}>
  <svg width="16" height="16">
    <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2"/>
  </svg>
  Action completed successfully
</div>
```

### Progress Bar
```tsx
<div style={{ 
  width: '100%', 
  height: '4px', 
  backgroundColor: 'var(--figma-color-bg-tertiary)',
  borderRadius: '2px',
  overflow: 'hidden'
}}>
  <div style={{ 
    width: '60%',  /* 0-100% based on progress */
    height: '100%', 
    backgroundColor: 'var(--figma-color-bg-brand)',
    borderRadius: '2px',
    transition: 'width 0.3s ease'
  }} />
</div>
```

### Custom Dropdown Menu
```tsx
<div style={{ 
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  zIndex: 100,
  maxHeight: '200px',
  overflow: 'overlay',
  border: '1px solid var(--figma-color-border)',
  borderRadius: '4px',
  backgroundColor: 'var(--figma-color-bg)',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  marginTop: '4px'
}}>
  {/* Dropdown header */}
  <div style={{ 
    fontSize: '10px', 
    color: 'var(--figma-color-text-secondary)', 
    padding: '8px',
    borderBottom: '1px solid var(--figma-color-border)',
    lineHeight: '14px'
  }}>
    5 results
  </div>
  
  {/* Dropdown items */}
  <div
    onClick={handleSelect}
    style={{ 
      padding: '8px', 
      cursor: 'pointer',
      backgroundColor: 'transparent',
      borderBottom: '1px solid var(--figma-color-border)',
      transition: 'background-color 0.1s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = 'var(--figma-color-bg-hover)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = 'transparent';
    }}
  >
    <div style={{ 
      fontSize: '11px', 
      fontWeight: 400,
      wordBreak: 'break-all', 
      lineHeight: '16px', 
      color: 'var(--figma-color-text)' 
    }}>
      Menu item text
    </div>
  </div>
</div>
```

---

## Scrollbar Implementation

### Overview
Custom overlay scrollbars should **NOT cause layout shift**. They appear on hover and overlay the content rather than taking up space in the layout.

**Key Behavior:**
- **Visible on scroll**: The scrollbar appears when hovering over the container OR when actively scrolling
- **Visible when dragging**: Remains visible during drag operations via the `.dragging` class
- **Auto-hide**: Fades out when not needed (controlled by `opacity: 0` default state)
- **No layout shift**: Uses `position: absolute` to overlay content instead of pushing it

**Implementation Requirements:**
- Uses `useCustomScrollbar` hook to manage visibility state and thumb positioning
- Listens to scroll events via `addEventListener('scroll')` on the content element
- Updates thumb position in real-time as user scrolls
- Uses `ResizeObserver` to recalculate when content size changes

### CSS Implementation

```css
/* Container setup */
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
```

### React Hook Implementation

**Hook Purpose:** This hook manages the custom scrollbar's visibility, positioning, and interactions.

**Connected State:**
- `showScrollbar` - Determines if scrollbar should render (true when content height > container height)
- `thumbHeight` - Calculated scrollbar thumb height based on content ratio
- `thumbTop` - Calculated thumb position based on scroll position
- `isDragging` - Tracks active drag state to keep scrollbar visible

**Connected Handlers:**
- `updateScrollbar()` - Recalculates thumb size/position on scroll or resize events
- `handleScroll` - Listens to scroll events and updates thumb position in real-time
- `ResizeObserver` - Detects content size changes and triggers recalculation

```typescript
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

  // Handle scroll events - CRITICAL: This makes scrollbar visible during scroll
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    // Update scrollbar position whenever user scrolls
    const handleScroll = () => updateScrollbar();
    content.addEventListener('scroll', handleScroll);
    
    // Initial calculation on mount
    updateScrollbar();
    
    // Recalculate on content size changes (dynamic content loading)
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

### Usage in Component

```tsx
function MyPlugin() {
  const mainScrollRef = useRef<HTMLDivElement>(null);
  const customScrollbar = useCustomScrollbar(mainScrollRef);

  return (
    <div className="custom-scroll-container" style={{ flex: 1, position: 'relative' }}>
      <div 
        ref={mainScrollRef}
        className="custom-scroll-content"
        style={{ paddingBottom: '36px' }}
      >
        {/* Your scrollable content */}
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
  );
}
```

### Fallback Scrollbar (for small elements)

For dropdowns, modals, and small scrollable areas where a custom scrollbar is overkill:

```css
/* Default scrollbar styling for elements that don't use custom scrollbar */
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
```

### Critical Notes
1. **No Layout Shift**: The scrollbar is `position: absolute` and overlays content
2. **Visible on Scroll**: The `handleScroll` event listener updates `thumbTop` in real-time, making scrollbar visible during scroll via CSS hover and dragging states
3. **Show on Hover**: CSS rule `.custom-scroll-container:hover .custom-scrollbar-track` shows scrollbar when hovering container
4. **Stay Visible When Dragging**: `.custom-scrollbar-track.dragging` keeps scrollbar visible during drag operations
5. **Smooth Dragging**: Calculates scroll position based on thumb drag distance
6. **Minimum Thumb Size**: `min-height: 30px` ensures usability
7. **ResizeObserver**: Updates scrollbar when content size changes dynamically (e.g., loading more items)

**Hook Dependencies:**
- `showScrollbar` state controls conditional rendering of scrollbar UI
- `isDragging` state applies `.dragging` class to maintain visibility
- `scroll` event listener on content element triggers real-time position updates
- `updateScrollbar()` callback recalculates all dimensions on scroll/resize

---

## Layout Structure

### Plugin Container Pattern
```tsx
<div style={{ 
  display: 'flex', 
  flexDirection: 'column', 
  height: '100vh',
  overflow: 'hidden'
}}>
  {/* Scrollable content area */}
  <div className="custom-scroll-container" style={{ flex: 1, position: 'relative' }}>
    <div ref={mainScrollRef} className="custom-scroll-content" style={{ paddingBottom: '36px' }}>
      <Container space="medium">
        <Stack space="medium">
          {/* Main content */}
        </Stack>
      </Container>
    </div>
    {/* Custom scrollbar */}
  </div>

  {/* Fixed footer (optional) */}
  <div style={{
    position: 'relative',
    height: '36px',
    flexShrink: 0,
    background: 'var(--figma-color-bg)',
    borderTop: '1px solid var(--figma-color-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 12px',
    zIndex: 9999
  }}>
    {/* Footer content */}
  </div>
</div>
```

### Section Pattern
```tsx
<Stack space="small">
  <Text>Field Label</Text>
  {/* Input or content */}
  <Textbox value={value} onValueInput={setValue} />
  {/* Optional hint */}
  <Text style={{ fontSize: '11px', color: 'var(--figma-color-text-secondary)' }}>
    Helpful hint or description
  </Text>
</Stack>
```

### Input Element Spacing

This section covers all spacing patterns for input fields, buttons, and form elements.

#### Spacing Scale Reference

```typescript
extraSmall: 4px    // Very tight spacing (minimal gaps)
small: 8px         // Within a form field group (label → input → hint)
medium: 16px       // Between different sections/field groups
large: 24px        // Between major content areas
extraLarge: 32px   // Large separations
```

#### 1. Vertical Spacing (Between Sections)

**Between Input Field Groups:**
Use `<Stack space="medium">` (16px) to separate different input groups:

```tsx
<Stack space="medium">
  {/* Input Group 1 */}
  <Stack space="small">
    <Text>Branch</Text>
    <Textbox value={branch} onValueInput={setBranch} />
  </Stack>
  
  {/* Input Group 2 */}
  <Stack space="small">
    <Text>Find Token</Text>
    <Textbox value={token} onValueInput={setToken} />
  </Stack>
</Stack>
```

**Within Input Groups:**
Use `<Stack space="small">` (8px) for label + input + hint combinations:

```tsx
<Stack space="small">
  <Text>Field Label</Text>
  <Textbox value={value} onValueInput={setValue} />
  <Text style={{ 
    fontSize: '11px', 
    color: 'var(--figma-color-text-secondary)' 
  }}>
    Helpful hint text
  </Text>
</Stack>
```

#### 2. Horizontal Spacing (Input + Button on Same Row)

**Critical Pattern:** Use flexbox with `gap` property for input/button combinations:

```tsx
<Stack space="small">
  <Text>Branch</Text>
  <div style={{ 
    display: 'flex',
    gap: '8px',                    // 8px gap between input and button
    alignItems: 'stretch',         // Makes button same height as input (28px)
    flexWrap: 'wrap'               // Allows wrapping on small screens
  }}>
    <div style={{ flex: '1 1 auto', minWidth: '150px' }}>
      <Dropdown 
        value={selectedBranch}
        options={branches}
        onValueChange={setBranch}
      />
    </div>
    <Button onClick={handleScan} style={{ flexShrink: 0 }}>
      Scan
    </Button>
  </div>
</Stack>
```

**Key Points:**
- Use `gap: '8px'` for horizontal spacing between input and button
- `alignItems: 'stretch'` ensures button matches input height (28px)
- Wrap input in a flex container with `flex: '1 1 auto'` to fill available space
- Add `flexShrink: 0` to button to prevent it from shrinking
- Add `minWidth` to input container to prevent it from becoming too narrow

#### 3. Multiple Buttons in a Row

```tsx
<div style={{ 
  display: 'flex',
  gap: '8px',                      // 8px between buttons
  alignItems: 'center' 
}}>
  <Button onClick={handleSave}>Save</Button>
  <Button onClick={handleCancel} secondary>Cancel</Button>
</div>
```

#### 4. Inline Elements (Badges, Tags)

For smaller inline elements, use slightly tighter spacing:

```tsx
<div style={{ 
  display: 'flex',
  alignItems: 'center',
  gap: '6px'                       // 6px for smaller inline elements
}}>
  <span style={{ 
    padding: '2px 6px',
    background: 'var(--figma-color-bg-tertiary)',
    borderRadius: '3px',
    fontSize: '10px'
  }}>
    Badge 1
  </span>
  <span style={{ 
    padding: '2px 6px',
    background: 'var(--figma-color-bg-tertiary)',
    borderRadius: '3px',
    fontSize: '10px'
  }}>
    Badge 2
  </span>
</div>
```

#### 5. Between Related Inputs (Same Row)

Use `<Inline space="small">` (8px) for horizontal spacing between related inputs:

```tsx
<Stack space="small">
  <Text>Dimensions</Text>
  <Inline space="small">
    <Textbox value={width} onValueInput={setWidth} placeholder="Width" />
    <Textbox value={height} onValueInput={setHeight} placeholder="Height" />
  </Inline>
</Stack>
```

#### Common Patterns Reference

| Scenario | Method | Value | Example |
|----------|--------|-------|---------|
| Between sections | `<Stack space="medium">` | 16px | Major content blocks |
| Between field groups | `<Stack space="small">` | 8px | Label → Input → Hint |
| Input + Button (horizontal) | `gap: '8px'` | 8px | Dropdown with action button |
| Between buttons | `gap: '8px'` | 8px | Save/Cancel button pair |
| Between badges/tags | `gap: '6px'` | 6px | Small inline elements |
| Dropdown menu spacing | `marginTop: '4px'` | 4px | Dropdown below input |
| Card internal padding | `padding: '8px'` or `'12px'` | 8-12px | Inside cards |

#### Complete Pattern Examples

**Pattern 1: Simple Input Field**
```tsx
<Stack space="small">              {/* 8px vertical spacing */}
  <Text>Label</Text>
  <Textbox value={value} onValueInput={setValue} />
</Stack>
```

**Pattern 2: Input with Adjacent Button**
```tsx
<Stack space="small">
  <Text>Label</Text>
  <div style={{ display: 'flex', gap: '8px', alignItems: 'stretch' }}>
    <div style={{ flex: '1 1 auto' }}>
      <Textbox value={value} onValueInput={setValue} />
    </div>
    <Button onClick={handleAction}>Go</Button>
  </div>
</Stack>
```

**Pattern 3: Input with Hint**
```tsx
<Stack space="small">
  <Text>Label</Text>
  <Textbox value={value} onValueInput={setValue} />
  <Text style={{ 
    fontSize: '11px', 
    color: 'var(--figma-color-text-secondary)' 
  }}>
    This is a helpful hint
  </Text>
</Stack>
```

**Pattern 4: Multiple Sections**
```tsx
<Stack space="medium">            {/* 16px between sections */}
  <Stack space="small">           {/* First section - 8px internal */}
    <Text>Field 1</Text>
    <Textbox value={field1} onValueInput={setField1} />
  </Stack>
  
  <Stack space="small">           {/* Second section - 8px internal */}
    <Text>Field 2</Text>
    <Dropdown 
      value={field2} 
      options={options}
      onValueChange={setField2}
    />
  </Stack>
</Stack>
```

**Pattern 5: Input with Action Button and Hint**
```tsx
<Stack space="small">
  <Text>API Endpoint</Text>
  <div style={{ display: 'flex', gap: '8px', alignItems: 'stretch' }}>
    <div style={{ flex: '1 1 auto' }}>
      <Textbox value={endpoint} onValueInput={setEndpoint} />
    </div>
    <Button onClick={handleTest}>Test</Button>
  </div>
  <Text style={{ 
    fontSize: '11px', 
    color: 'var(--figma-color-text-secondary)' 
  }}>
    Enter your API endpoint URL
  </Text>
</Stack>
```

#### Why These Values?

- **8px (small)**: Figma's standard spacing unit for tight relationships (label to input, buttons in a row)
- **16px (medium)**: Double the base unit for clear section separation
- **6px**: Slightly tighter for very small inline elements (badges, tags)
- **4px (extraSmall)**: Minimal spacing for very closely related items (dropdown gaps)

**Best Practices:**
- **16px (`medium`)** between distinct input groups/sections
- **8px (`small`)** between label and input, or related inputs in a row
- **6px** for small inline elements like badges
- **4px (`extraSmall`)** for very tightly related elements (rare)
- Always use `Stack` or `Inline` components for vertical/horizontal spacing
- Never use manual padding/margin values
- Use flexbox with `gap` for horizontal input/button combinations

### Spacing Scale (from @create-figma-plugin/ui)
- `extraSmall`: `4px`
- `small`: `8px`
- `medium`: `16px`
- `large`: `24px`
- `extraLarge`: `32px`

Use `<Stack space="medium">` for vertical spacing between sections.

---

### Stack Component - Critical Usage Notes

#### ⚠️ Fragment Limitation

**DO NOT** wrap multiple Stack children in a `<Fragment>`.

The Stack component uses `toChildArray(children).map()` to wrap each child in a spacing div. When you use `<Fragment>`, the entire Fragment becomes a single child, and all elements inside lose their spacing.

```tsx
// ❌ WRONG - Fragment breaks spacing
<Stack space="medium">
  <Text>Header</Text>
  {condition && (
    <Fragment>
      <Stack space="small">...</Stack>
      <Stack space="small">...</Stack>  {/* No spacing between these! */}
    </Fragment>
  )}
</Stack>

// ✅ CORRECT - Each conditional rendered separately
<Stack space="medium">
  <Text>Header</Text>
  {condition && (
    <Stack space="small">...</Stack>
  )}
  {condition && (
    <Stack space="small">...</Stack>
  )}
</Stack>

// ✅ ALSO CORRECT - Use an array
<Stack space="medium">
  <Text>Header</Text>
  {condition && [
    <Stack key="section1" space="small">...</Stack>,
    <Stack key="section2" space="small">...</Stack>
  ]}
</Stack>
```

**Why This Happens:**
- Stack applies spacing by wrapping each direct child
- Fragment is transparent to React but Stack sees it as a single child
- All Fragment contents get wrapped together, losing internal spacing

#### 🎨 Tailwind CSS v4 Compatibility

When using Tailwind CSS v4 alongside `@create-figma-plugin/ui`:

**Import only utilities, not the full framework:**

```css
/* ❌ WRONG - Preflight reset conflicts with library */
@import "tailwindcss";

/* ✅ CORRECT - Utilities only, no preflight */
@import "tailwindcss/utilities";
```

**Why:** Tailwind's preflight includes `* { margin: 0 }` which can override the Stack component's `margin-top` spacing in some cascade scenarios.

#### Spacing Values Reference

The actual CSS variable values used by Stack:

| Prop Value | CSS Variable | Pixels |
|------------|--------------|--------|
| `extraSmall` | `--space-extra-small` | 8px |
| `small` | `--space-small` | 12px |
| `medium` | `--space-medium` | 16px |
| `large` | `--space-large` | 20px |
| `extraLarge` | `--space-extra-large` | 24px |

**Note:** These CSS variable values may differ from the documentation's simplified spacing scale. Always test spacing visually to ensure correct rendering.

---

### Typical Window Dimensions
- **Default Width**: `400px`
- **Default Height**: `500-600px`
- **Minimum Width**: `300px`
- **Minimum Height**: `400px`

---

## States & Interactions

### Loading States

#### Button Loading
```tsx
<Button disabled={loading}>
  {loading ? 'Processing...' : 'Submit'}
</Button>
```

#### Progress with Message
```tsx
{loading && (
  <Text style={{ 
    fontSize: '10px', 
    color: 'var(--figma-color-text-secondary)',
    textAlign: 'center'
  }}>
    {loadingMessage}
  </Text>
)}
```

### Disabled States

All interactive elements should show disabled state:
```tsx
<Button disabled={!isReady}>
  Action
</Button>

<Textbox 
  disabled={!isReady} 
  placeholder="Not available"
/>

<Dropdown 
  disabled={loading}
  options={options}
/>
```

**Visual characteristics:**
- Background: `var(--figma-color-bg-disabled)`
- Text: `var(--figma-color-text-disabled)`
- Cursor: `not-allowed`
- Opacity may be reduced

**Important CSS Fix for Buttons:**
```css
/* Ensure disabled button text is visible in all themes */
button[disabled] {
  color: var(--figma-color-text-disabled) !important;
}
```

### Hover States

#### Button Hover
```tsx
/* Handled by @create-figma-plugin/ui automatically */
```

#### Custom Element Hover
```tsx
<div
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = 'var(--figma-color-bg-hover)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = 'transparent';
  }}
  style={{ 
    cursor: 'pointer',
    transition: 'background-color 0.1s ease'
  }}
>
  Hoverable item
</div>
```

### Focus States
Input fields automatically show focus state with brightened borders (handled by @create-figma-plugin/ui).

### Selected States

#### Selected Item
```tsx
<div style={{ 
  backgroundColor: 'var(--figma-color-bg-brand)', 
  color: '#ffffff'
}}>
  ✓ Selected
</div>
```

### Transition Guidelines
```css
transition: background-color 0.1s ease;  /* Hover transitions */
transition: opacity 0.2s ease;           /* Show/hide transitions */
transition: width 0.3s ease;             /* Progress bar */
```

---

## Icon Guidelines

### Icon Sizes
- **Small icons**: `10-12px` (in badges, inline)
- **Standard icons**: `14-16px` (buttons, headers)
- **Large icons**: `20-24px` (empty states, banners)

### Icon Style
- **Stroke width**: `1.25-1.5px` for standard icons, `2px` for checkmarks
- **Stroke linecap**: `round` for friendly appearance
- **Color**: Use `currentColor` to inherit text color

```tsx
<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
  <path d="..." stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
</svg>
```

### Common Icons

#### Settings Gear
```tsx
<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="1.25"/>
  <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
```

#### Close X
```tsx
<svg width="14" height="14" viewBox="0 0 16 16" fill="none">
  <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
</svg>
```

#### Info Circle
```tsx
<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.25"/>
  <path d="M7 6V10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
  <circle cx="7" cy="4" r="0.75" fill="currentColor"/>
</svg>
```

#### Checkmark
```tsx
<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
```

#### Chevron Down
```tsx
<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
```

---

## Border Radius Scale

```css
/* Components */
border-radius: 4px;  /* Cards, inputs, badges, color swatches */
border-radius: 6px;  /* Buttons, panels, notifications */

/* Small elements */
border-radius: 2px;  /* Progress bars */
border-radius: 3px;  /* Small badges, scrollbar thumb */
```

---

## Shadow Guidelines

### Dropdowns & Menus
```css
box-shadow: 0 4px 12px rgba(0,0,0,0.15);
```

### Toasts
```css
box-shadow: 0 4px 12px rgba(0,0,0,0.15);
```

### Modals (if used)
```css
box-shadow: 0 8px 24px rgba(0,0,0,0.2);
```

**Note:** Use shadows sparingly—only for floating elements like dropdowns, toasts, and modals.

---

## Accessibility

1. **Color Contrast**: All text must meet WCAG AA standards against backgrounds
2. **Focus Indicators**: Inputs show clear focus state
3. **Disabled States**: Clearly indicate when elements are not interactive
4. **Loading States**: Show loading feedback for all async operations
5. **Error Messages**: Display errors prominently with context
6. **Keyboard Navigation**: Support Tab, Enter, Escape keys where applicable

---

## Theme Support

**Critical**: ALL colors must use Figma CSS variables. Never use hardcoded colors except:
- White text on brand backgrounds: `#ffffff`
- Pure transparency: `transparent`
- Specific color swatches when displaying actual color values

This ensures the plugin works correctly in both light and dark modes automatically.

---

## Quick Reference: Common Patterns

### Standard Input Section
```tsx
<Stack space="small">
  <Text>Field Label</Text>
  <Textbox value={value} placeholder="Enter value..." onValueInput={setValue} />
</Stack>
```

### Input with Button
```tsx
<Stack space="small">
  <Text>Field Label</Text>
  <div style={{ display: 'flex', gap: '8px', alignItems: 'stretch' }}>
    <div style={{ flex: '1 1 auto' }}>
      <Textbox value={value} onValueInput={setValue} />
    </div>
    <Button onClick={handleAction}>Go</Button>
  </div>
</Stack>
```

### Card List
```tsx
<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
  {items.map(item => (
    <div key={item.id} style={{ 
      background: 'var(--figma-color-bg-secondary)',
      border: '1px solid var(--figma-color-border)',
      borderRadius: '4px',
      padding: '12px'
    }}>
      {/* Card content */}
    </div>
  ))}
</div>
```

### Section Header with Action
```tsx
<div style={{ 
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center' 
}}>
  <Text style={{ fontSize: '13px', fontWeight: '600' }}>
    Section Title
  </Text>
  <button style={{ /* icon button styles */ }}>
    <svg>...</svg>
  </button>
</div>
```

### Empty State
```tsx
<div style={{ 
  padding: '32px 16px', 
  textAlign: 'center' 
}}>
  <svg width="48" height="48" style={{ marginBottom: '12px', opacity: 0.3 }}>
    {/* Empty state icon */}
  </svg>
  <Text style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '4px' }}>
    No items found
  </Text>
  <Text style={{ fontSize: '11px', color: 'var(--figma-color-text-secondary)' }}>
    Try adjusting your filters
  </Text>
</div>
```

---

## Implementation Checklist

When implementing a new UI component, ensure:

- [ ] Uses Figma color variables (`var(--figma-color-*)`)
- [ ] Follows typography scale (10-13px sizes)
- [ ] Has proper hover states (0.1s transition)
- [ ] Shows disabled state when applicable
- [ ] Uses correct border radius (4px or 6px)
- [ ] Has appropriate spacing (Stack with small/medium)
- [ ] Icons use `currentColor` and correct stroke width
- [ ] No hardcoded colors (except #ffffff on brand)
- [ ] Responsive to plugin window resize
- [ ] No layout shift from scrollbars
- [ ] Works in both light and dark mode

---

## Dependencies

### Required Packages

**⚠️ CRITICAL VERSION REQUIREMENTS:**

You MUST use the upgraded v4.0.3 versions of the @create-figma-plugin packages. Earlier versions have compatibility issues and missing features.

```json
{
  "@create-figma-plugin/ui": "^4.0.3",           /* REQUIRED v4.0.3+ */
  "@create-figma-plugin/utilities": "^4.0.3",    /* REQUIRED v4.0.3+ */
  "preact": ">=10"
}
```

**Why v4.0.3 is Required:**
- Proper theme color support (`themeColors: true`)
- Updated component styling that matches Figma's latest design system
- Bug fixes for disabled states and color contrast
- Improved TypeScript definitions

### Optional (for Tailwind CSS support)
```json
{
  "@tailwindcss/cli": ">=4",
  "tailwindcss": ">=4"
}
```

### Import UI Components
```typescript
import { 
  render, 
  Button, 
  Textbox, 
  Dropdown, 
  IconButton, 
  Text, 
  Stack, 
  Container, 
  Inline, 
  VerticalSpace, 
  Muted 
} from '@create-figma-plugin/ui';
```

---

## Final Notes

This design system is based on **Figma's native plugin UI patterns**. When in doubt:

1. Use `@create-figma-plugin/ui` components as the foundation
2. Always use Figma color variables for automatic theming
3. Keep interfaces simple and minimal
4. Test in both light and dark modes
5. Ensure scrollbars don't cause layout shift
6. Follow the spacing scale consistently
7. Use shadows sparingly (only for floating elements)

**The goal**: Make plugins feel like they're a built-in part of Figma, not third-party extensions.

---

## Additional Resources

- [@create-figma-plugin Documentation](https://github.com/yuanqing/create-figma-plugin)
- [Figma Plugin API](https://www.figma.com/plugin-docs/)
- [Figma Design Guidelines](https://www.figma.com/design/)
