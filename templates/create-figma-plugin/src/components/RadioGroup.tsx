import { h } from 'preact';
import { Text, Stack } from '@create-figma-plugin/ui';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function RadioGroup({ 
  options, 
  value, 
  onChange,
  disabled = false
}: RadioGroupProps) {
  return (
    <Stack space="small">
      {options.map(option => (
        <div
          key={option.value}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1
          }}
          onClick={() => !disabled && onChange(option.value)}
        >
          <div
            style={{
              width: '16px',
              height: '16px',
              border: `1px solid ${value === option.value
                ? 'var(--figma-color-bg-brand)'
                : 'var(--figma-color-border)'}`,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.15s ease'
            }}
          >
            {value === option.value && (
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--figma-color-bg-brand)'
                }}
              />
            )}
          </div>
          <Text style={{
            fontSize: '11px',
            lineHeight: '16px',
            color: disabled
              ? 'var(--figma-color-text-disabled)'
              : 'var(--figma-color-text)'
          }}>
            {option.label}
          </Text>
        </div>
      ))}
    </Stack>
  );
}
