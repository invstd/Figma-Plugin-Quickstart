# Figma Plugin UI Components Reference

**Complete guide to all UI components from `@create-figma-plugin/ui` and custom implementation patterns**

> 📘 **Related Documentation:**
> - [Design Principles](./FIGMA-PLUGIN-DESIGN-PRINCIPLES.md) - Essential design guidelines
> - [Design System](./FIGMA-PLUGIN-DESIGN-SYSTEM.md) - Complete UI patterns and implementations
> - [Cheat Sheet](./FIGMA-PLUGIN-CHEAT-SHEET.md) - Quick reference

---

## 📦 Package Components (from @create-figma-plugin/ui)

These components are provided by the `@create-figma-plugin/ui` package (v4.0.3+).

### Import Statement

```typescript
import { 
  render,           // Required for Preact rendering
  Button,           // Primary/secondary buttons
  Textbox,          // Text input fields
  Dropdown,         // Select dropdown
  IconButton,       // Icon-only button
  Text,             // Text display component
  Muted,            // Muted/secondary text
  Container,        // Container with padding
  Stack,            // Vertical stack layout
  Inline,           // Horizontal inline layout
  VerticalSpace     // Explicit vertical spacing
} from '@create-figma-plugin/ui';
```

---

## 🔘 Interactive Components

### Button

**Purpose:** Primary and secondary action buttons

**Import:**
```typescript
import { Button } from '@create-figma-plugin/ui';
```

**Basic Usage:**
```typescript
<Button onClick={handleClick}>
  Primary Action
</Button>
```

**Props:**
- `onClick: (event: JSX.TargetedMouseEvent<HTMLButtonElement>) => void` - Click handler
- `secondary?: boolean` - Use secondary styling (transparent with border)
- `disabled?: boolean` - Disable the button
- `fullWidth?: boolean` - Make button full width of container
- `children: React.ReactNode` - Button label/content

**Examples:**

```typescript
// Primary button (default)
<Button onClick={handleSave}>
  Save Changes
</Button>

// Secondary button
<Button onClick={handleCancel} secondary>
  Cancel
</Button>

// Disabled button
<Button onClick={handleAction} disabled={isLoading}>
  {isLoading ? 'Processing...' : 'Submit'}
</Button>

// Full width button
<Button onClick={handleAction} fullWidth>
  Full Width Action
</Button>
```

**Styling Details:**
- Height: `28px`
- Padding: `0 16px`
- Border radius: `6px`
- Font size: `11px`, font-weight: `500`
- Primary: Background `var(--figma-color-bg-brand)`, white text
- Secondary: Transparent background, border `1px solid var(--figma-color-border)`
- Disabled: Background `var(--figma-color-bg-disabled)`, text `var(--figma-color-text-disabled)`

**Hover States:**
- Primary buttons: Handled automatically by the library
- Secondary buttons: Add custom hover handler if needed:
```typescript
<Button 
  secondary
  onMouseEnter={(e) => {
    (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--figma-color-bg-hover)';
  }}
  onMouseLeave={(e) => {
    (e.currentTarget as HTMLElement).style.backgroundColor = '';
  }}
>
  Secondary Action
</Button>
```

---

### IconButton

**Purpose:** Icon-only button for compact actions

**Import:**
```typescript
import { IconButton } from '@create-figma-plugin/ui';
```

**Usage:**
```typescript
<IconButton onClick={handleClick}>
  <svg width="16" height="16">
    {/* Icon SVG */}
  </svg>
</IconButton>
```

**Props:**
- `onClick: (event: JSX.TargetedMouseEvent<HTMLButtonElement>) => void` - Click handler
- `disabled?: boolean` - Disable the button
- `children: React.ReactNode` - Icon content (typically SVG)

**Note:** For custom icon buttons with specific styling, you may need to build your own:

```typescript
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
    color: 'var(--figma-color-text)',
    transition: 'background-color 0.15s ease'
  }}
  onMouseEnter={(e) => {
    (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--figma-color-bg-hover)';
  }}
  onMouseLeave={(e) => {
    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
  }}
>
  <svg width="16" height="16">
    {/* Icon */}
  </svg>
</button>
```

---

### Textbox

**Purpose:** Single-line text input field

**Import:**
```typescript
import { Textbox } from '@create-figma-plugin/ui';
```

**Basic Usage:**
```typescript
const [value, setValue] = useState('');

<Textbox
  value={value}
  placeholder="Enter text..."
  onValueInput={setValue}
/>
```

**Props:**
- `value: string` - Current value (controlled component)
- `onValueInput: (value: string) => void` - Value change handler
- `placeholder?: string` - Placeholder text
- `disabled?: boolean` - Disable the input
- `password?: boolean` - Use password input type (masks text)

**Examples:**

```typescript
// Standard text input
<Textbox
  value={text}
  placeholder="Enter name..."
  onValueInput={setText}
/>

// Password field
<Textbox
  value={password}
  placeholder="Enter password"
  onValueInput={setPassword}
  password
/>

// Disabled input
<Textbox
  value={text}
  placeholder="Not available"
  onValueInput={setText}
  disabled={!isReady}
/>
```

**Styling Details:**
- Height: `28px`
- Padding: `0 8px`
- Border: `1px solid var(--figma-color-border)`
- Border radius: `4px`
- Background: `var(--figma-color-bg)`
- Font size: `11px`
- Focus state: Border color brightens automatically

**With Label Pattern:**
```typescript
<Stack space="small">
  <Text style={{ fontSize: '11px', fontWeight: '500', lineHeight: '16px' }}>
    Field Label
  </Text>
  <Textbox
    value={value}
    placeholder="Enter value..."
    onValueInput={setValue}
  />
  {/* Optional hint */}
  <Text style={{ 
    fontSize: '11px', 
    color: 'var(--figma-color-text-secondary)',
    lineHeight: '16px'
  }}>
    Helpful hint text
  </Text>
</Stack>
```

---

### Dropdown

**Purpose:** Select dropdown for choosing from a list of options

**Import:**
```typescript
import { Dropdown } from '@create-figma-plugin/ui';
```

**Basic Usage:**
```typescript
const [selected, setSelected] = useState('');

<Dropdown
  value={selected}
  options={[
    { value: 'opt1', text: 'Option 1' },
    { value: 'opt2', text: 'Option 2' },
    { value: 'opt3', text: 'Option 3' }
  ]}
  placeholder="Select an option..."
  onValueChange={setSelected}
/>
```

**Props:**
- `value: string` - Currently selected value
- `options: Array<{ value: string; text: string }>` - Array of options
- `onValueChange: (value: string) => void` - Selection change handler
- `placeholder?: string` - Placeholder text when no selection
- `disabled?: boolean` - Disable the dropdown

**Examples:**

```typescript
// Basic dropdown
<Dropdown
  value={selectedBranch}
  options={branches.map(b => ({ value: b.id, text: b.name }))}
  placeholder="Select branch..."
  onValueChange={setSelectedBranch}
/>

// Disabled dropdown
<Dropdown
  value={selected}
  options={options}
  onValueChange={setSelected}
  disabled={loading}
/>

// With label
<Stack space="small">
  <Text style={{ fontSize: '11px', fontWeight: '500', lineHeight: '16px' }}>
    Choose Option
  </Text>
  <Dropdown
    value={selected}
    options={options}
    placeholder="Select..."
    onValueChange={setSelected}
  />
</Stack>
```

**Styling Details:**
- Height: `28px`
- Border: `1px solid var(--figma-color-border)`
- Border radius: `4px`
- Background: `var(--figma-color-bg)`
- Font size: `11px`
- Includes chevron icon automatically

---

## 📝 Text Components

### Text

**Purpose:** Standard text display component

**Import:**
```typescript
import { Text } from '@create-figma-plugin/ui';
```

**Basic Usage:**
```typescript
<Text>Standard text content</Text>
```

**Props:**
- `children: React.ReactNode` - Text content
- All standard HTML attributes can be passed via `style` prop

**Examples:**

```typescript
// Default text (uses library defaults)
<Text>Body text</Text>

// Section header
<Text style={{ 
  fontSize: '13px', 
  fontWeight: '600',
  lineHeight: '20px'  // 13px uses 20px line height
}}>
  Section Title
</Text>

// Label text
<Text style={{ 
  fontSize: '11px', 
  fontWeight: '500',
  lineHeight: '16px'
}}>
  Field Label
</Text>

// Secondary text
<Text style={{ 
  fontSize: '11px',
  color: 'var(--figma-color-text-secondary)',
  lineHeight: '16px'
}}>
  Secondary information
</Text>

// Small metadata text
<Text style={{ 
  fontSize: '10px',
  color: 'var(--figma-color-text-tertiary)',
  lineHeight: '16px'
}}>
  Metadata or hint text
</Text>
```

**Typography Guidelines:**
- Always specify `lineHeight` when setting `fontSize`
- Font sizes: `10px`, `11px`, `12px`, or `13px` only
- Line heights: `16px` for 10-12px text, `20px` for 13px text
- Font weights: `400` (regular), `500` (medium), `600` (semibold)

---

### Muted

**Purpose:** Pre-styled muted/secondary text component

**Import:**
```typescript
import { Muted } from '@create-figma-plugin/ui';
```

**Usage:**
```typescript
<Muted>Secondary or muted text content</Muted>
```

**Props:**
- `children: React.ReactNode` - Text content

**Note:** This component provides default muted styling. For more control, use `Text` with explicit styling:

```typescript
// Using Muted component
<Muted>This is muted text</Muted>

// Equivalent using Text with explicit styling
<Text style={{ 
  fontSize: '11px',
  color: 'var(--figma-color-text-secondary)',
  lineHeight: '16px'
}}>
  This is muted text
</Text>
```

---

## 📐 Layout Components

### Container

**Purpose:** Container component with consistent padding

**Import:**
```typescript
import { Container } from '@create-figma-plugin/ui';
```

**Usage:**
```typescript
<Container space="medium">
  {/* Content */}
</Container>
```

**Props:**
- `space?: 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge'` - Padding size
- `children: React.ReactNode` - Container content

**Spacing Values:**
- `extraSmall`: 4px
- `small`: 8px
- `medium`: 16px (most common)
- `large`: 24px
- `extraLarge`: 32px

**Examples:**

```typescript
// Standard container with medium padding
<Container space="medium">
  <Stack space="medium">
    {/* Content */}
  </Stack>
</Container>

// Container with different spacing
<Container space="large">
  {/* Content with more padding */}
</Container>
```

---

### Stack

**Purpose:** Vertical stack layout with consistent spacing between children

**Import:**
```typescript
import { Stack } from '@create-figma-plugin/ui';
```

**Usage:**
```typescript
<Stack space="medium">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>
```

**Props:**
- `space?: 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge'` - Spacing between children
- `children: React.ReactNode` - Stack items

**Critical Usage Notes:**

**⚠️ DO NOT wrap multiple Stack children in a Fragment:**

```typescript
// ❌ WRONG - Fragment breaks spacing
<Stack space="medium">
  <Text>Header</Text>
  {condition && (
    <Fragment>
      <Stack space="small">...</Stack>
      <Stack space="small">...</Stack>  {/* No spacing! */}
    </Fragment>
  )}
</Stack>

// ✅ CORRECT - Each conditional rendered separately
<Stack space="medium">
  <Text>Header</Text>
  {condition && <Stack space="small">...</Stack>}
  {condition && <Stack space="small">...</Stack>}
</Stack>
```

**Examples:**

```typescript
// Between sections (16px spacing)
<Stack space="medium">
  <Stack space="small">
    <Text>Section 1</Text>
    <Textbox value={value1} onValueInput={setValue1} />
  </Stack>
  
  <Stack space="small">
    <Text>Section 2</Text>
    <Textbox value={value2} onValueInput={setValue2} />
  </Stack>
</Stack>

// Within a section (8px spacing)
<Stack space="small">
  <Text>Label</Text>
  <Textbox value={value} onValueInput={setValue} />
  <Text style={{ fontSize: '11px', color: 'var(--figma-color-text-secondary)' }}>
    Hint text
  </Text>
</Stack>
```

---

### Inline

**Purpose:** Horizontal inline layout with consistent spacing

**Import:**
```typescript
import { Inline } from '@create-figma-plugin/ui';
```

**Usage:**
```typescript
<Inline space="small">
  <Button>Action 1</Button>
  <Button secondary>Action 2</Button>
</Inline>
```

**Props:**
- `space?: 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge'` - Spacing between children
- `children: React.ReactNode` - Inline items

**Examples:**

```typescript
// Buttons in a row
<Inline space="small">
  <Button onClick={handleSave}>Save</Button>
  <Button onClick={handleCancel} secondary>Cancel</Button>
</Inline>

// Related inputs in a row
<Stack space="small">
  <Text>Dimensions</Text>
  <Inline space="small">
    <Textbox value={width} onValueInput={setWidth} placeholder="Width" />
    <Textbox value={height} onValueInput={setHeight} placeholder="Height" />
  </Inline>
</Stack>
```

---

### VerticalSpace

**Purpose:** Explicit vertical spacing element

**Import:**
```typescript
import { VerticalSpace } from '@create-figma-plugin/ui';
```

**Usage:**
```typescript
<VerticalSpace space="large" />
```

**Props:**
- `space?: 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge'` - Spacing size

**Examples:**

```typescript
<Stack space="medium">
  <Text>Section 1</Text>
  {/* Content */}
  
  <VerticalSpace space="medium" />  {/* Explicit 16px spacing */}
  
  <Text>Section 2</Text>
  {/* Content */}
</Stack>
```

**Note:** Usually not needed when using `Stack` with proper `space` prop, but useful for explicit spacing in complex layouts.

---

## 🎨 Custom Components (Not in Package)

The following components are **NOT** provided by `@create-figma-plugin/ui` and need to be custom-built:

### Checkbox

**Custom Implementation:**

```typescript
function Checkbox({ 
  checked, 
  onChange, 
  disabled = false,
  label 
}: { 
  checked: boolean; 
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}) {
  return (
    <div 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
      onClick={() => !disabled && onChange(!checked)}
    >
      <div
        style={{
          width: '16px',
          height: '16px',
          border: `1px solid ${checked 
            ? 'var(--figma-color-bg-brand)' 
            : 'var(--figma-color-border)'}`,
          borderRadius: '4px',
          backgroundColor: checked 
            ? 'var(--figma-color-bg-brand)' 
            : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          opacity: disabled ? 0.5 : 1,
          transition: 'all 0.15s ease'
        }}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path 
              d="M10 3L4.5 8.5L2 6" 
              stroke="#ffffff" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      {label && (
        <Text style={{ 
          fontSize: '11px',
          lineHeight: '16px',
          color: disabled 
            ? 'var(--figma-color-text-disabled)' 
            : 'var(--figma-color-text)'
        }}>
          {label}
        </Text>
      )}
    </div>
  );
}

// Usage
<Checkbox 
  checked={isEnabled}
  onChange={setIsEnabled}
  label="Enable feature"
/>
```

**With Label Pattern:**
```typescript
<Stack space="small">
  <Text style={{ fontSize: '11px', fontWeight: '500', lineHeight: '16px' }}>
    Options
  </Text>
  <Checkbox checked={option1} onChange={setOption1} label="Option 1" />
  <Checkbox checked={option2} onChange={setOption2} label="Option 2" />
</Stack>
```

---

### Radio Button

**Custom Implementation:**

```typescript
function RadioGroup({ 
  options, 
  value, 
  onChange,
  disabled = false
}: {
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <Stack space="small">
      {options.map(option => (
        <div
          key={option.value}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1
          }}
          onClick={() => !disabled && onChange(option.value)}
        >
          <div
            style={{
              width: '16px',
              height: '16px',
              border: `1px solid ${value === option.value
                ? 'var(--figma-color-bg-brand)'
                : 'var(--figma-color-border)'}`,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.15s ease'
            }}
          >
            {value === option.value && (
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--figma-color-bg-brand)'
                }}
              />
            )}
          </div>
          <Text style={{
            fontSize: '11px',
            lineHeight: '16px',
            color: disabled
              ? 'var(--figma-color-text-disabled)'
              : 'var(--figma-color-text)'
          }}>
            {option.label}
          </Text>
        </div>
      ))}
    </Stack>
  );
}

// Usage
<Stack space="small">
  <Text style={{ fontSize: '11px', fontWeight: '500', lineHeight: '16px' }}>
    Choose Option
  </Text>
  <RadioGroup
    options={[
      { value: 'opt1', label: 'Option 1' },
      { value: 'opt2', label: 'Option 2' },
      { value: 'opt3', label: 'Option 3' }
    ]}
    value={selected}
    onChange={setSelected}
  />
</Stack>
```

---

### Toggle/Switch

**Custom Implementation:**

```typescript
function Toggle({
  checked,
  onChange,
  disabled = false,
  label
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1
      }}
      onClick={() => !disabled && onChange(!checked)}
    >
      <div
        style={{
          width: '32px',
          height: '18px',
          borderRadius: '9px',
          backgroundColor: checked
            ? 'var(--figma-color-bg-brand)'
            : 'var(--figma-color-bg-tertiary)',
          position: 'relative',
          transition: 'background-color 0.15s ease',
          flexShrink: 0
        }}
      >
        <div
          style={{
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            position: 'absolute',
            top: '2px',
            left: checked ? '16px' : '2px',
            transition: 'left 0.15s ease',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}
        />
      </div>
      {label && (
        <Text style={{
          fontSize: '11px',
          lineHeight: '16px',
          color: disabled
            ? 'var(--figma-color-text-disabled)'
            : 'var(--figma-color-text)'
        }}>
          {label}
        </Text>
      )}
    </div>
  );
}

// Usage
<Stack space="small">
  <Text style={{ fontSize: '11px', fontWeight: '500', lineHeight: '16px' }}>
    Settings
  </Text>
  <Toggle checked={enabled} onChange={setEnabled} label="Enable notifications" />
</Stack>
```

---

### Textarea (Multi-line Input)

**Custom Implementation:**

```typescript
function Textarea({
  value,
  onChange,
  placeholder,
  disabled = false,
  rows = 4
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      placeholder={placeholder}
      disabled={disabled}
      rows={rows}
      style={{
        width: '100%',
        padding: '8px',
        border: '1px solid var(--figma-color-border)',
        borderRadius: '4px',
        backgroundColor: disabled
          ? 'var(--figma-color-bg-disabled)'
          : 'var(--figma-color-bg)',
        color: disabled
          ? 'var(--figma-color-text-disabled)'
          : 'var(--figma-color-text)',
        fontSize: '11px',
        lineHeight: '16px',
        fontFamily: 'inherit',
        resize: 'vertical',
        minHeight: `${rows * 16 + 16}px`,
        cursor: disabled ? 'not-allowed' : 'text'
      }}
    />
  );
}

// Usage
<Stack space="small">
  <Text style={{ fontSize: '11px', fontWeight: '500', lineHeight: '16px' }}>
    Description
  </Text>
  <Textarea
    value={description}
    onChange={setDescription}
    placeholder="Enter description..."
    rows={4}
  />
</Stack>
```

---

## 📋 Complete Component List Summary

### ✅ Provided by @create-figma-plugin/ui

| Component | Purpose | Status |
|-----------|---------|--------|
| `Button` | Primary/secondary action buttons | ✅ Available |
| `IconButton` | Icon-only button | ✅ Available |
| `Textbox` | Single-line text input | ✅ Available |
| `Dropdown` | Select dropdown | ✅ Available |
| `Text` | Text display component | ✅ Available |
| `Muted` | Muted/secondary text | ✅ Available |
| `Container` | Container with padding | ✅ Available |
| `Stack` | Vertical stack layout | ✅ Available |
| `Inline` | Horizontal inline layout | ✅ Available |
| `VerticalSpace` | Explicit vertical spacing | ✅ Available |
| `render` | Preact render function | ✅ Available |

### ❌ NOT Provided (Custom Implementation Required)

| Component | Purpose | Status |
|-----------|---------|--------|
| `Checkbox` | Multi-select checkbox | ❌ Custom build |
| `Radio` | Single-select radio button | ❌ Custom build |
| `Toggle/Switch` | Binary toggle switch | ❌ Custom build |
| `Textarea` | Multi-line text input | ❌ Custom build |
| `Slider` | Range input slider | ❌ Custom build |
| `Progress` | Progress indicator | ❌ Custom build (see Design System) |
| `Tabs` | Tab navigation | ❌ Custom build |
| `Accordion` | Collapsible sections | ❌ Custom build |

---

## 🎯 Usage Patterns

### Form Pattern

```typescript
<Container space="medium">
  <Stack space="medium">
    {/* Text Input */}
    <Stack space="small">
      <Text style={{ fontSize: '11px', fontWeight: '500', lineHeight: '16px' }}>
        Name
      </Text>
      <Textbox
        value={name}
        placeholder="Enter name..."
        onValueInput={setName}
      />
    </Stack>

    {/* Dropdown */}
    <Stack space="small">
      <Text style={{ fontSize: '11px', fontWeight: '500', lineHeight: '16px' }}>
        Category
      </Text>
      <Dropdown
        value={category}
        options={categories}
        placeholder="Select category..."
        onValueChange={setCategory}
      />
    </Stack>

    {/* Custom Checkbox */}
    <Stack space="small">
      <Text style={{ fontSize: '11px', fontWeight: '500', lineHeight: '16px' }}>
        Options
      </Text>
      <Checkbox checked={option1} onChange={setOption1} label="Option 1" />
      <Checkbox checked={option2} onChange={setOption2} label="Option 2" />
    </Stack>

    {/* Actions */}
    <Stack space="small">
      <Button onClick={handleSubmit} fullWidth>
        Submit
      </Button>
      <Button onClick={handleCancel} secondary fullWidth>
        Cancel
      </Button>
    </Stack>
  </Stack>
</Container>
```

### Input with Button Pattern

```typescript
<Stack space="small">
  <Text style={{ fontSize: '11px', fontWeight: '500', lineHeight: '16px' }}>
    Search
  </Text>
  <div style={{ 
    display: 'flex', 
    gap: '8px', 
    alignItems: 'stretch' 
  }}>
    <div style={{ flex: '1 1 auto' }}>
      <Textbox
        value={search}
        placeholder="Enter search term..."
        onValueInput={setSearch}
      />
    </div>
    <Button onClick={handleSearch}>
      Go
    </Button>
  </div>
</Stack>
```

---

## ⚠️ Important Notes

1. **Version Requirement:** Must use `@create-figma-plugin/ui@^4.0.3` or later for proper theme support
2. **Theme Colors:** Always call `showUI` with `{ themeColors: true }` in `main.ts`
3. **Typography:** Always specify `lineHeight` when setting `fontSize`
4. **Spacing:** Use framework components (`Stack`, `Container`, `Inline`) instead of arbitrary padding/margin
5. **Colors:** Always use Figma CSS variables (`var(--figma-color-*)`) - never hardcoded colors
6. **Custom Components:** For components not in the package, follow the design system patterns for consistency

---

## 📚 Related Documentation

- **[Design Principles](./FIGMA-PLUGIN-DESIGN-PRINCIPLES.md)** - Essential design guidelines
- **[Design System](./FIGMA-PLUGIN-DESIGN-SYSTEM.md)** - Complete UI patterns, custom scrollbar, and advanced components
- **[Cheat Sheet](./FIGMA-PLUGIN-CHEAT-SHEET.md)** - Quick reference for common patterns
- **[Quick Start](./FIGMA-PLUGIN-QUICK-START.md)** - Setup and basic usage

---

**Last Updated:** Based on `@create-figma-plugin/ui` v4.0.3+
