/**
 * Figma typography design tokens.
 * Enforces valid fontSize/lineHeight pairs.
 */

export type FigmaFontSize = '10px' | '11px' | '12px' | '13px';

export type FigmaLineHeight = '16px' | '20px';

export const FIGMA_TYPOGRAPHY_PAIRS: Record<FigmaFontSize, FigmaLineHeight> = {
  '10px': '16px',
  '11px': '16px',
  '12px': '16px',
  '13px': '20px'
} as const;

export function getLineHeightForFontSize(fontSize: FigmaFontSize): FigmaLineHeight {
  return FIGMA_TYPOGRAPHY_PAIRS[fontSize];
}
