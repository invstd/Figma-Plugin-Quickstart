# Figma Plugin Design Principles

**Essential design guidelines for AI to build plugins that match Figma's interface**

---

## 🎯 Core Principles

When building Figma plugin UIs, you MUST follow Figma's design system to ensure:
- Visual consistency with the Figma interface
- Proper contrast in both light and dark modes
- Accessibility compliance
- Professional appearance

---

## 🚨 Critical Rules (Never Break These!)

### 0. Enable Theme Colors in showUI (MANDATORY!)

**⚠️ CRITICAL:** You MUST enable theme colors when showing the UI, or none of the CSS variables will work!

```typescript
import { showUI } from '@create-figma-plugin/utilities';

export default function () {
  // ✅ CORRECT - enables Figma design tokens
  showUI({ width: 400, height: 500 }, { themeColors: true });
  
  // ❌ WRONG - CSS variables won't work!
  showUI({ width: 400, height: 500 });
}
```

Without `{ themeColors: true }`, all `var(--figma-color-*)` variables will be undefined and your plugin will look broken!

---

### 1. ALWAYS Use Figma Design Tokens for Colors

**❌ NEVER do this:**
```typescript
// Wrong - hardcoded colors break in dark mode and look unprofessional
style={{ 
  color: '#333',
  backgroundColor: '#f5f5f5',
  border: '1px solid #ddd'
}}
```

**✅ ALWAYS do this:**
```typescript
// Correct - uses Figma's design tokens that adapt to light/dark mode
style={{ 
  color: 'var(--figma-color-text)',
  backgroundColor: 'var(--figma-color-bg-secondary)',
  border: '1px solid var(--figma-color-border)'
}}
```

**⚠️ CRITICAL: Use Correct Text Colors on Semantic Backgrounds**

When using colored backgrounds (success, warning, danger, brand), you MUST use the matching "on" text color for proper contrast:

```typescript
// ✅ CORRECT - proper color pairing
<div style={{ 
  backgroundColor: 'var(--figma-color-bg-success)',
  color: 'var(--figma-color-text-onsuccess)'  // Matches success background
}}>Success message</div>

<div style={{ 
  backgroundColor: 'var(--figma-color-bg-warning)',
  color: 'var(--figma-color-text-onwarning)'  // Matches warning background
}}>Warning message</div>

<div style={{ 
  backgroundColor: 'var(--figma-color-bg-danger)',
  color: 'var(--figma-color-text-ondanger)'  // Matches danger background
}}>Error message</div>

<div style={{ 
  backgroundColor: 'var(--figma-color-bg-brand)',
  color: 'var(--figma-color-text-onbrand)'  // Matches brand background
}}>Brand element</div>

// ❌ WRONG - broken contrast!
<div style={{ 
  backgroundColor: 'var(--figma-color-bg-success)',
  color: 'var(--figma-color-text)'  // Wrong! Low contrast
}}>
```

### 2. Use @create-figma-plugin Spacing System

**❌ NEVER do this:**
```typescript
// Wrong - arbitrary spacing values
<div style={{ padding: '12px', marginBottom: '8px' }}>
```

**✅ ALWAYS do this:**
```typescript
// Correct - uses the framework's spacing system
import { Container, VerticalSpace, Stack } from '@create-figma-plugin/ui';

<Container space="medium">
  <Stack space="small">
    {/* Content */}
  </Stack>
</Container>
```

**Spacing values:**
- `extraSmall` - 4px
- `small` - 8px  
- `medium` - 16px
- `large` - 24px
- `extraLarge` - 32px

### 3. Proper Typography and Line Heights

**❌ NEVER do this:**
```typescript
// Wrong - inconsistent typography
<div style={{ fontSize: '14px', fontWeight: 'bold' }}>
```

**✅ ALWAYS do this:**
```typescript
// Correct - uses Figma's typography system
import { Text } from '@create-figma-plugin/ui';

<Text style={{ 
  fontSize: '13px',      // Figma's standard UI font size
  fontWeight: '600',     // Semibold for headers
  lineHeight: '16px'     // Proper line height
}}>
  Header Text
</Text>

<Text style={{ 
  fontSize: '11px',      // Standard body text
  lineHeight: '16px'     // Maintains vertical rhythm
}}>
  Body text
</Text>
```

---

## 📐 Complete Design Token Reference

### Text Colors (ALWAYS use these!)

```typescript
// Primary text - use for main content
color: 'var(--figma-color-text)'

// Secondary text - use for labels, descriptions
color: 'var(--figma-color-text-secondary)'

// Tertiary text - use for subtle information
color: 'var(--figma-color-text-tertiary)'

// Disabled text - use for disabled states
color: 'var(--figma-color-text-disabled)'

// Brand/accent text - use sparingly for emphasis
color: 'var(--figma-color-text-brand)'

// On-brand text - MUST use with --figma-color-bg-brand background
color: 'var(--figma-color-text-onbrand)'

// On-component text - use for text on colored backgrounds
color: 'var(--figma-color-text-oncomponent)'

// On-success text - MUST use with --figma-color-bg-success background
color: 'var(--figma-color-text-onsuccess)'

// On-warning text - MUST use with --figma-color-bg-warning background
color: 'var(--figma-color-text-onwarning)'

// On-danger text - MUST use with --figma-color-bg-danger background
color: 'var(--figma-color-text-ondanger)'
```

**⚠️ CRITICAL COLOR PAIRING RULES:**

Always use matching "on" colors with semantic backgrounds:
- `--figma-color-bg-success` → `--figma-color-text-onsuccess`
- `--figma-color-bg-warning` → `--figma-color-text-onwarning`
- `--figma-color-bg-danger` → `--figma-color-text-ondanger`
- `--figma-color-bg-brand` → `--figma-color-text-onbrand`

### Background Colors (ALWAYS use these!)

```typescript
// Primary background - main UI background
backgroundColor: 'var(--figma-color-bg)'

// Secondary background - cards, containers
backgroundColor: 'var(--figma-color-bg-secondary)'

// Tertiary background - nested containers
backgroundColor: 'var(--figma-color-bg-tertiary)'

// Hover states - interactive elements on hover
backgroundColor: 'var(--figma-color-bg-hover)'

// Brand/accent - primary actions, emphasis
backgroundColor: 'var(--figma-color-bg-brand)'

// Brand secondary - secondary brand elements
backgroundColor: 'var(--figma-color-bg-brand-secondary)'

// Brand tertiary - subtle brand touches
backgroundColor: 'var(--figma-color-bg-brand-tertiary)'

// Success states - confirmations, success messages
backgroundColor: 'var(--figma-color-bg-success)'

// Warning states - warnings, caution messages
backgroundColor: 'var(--figma-color-bg-warning)'

// Danger/error states - errors, destructive actions
backgroundColor: 'var(--figma-color-bg-danger)'
```

### Border Colors (ALWAYS use these!)

```typescript
// Standard borders - dividers, outlines
borderColor: 'var(--figma-color-border)'

// Strong borders - emphasized boundaries
borderColor: 'var(--figma-color-border-strong)'

// Brand borders - accent borders
borderColor: 'var(--figma-color-border-brand)'

// Disabled borders - disabled inputs
borderColor: 'var(--figma-color-border-disabled)'
```

---

## 📏 Layout Best Practices

### Container Structure

**✅ Correct full-height layout:**
```typescript
function Plugin() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: 'var(--figma-color-bg)'  // ALWAYS set background
    }}>
      {/* Scrollable content */}
      <div className="custom-scroll-container" style={{ flex: 1, position: 'relative' }}>
        <div className="custom-scroll-content" style={{ paddingBottom: '16px' }}>
          <Container space="medium">
            <Stack space="medium">
              {/* Content here */}
            </Stack>
          </Container>
        </div>
      </div>
      
      {/* Fixed footer if needed */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid var(--figma-color-border)',
        backgroundColor: 'var(--figma-color-bg)'
      }}>
        <Button fullWidth>Action</Button>
      </div>
    </div>
  );
}
```

### Proper Spacing Patterns

**✅ Correct spacing hierarchy:**
```typescript
<Container space="medium">  {/* 16px padding around everything */}
  <Stack space="medium">    {/* 16px between major sections */}
    
    {/* Section 1 */}
    <Stack space="small">   {/* 8px between related items */}
      <Text style={{ fontSize: '13px', fontWeight: '600' }}>
        Section Title
      </Text>
      <Text style={{ 
        fontSize: '11px', 
        color: 'var(--figma-color-text-secondary)' 
      }}>
        Description text
      </Text>
    </Stack>
    
    <VerticalSpace space="small" />  {/* Explicit spacing */
    
    {/* Section 2 */}
    <Stack space="small">
      {/* Content */}
    </Stack>
    
  </Stack>
</Container>
```

---

## 🎨 Typography Standards

### Font Sizes (stick to these!)

```typescript
// Large headers (rare, use sparingly)
fontSize: '16px', lineHeight: '24px'

// Section headers
fontSize: '13px', lineHeight: '16px', fontWeight: '600'

// Standard body text (DEFAULT)
fontSize: '11px', lineHeight: '16px', fontWeight: '400'

// Small text (captions, metadata)
fontSize: '10px', lineHeight: '16px'
```

### Font Weights

```typescript
fontWeight: '400'  // Regular (default for body text)
fontWeight: '500'  // Medium (subtle emphasis)
fontWeight: '600'  // Semibold (headers, strong emphasis)
```

**❌ Never use:**
- `font-family` - Figma provides the correct font automatically
- Font sizes outside the standard scale (11px, 12px, 13px)
- Line heights other than 16px or 20px
- Custom line-height values without corresponding font size

**✅ Always:**
- Specify both `fontSize` and `lineHeight` together
- Use the exact pairings from the table above
- Default to 11px/16px for body text

---

## 🔘 Component Best Practices

### Buttons

**✅ Use framework components:**
```typescript
import { Button } from '@create-figma-plugin/ui';

// Primary action
<Button onClick={handleAction}>
  Primary Action
</Button>

// Secondary action
<Button onClick={handleAction} secondary>
  Secondary Action
</Button>

// Full width in containers
<Button onClick={handleAction} fullWidth>
  Full Width
</Button>

// Disabled state
<Button onClick={handleAction} disabled>
  Disabled
</Button>
```

### Input Fields

**✅ Use framework components:**
```typescript
import { Textbox } from '@create-figma-plugin/ui';

<Stack space="small">
  <Text style={{ fontSize: '11px', fontWeight: '500' }}>
    Label
  </Text>
  <Textbox
    value={value}
    placeholder="Enter text..."
    onValueInput={setValue}
  />
</Stack>
```

### Lists and Cards

**✅ Proper list items:**
```typescript
<div style={{
  padding: '8px 12px',
  backgroundColor: 'var(--figma-color-bg-secondary)',
  borderRadius: '6px',
  border: '1px solid var(--figma-color-border)',
  cursor: 'pointer',
  transition: 'background-color 0.15s ease'
}}
onMouseEnter={(e) => {
  e.currentTarget.style.backgroundColor = 'var(--figma-color-bg-hover)';
}}
onMouseLeave={(e) => {
  e.currentTarget.style.backgroundColor = 'var(--figma-color-bg-secondary)';
}}>
  <Text style={{ fontSize: '11px' }}>List Item</Text>
</div>
```

---

## ⚠️ Common Mistakes to Avoid

### 1. Bottom Spacing Issues

**❌ Wrong:**
```typescript
// Content touches bottom of window
<div className="custom-scroll-content">
  <Container space="medium">
    {/* Content */}
  </Container>
</div>
```

**✅ Correct:**
```typescript
// Proper padding at bottom
<div className="custom-scroll-content" style={{ paddingBottom: '16px' }}>
  <Container space="medium">
    {/* Content */}
  </Container>
</div>
```

### 2. Missing Line Heights

**❌ Wrong:**
```typescript
<Text style={{ fontSize: '11px' }}>
  Text without line height
</Text>
```

**✅ Correct:**
```typescript
<Text style={{ 
  fontSize: '11px', 
  lineHeight: '16px'  // Always specify matching line height
}}>
  Text with proper line height
</Text>

// Section header with correct pairing
<Text style={{ 
  fontSize: '13px', 
  lineHeight: '20px'  // 13px uses 20px line height, not 16px!
}}>
  Section Header
</Text>
```

### 3. Contrast Issues

**❌ Wrong:**
```typescript
// Low contrast - hard to read
<div style={{ 
  backgroundColor: '#f0f0f0',
  color: '#999'
}}>

// Wrong color pairing - broken contrast
<div style={{ 
  backgroundColor: 'var(--figma-color-bg-success)',
  color: 'var(--figma-color-text)'  // Wrong! Use text-onsuccess
}}>
```

**✅ Correct:**
```typescript
// High contrast using design tokens
<div style={{ 
  backgroundColor: 'var(--figma-color-bg-secondary)',
  color: 'var(--figma-color-text)'
}}>

// Correct color pairing for semantic backgrounds
<div style={{ 
  backgroundColor: 'var(--figma-color-bg-success)',
  color: 'var(--figma-color-text-onsuccess)'  // Correct!
}}>
```

### 4. Inconsistent Border Radius

**❌ Wrong:**
```typescript
borderRadius: '4px'  // Non-standard
borderRadius: '12px' // Too large
```

**✅ Correct:**
```typescript
borderRadius: '6px'  // Figma's standard radius
borderRadius: '4px'  // For smaller elements
```

---

## ✅ Pre-Flight Checklist

Before considering a plugin UI complete, verify:

**Colors:**
- [ ] All colors use `var(--figma-color-*)` tokens
- [ ] No hardcoded hex, rgb, or hsl colors
- [ ] Text has proper contrast in both light and dark modes
- [ ] Semantic backgrounds use matching "on" text colors (onsuccess, onwarning, ondanger, onbrand)
- [ ] Hover states use `--figma-color-bg-hover`

**Typography:**
- [ ] Font sizes are 11px, 12px, or 13px only
- [ ] All text has explicit `lineHeight` (16px or 20px)
- [ ] Correct font/line-height pairings: 11px→16px, 12px→16px, 13px→20px
- [ ] Font weights are 400, 500, or 600 only
- [ ] No custom font families

**Spacing:**
- [ ] Uses `Container`, `Stack`, and `VerticalSpace` for spacing
- [ ] No arbitrary padding/margin values
- [ ] Content has proper padding at bottom (16px minimum)
- [ ] Spacing follows extraSmall/small/medium/large scale

**Layout:**
- [ ] Main container is `height: 100vh`
- [ ] Scrollable content uses `custom-scroll-container` pattern
- [ ] Background color explicitly set on main container
- [ ] Fixed footers properly positioned

**Components:**
- [ ] Uses `@create-figma-plugin/ui` components when available
- [ ] Buttons have proper states (default, hover, disabled)
- [ ] Input fields have labels
- [ ] Interactive elements have hover feedback

**Border Radius:**
- [ ] Uses 6px (standard) or 4px (small elements) only
- [ ] Consistent throughout the UI

---

## 🎓 Learning Examples

### ✅ Perfect Example

```typescript
import { render, Button, Textbox, Text, Stack, Container } from '@create-figma-plugin/ui';
import { h } from 'preact';
import { useState } from 'preact/hooks';
import '!./output.css';

function Plugin() {
  const [value, setValue] = useState('');
  
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: 'var(--figma-color-bg)'
    }}>
      <Container space="medium">
        <Stack space="medium">
          
          {/* Header */}
          <Text style={{ 
            fontSize: '13px', 
            fontWeight: '600',
            lineHeight: '20px'  // 13px uses 20px line height
          }}>
            Plugin Title
          </Text>
          
          {/* Input Section */}
          <Stack space="small">
            <Text style={{ 
              fontSize: '11px', 
              fontWeight: '500',
              lineHeight: '16px',
              color: 'var(--figma-color-text-secondary)'
            }}>
              Input Label
            </Text>
            <Textbox
              value={value}
              placeholder="Enter text..."
              onValueInput={setValue}
            />
          </Stack>
          
          {/* Info Card */}
          <div style={{
            padding: '12px',
            backgroundColor: 'var(--figma-color-bg-secondary)',
            borderRadius: '6px',
            border: '1px solid var(--figma-color-border)'
          }}>
            <Text style={{ 
              fontSize: '11px',
              lineHeight: '16px',
              color: 'var(--figma-color-text-secondary)'
            }}>
              Additional information goes here
            </Text>
          </div>
          
          {/* Action Button */}
          <Button onClick={() => {}} fullWidth>
            Submit
          </Button>
          
        </Stack>
      </Container>
    </div>
  );
}

export default render(Plugin);
```

---

## 🔍 Testing Your UI

### Visual Testing Checklist

1. **Light Mode:**
   - Open plugin in light mode Figma
   - Check all text is readable
   - Verify borders are visible but subtle
   - Ensure backgrounds don't clash

2. **Dark Mode:**
   - Switch Figma to dark mode
   - Verify all colors adapt correctly
   - Check text contrast is maintained
   - Ensure no "flashbang" bright backgrounds

3. **Spacing:**
   - Scroll to bottom - verify proper padding
   - Check spacing between sections is consistent
   - Ensure touch targets are properly sized

4. **Typography:**
   - All text should align to a 16px baseline grid
   - Line heights should feel consistent
   - Text should not be cramped or overly spacious

---

## 📚 Additional Resources

- [Figma Plugin API - UI Components](https://www.figma.com/plugin-docs/creating-ui/)
- [@create-figma-plugin Documentation](https://github.com/yuanqing/create-figma-plugin)
- [Figma Design Principles](https://www.figma.com/community/file/817913151506972573)

---

**Remember:** When in doubt, use design tokens! Every visual property should reference a Figma CSS variable whenever possible. This ensures your plugin looks professional and native to the Figma interface.
