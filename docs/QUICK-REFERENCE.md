# Figma Plugin Quick Reference (LLM-Optimized)

> Use this for fast lookup. See LLM-ERROR-GUIDE.md when enforcement fails.

## Critical Setup
```typescript
showUI({ width: 400, height: 500 }, { themeColors: true });  // REQUIRED
```

## Color Tokens (var() only, never hex/rgb/hsl)
| Use Case | Token |
|----------|-------|
| Text | `--figma-color-text`, `--figma-color-text-secondary`, `--figma-color-text-tertiary` |
| BG | `--figma-color-bg`, `--figma-color-bg-secondary`, `--figma-color-bg-tertiary`, `--figma-color-bg-hover` |
| Semantic BG | `--figma-color-bg-brand`, `--figma-color-bg-success`, `--figma-color-bg-warning`, `--figma-color-bg-danger` |
| Semantic text (MUST pair) | `--figma-color-text-onbrand`, `--figma-color-text-onsuccess`, `--figma-color-text-onwarning`, `--figma-color-text-ondanger` |
| Border | `--figma-color-border`, `--figma-color-border-strong` |

## Typography Pairs (fontSize → lineHeight)
| fontSize | lineHeight |
|----------|------------|
| 10px | 16px |
| 11px | 16px |
| 12px | 16px |
| 13px | 20px |

## Spacing (4px, 8px, 16px, 24px ONLY)
- Use `Stack space="small"` (8px), `space="medium"` (16px), `space="large"` (24px)
- Use `Container`, `Inline`, `VerticalSpace` from `@create-figma-plugin/ui`
- Raw: `padding: '8px'`, `gap: '8px'`, `marginBottom: '16px'`

## Components (from @create-figma-plugin/ui)
- `Button`, `Textbox`, `Dropdown`, `IconButton`, `Text`, `Muted`
- `Container`, `Stack`, `Inline`, `VerticalSpace`

## Pre-Validated (from @inversestudio/figma-ui-components)
- `NativeText` – auto lineHeight, token colors
- `SemanticBadge` – correct bg+text pairing

## Enforcement
- ESLint: `@inversestudio/eslint-plugin-figma-native`
- Build: `figma-validate-build dist`
- Types: `@inversestudio/design-tokens`
