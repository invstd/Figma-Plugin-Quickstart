/**
 * SemanticBadge - Pre-validated badge with correct bg+text pairing.
 * Enforces semantic color pairing at the component level.
 */
import { Text } from '@create-figma-plugin/ui';
import { FIGMA_TYPOGRAPHY_PAIRS } from '@inversestudio/design-tokens';
import type { SemanticBadgeProps } from './types';

const VARIANT_STYLES: Record<
  string,
  { bg: string; color: string }
> = {
  success: {
    bg: 'var(--figma-color-bg-success)',
    color: 'var(--figma-color-text-onsuccess)'
  },
  danger: {
    bg: 'var(--figma-color-bg-danger)',
    color: 'var(--figma-color-text-ondanger)'
  },
  warning: {
    bg: 'var(--figma-color-bg-warning)',
    color: 'var(--figma-color-text-onwarning)'
  },
  brand: {
    bg: 'var(--figma-color-bg-brand)',
    color: 'var(--figma-color-text-onbrand)'
  }
};

export function SemanticBadge({
  variant,
  children,
  style = {}
}: SemanticBadgeProps) {
  const { bg, color } = VARIANT_STYLES[variant] ?? VARIANT_STYLES.brand;
  const size = '11px';
  const lineHeight = FIGMA_TYPOGRAPHY_PAIRS[size];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 8px',
        borderRadius: '4px',
        backgroundColor: bg,
        color,
        fontSize: size,
        lineHeight,
        fontWeight: '500',
        ...style
      }}
    >
      {children}
    </span>
  );
}
