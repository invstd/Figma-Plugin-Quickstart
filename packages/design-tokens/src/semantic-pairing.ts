/**
 * Semantic color pairing: background + required text color.
 * When using a semantic background, you MUST use the matching "on" text color.
 */

export type SemanticBgToken =
  | 'var(--figma-color-bg-brand)'
  | 'var(--figma-color-bg-brand-hover)'
  | 'var(--figma-color-bg-brand-pressed)'
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
  | 'var(--figma-color-bg-selected-pressed)';

export type SemanticOnToken =
  | 'var(--figma-color-text-onbrand)'
  | 'var(--figma-color-text-ondanger)'
  | 'var(--figma-color-text-onsuccess)'
  | 'var(--figma-color-text-onwarning)'
  | 'var(--figma-color-text-onselected)';

export const SEMANTIC_BG_TO_ON: Record<SemanticBgToken, SemanticOnToken> = {
  'var(--figma-color-bg-brand)': 'var(--figma-color-text-onbrand)',
  'var(--figma-color-bg-brand-hover)': 'var(--figma-color-text-onbrand)',
  'var(--figma-color-bg-brand-pressed)': 'var(--figma-color-text-onbrand)',
  'var(--figma-color-bg-danger)': 'var(--figma-color-text-ondanger)',
  'var(--figma-color-bg-danger-hover)': 'var(--figma-color-text-ondanger)',
  'var(--figma-color-bg-danger-pressed)': 'var(--figma-color-text-ondanger)',
  'var(--figma-color-bg-success)': 'var(--figma-color-text-onsuccess)',
  'var(--figma-color-bg-success-hover)': 'var(--figma-color-text-onsuccess)',
  'var(--figma-color-bg-success-pressed)': 'var(--figma-color-text-onsuccess)',
  'var(--figma-color-bg-warning)': 'var(--figma-color-text-onwarning)',
  'var(--figma-color-bg-warning-hover)': 'var(--figma-color-text-onwarning)',
  'var(--figma-color-bg-warning-pressed)': 'var(--figma-color-text-onwarning)',
  'var(--figma-color-bg-selected)': 'var(--figma-color-text-onselected)',
  'var(--figma-color-bg-selected-hover)': 'var(--figma-color-text-onselected)',
  'var(--figma-color-bg-selected-pressed)': 'var(--figma-color-text-onselected)'
} as const;

export function getOnColorForBg(bg: SemanticBgToken): SemanticOnToken {
  return SEMANTIC_BG_TO_ON[bg];
}
