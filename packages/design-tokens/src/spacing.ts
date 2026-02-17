/**
 * Figma spacing scale.
 * Use 4px, 8px, 16px, or 24px only.
 */

export type FigmaSpacingValue = '4px' | '8px' | '16px' | '24px';

export type FigmaSpaceProp = 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';

/** Stack/Inline space prop values and their pixel equivalents */
export const FIGMA_SPACE_TO_PX: Record<FigmaSpaceProp, FigmaSpacingValue> = {
  extraSmall: '4px',
  small: '8px',
  medium: '16px',
  large: '24px',
  extraLarge: '24px'
} as const;

export const FIGMA_SPACING_VALUES: readonly FigmaSpacingValue[] = ['4px', '8px', '16px', '24px'] as const;

export function isValidSpacing(value: string): value is FigmaSpacingValue {
  return FIGMA_SPACING_VALUES.includes(value as FigmaSpacingValue);
}
