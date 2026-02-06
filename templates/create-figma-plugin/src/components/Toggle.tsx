import { h } from 'preact';
import { Text } from '@create-figma-plugin/ui';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}

export function Toggle({
  checked,
  onChange,
  disabled = false,
  label
}: ToggleProps) {
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
