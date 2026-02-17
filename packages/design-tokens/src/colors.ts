/**
 * Figma color design tokens.
 * Use as: color: FigmaColorToken
 * Values are var(--figma-color-*) CSS variables.
 */

export type FigmaColorText =
  | 'var(--figma-color-text)'
  | 'var(--figma-color-text-secondary)'
  | 'var(--figma-color-text-tertiary)'
  | 'var(--figma-color-text-disabled)'
  | 'var(--figma-color-text-brand)'
  | 'var(--figma-color-text-onbrand)'
  | 'var(--figma-color-text-onsuccess)'
  | 'var(--figma-color-text-onwarning)'
  | 'var(--figma-color-text-ondanger)'
  | 'var(--figma-color-text-onselected)'
  | 'var(--figma-color-text-oncomponent)'
  | 'var(--figma-color-text-ondisabled)';

export type FigmaColorBg =
  | 'var(--figma-color-bg)'
  | 'var(--figma-color-bg-secondary)'
  | 'var(--figma-color-bg-tertiary)'
  | 'var(--figma-color-bg-hover)'
  | 'var(--figma-color-bg-brand)'
  | 'var(--figma-color-bg-brand-hover)'
  | 'var(--figma-color-bg-brand-pressed)'
  | 'var(--figma-color-bg-brand-secondary)'
  | 'var(--figma-color-bg-brand-tertiary)'
  | 'var(--figma-color-bg-danger)'
  | 'var(--figma-color-bg-danger-hover)'
  | 'var(--figma-color-bg-danger-pressed)'
  | 'var(--figma-color-bg-success)'
  | 'var(--figma-color-bg-success-hover)'
  | 'var(--figma-color-bg-success-pressed)'
  | 'var(--figma-color-bg-warning)'
  | 'var(--figma-color-bg-warning-hover)'
  | 'var(--figma-color-bg-warning-pressed)'
  | 'var(--figma-color-bg-selected)'
  | 'var(--figma-color-bg-selected-hover)'
  | 'var(--figma-color-bg-selected-pressed)'
  | 'var(--figma-color-bg-disabled)';

export type FigmaColorBorder =
  | 'var(--figma-color-border)'
  | 'var(--figma-color-border-strong)'
  | 'var(--figma-color-border-brand)'
  | 'var(--figma-color-border-disabled)'
  | 'var(--figma-color-border-success)'
  | 'var(--figma-color-border-danger)'
  | 'var(--figma-color-border-warning)';

export type FigmaColorToken = FigmaColorText | FigmaColorBg | FigmaColorBorder;
