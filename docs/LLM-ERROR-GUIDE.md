# LLM Error Guide – Figma Plugin Enforcement

When ESLint or the build validator reports a violation, use this guide to fix it.

---

## no-hardcoded-colors / hardcoded-color

**Error:** `Hardcoded color "X" detected` or `Hardcoded hex color "#xxx"`

**Fix:** Replace with a Figma design token.

| Wrong | Right |
|-------|-------|
| `#333`, `#ff0000` | `var(--figma-color-text)` or `var(--figma-color-text-secondary)` |
| `backgroundColor: 'red'` | `backgroundColor: 'var(--figma-color-bg-danger)'` |
| `color: 'white'` | `color: 'var(--figma-color-text-onbrand)'` (if on brand bg) |

---

## require-line-height / missing-line-height

**Error:** `fontSize "Xpx" requires lineHeight "Ypx"`

**Fix:** Add the matching lineHeight.

| fontSize | lineHeight |
|----------|------------|
| 10px | 16px |
| 11px | 16px |
| 12px | 16px |
| 13px | 20px |

```typescript
// Wrong
style={{ fontSize: '13px' }}

// Right
style={{ fontSize: '13px', lineHeight: '20px' }}
```

---

## require-line-height / wrong-line-height

**Error:** `fontSize "Xpx" should pair with lineHeight "Ypx", not "Zpx"`

**Fix:** Use the correct pairing for that fontSize (see table above).

```typescript
// Wrong – 13px must use 20px
style={{ fontSize: '13px', lineHeight: '16px' }}

// Right
style={{ fontSize: '13px', lineHeight: '20px' }}
```

---

## framework-spacing / invalid-spacing

**Error:** `Invalid spacing "Xpx". Use 4px, 8px, 16px, or 24px`

**Fix:** Use only 4px, 8px, 16px, or 24px.

| Wrong | Right |
|-------|-------|
| `padding: '12px'` | `padding: '8px'` or `padding: '16px'` |
| `gap: '7px'` | `gap: '8px'` |
| `marginBottom: '10px'` | `marginBottom: '8px'` or `16px` |

Prefer: `<Stack space="small">` (8px) or `space="medium"` (16px).

---

## semantic-color-pairing / semantic-pairing

**Error:** `Semantic background "X" requires matching text color "Y"`

**Fix:** Pair semantic backgrounds with their "on" text colors.

| Background | Required Text |
|------------|---------------|
| `--figma-color-bg-brand` | `--figma-color-text-onbrand` |
| `--figma-color-bg-success` | `--figma-color-text-onsuccess` |
| `--figma-color-bg-warning` | `--figma-color-text-onwarning` |
| `--figma-color-bg-danger` | `--figma-color-text-ondanger` |

```typescript
// Wrong
style={{ backgroundColor: 'var(--figma-color-bg-success)', color: 'var(--figma-color-text)' }}

// Right
style={{ backgroundColor: 'var(--figma-color-bg-success)', color: 'var(--figma-color-text-onsuccess)' }}
```

---

## Quick Fix: Use Pre-Validated Components

- **NativeText** – `size` and `color` auto-enforce typography and tokens
- **SemanticBadge** – `variant="success"` etc. auto-enforces pairing
