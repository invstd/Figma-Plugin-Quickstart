/**
 * NativeText - Pre-validated text component.
 * Enforces fontSize/lineHeight pairing and design token colors.
 */
import { Text } from '@create-figma-plugin/ui';
import { FIGMA_TYPOGRAPHY_PAIRS } from '@inversestudio/design-tokens';
import type { NativeTextProps } from './types';

export function NativeText({
  size = '11px',
  color = 'var(--figma-color-text)',
  weight = '400',
  style = {},
  children
}: NativeTextProps) {
  const lineHeight = FIGMA_TYPOGRAPHY_PAIRS[size];
  return (
    <Text
      style={{
        fontSize: size,
        lineHeight,
        fontWeight: weight,
        color,
        ...style
      }}
    >
      {children}
    </Text>
  );
}
