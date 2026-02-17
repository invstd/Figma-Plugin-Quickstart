/**
 * ESLint rule: no-hardcoded-colors
 * Enforces use of Figma design tokens (var(--figma-color-*)) instead of hardcoded colors
 */

const COLOR_PROPS = [
  'color',
  'backgroundColor',
  'borderColor',
  'borderTopColor',
  'borderBottomColor',
  'borderLeftColor',
  'borderRightColor',
  'outlineColor',
  'fill',
  'stroke'
];

const HEX_COLOR_REGEX = /#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/;
const RGB_COLOR_REGEX = /rgba?\s*\(/;
const HSL_COLOR_REGEX = /hsla?\s*\(/;
const NAMED_COLORS = [
  'black', 'white', 'red', 'green', 'blue', 'yellow', 'orange', 'purple',
  'pink', 'brown', 'gray', 'grey', 'cyan', 'magenta', 'transparent'
];

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow hardcoded colors in favor of Figma design tokens',
      category: 'Best Practices',
      recommended: true
    },
    messages: {
      noHardcodedColor: 'Hardcoded color "{{value}}" detected. Use var(--figma-color-*) design tokens instead. See docs/QUICK-REFERENCE.md for available tokens.',
      useDesignToken: 'Use Figma design tokens like var(--figma-color-text), var(--figma-color-bg), etc.'
    },
    schema: []
  },

  create(context) {
    function isHardcodedColor(value) {
      if (typeof value !== 'string') return false;
      
      // Check for hex colors
      if (HEX_COLOR_REGEX.test(value)) return true;
      
      // Check for rgb/rgba
      if (RGB_COLOR_REGEX.test(value)) return true;
      
      // Check for hsl/hsla
      if (HSL_COLOR_REGEX.test(value)) return true;
      
      // Check for named colors (but allow 'inherit', 'currentColor', 'transparent' in some cases)
      const normalized = value.toLowerCase().trim();
      if (NAMED_COLORS.includes(normalized) && normalized !== 'transparent') {
        return true;
      }
      
      return false;
    }

    function checkProperty(node) {
      if (!node.key || !node.value) return;
      
      const propName = node.key.name || node.key.value;
      if (!COLOR_PROPS.includes(propName)) return;
      
      let colorValue = null;
      
      // Handle string literals
      if (node.value.type === 'Literal' && typeof node.value.value === 'string') {
        colorValue = node.value.value;
      }
      
      // Handle template literals without expressions
      if (node.value.type === 'TemplateLiteral' && node.value.expressions.length === 0) {
        colorValue = node.value.quasis[0].value.cooked;
      }
      
      if (colorValue && isHardcodedColor(colorValue)) {
        context.report({
          node: node.value,
          messageId: 'noHardcodedColor',
          data: {
            value: colorValue
          }
        });
      }
    }

    return {
      // Handle object properties in style objects
      Property(node) {
        checkProperty(node);
      },
      
      // Handle JSX style attributes
      JSXAttribute(node) {
        if (!node.name || node.name.name !== 'style') return;
        
        if (node.value && node.value.type === 'JSXExpressionContainer') {
          const expr = node.value.expression;
          if (expr.type === 'ObjectExpression') {
            expr.properties.forEach(prop => checkProperty(prop));
          }
        }
      }
    };
  }
};
