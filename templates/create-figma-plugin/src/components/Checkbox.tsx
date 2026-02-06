import { h } from 'preact';
import { Text } from '@create-figma-plugin/ui';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}

export function Checkbox({ 
  checked, 
  onChange, 
  disabled = false,
  label 
}: CheckboxProps) {
  return (
    <div 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
      onClick={() => !disabled && onChange(!checked)}
    >
      <div
        style={{
          width: '16px',
          height: '16px',
          border: `1px solid ${checked 
            ? 'var(--figma-color-bg-brand)' 
            : 'var(--figma-color-border)'}`,
          borderRadius: '4px',
          backgroundColor: checked 
            ? 'var(--figma-color-bg-brand)' 
            : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          opacity: disabled ? 0.5 : 1,
          transition: 'all 0.15s ease'
        }}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path 
              d="M10 3L4.5 8.5L2 6" 
              stroke="#ffffff" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        )}
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
