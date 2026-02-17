import type { FigmaFontSize, FigmaColorText } from '@inversestudio/design-tokens';

export type SemanticVariant = 'success' | 'danger' | 'warning' | 'brand';

export interface NativeTextProps {
  /** Font size - lineHeight is automatically paired */
  size?: FigmaFontSize;
  /** Text color token - enforces design tokens */
  color?: FigmaColorText;
  /** Font weight */
  weight?: '400' | '500' | '600';
  /** Additional style overrides (avoid color/fontSize/lineHeight) */
  style?: Record<string, string | number>;
  children: import('preact').ComponentChildren;
}

export interface SemanticBadgeProps {
  variant: SemanticVariant;
  children: import('preact').ComponentChildren;
  style?: Record<string, string | number>;
}
