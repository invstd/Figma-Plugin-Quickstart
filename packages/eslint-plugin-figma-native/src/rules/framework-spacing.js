/**
 * ESLint rule: framework-spacing
 * Enforce Figma spacing scale: 4px, 8px, 16px, 24px only.
 * Prefer Stack/Inline/Container with space prop over raw pixel values.
 */

const ALLOWED_SPACING_VALUES = ['4px', '8px', '16px', '24px'];

const SPACING_PROPS = [
  'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
  'gap', 'rowGap', 'columnGap'
];

function extractPixelValue(value) {
  if (typeof value !== 'string') return null;
  const match = value.match(/^(\d+)\s*px$/);
  return match ? match[1] : null;
}

function getStylePropValue(prop) {
  if (!prop?.value) return null;
  if (prop.value.type === 'Literal') return prop.value.value;
  if (prop.value.type === 'TemplateLiteral' && prop.value.expressions.length === 0) {
    return prop.value.quasis[0]?.value?.cooked;
  }
  return null;
}

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce Figma spacing scale (4px, 8px, 16px, 24px) in style objects',
      category: 'Best Practices',
      recommended: true
    },
    messages: {
      invalidSpacing: 'Spacing value "{{value}}" is not in the Figma scale. Use 4px, 8px, 16px, or 24px.',
      preferFramework: 'Prefer Stack/Inline/Container with space="small|medium|large" over raw pixel spacing when possible.'
    },
    schema: []
  },

  create(context) {
    function checkProperty(node) {
      const propName = node.key?.name || node.key?.value;
      if (!SPACING_PROPS.includes(propName)) return;

      const value = getStylePropValue(node);
      if (!value) return;

      // Allow var(--figma-*) tokens
      if (/var\s*\(\s*--figma-/i.test(value)) return;

      const pixelVal = extractPixelValue(value);
      if (!pixelVal) return; // Not a simple "Npx" value

      const normalized = `${parseInt(pixelVal, 10)}px`;
      if (!ALLOWED_SPACING_VALUES.includes(normalized)) {
        context.report({
          node: node.value,
          messageId: 'invalidSpacing',
          data: { value }
        });
      }
    }

    return {
      Property(node) {
        checkProperty(node);
      },

      JSXAttribute(node) {
        if ((node.name?.name || node.name?.value) !== 'style') return;
        if (node.value?.type === 'JSXExpressionContainer') {
          const expr = node.value.expression;
          if (expr?.type === 'ObjectExpression') {
            expr.properties.forEach(prop => checkProperty(prop));
          }
        }
      }
    };
  }
};
