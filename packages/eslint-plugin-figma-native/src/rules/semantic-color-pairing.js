/**
 * ESLint rule: semantic-color-pairing
 * When using semantic background colors, require matching "on" text colors for contrast.
 */

const BG_TO_ON = {
  '--figma-color-bg-brand': '--figma-color-text-onbrand',
  '--figma-color-bg-brand-hover': '--figma-color-text-onbrand',
  '--figma-color-bg-brand-pressed': '--figma-color-text-onbrand',
  '--figma-color-bg-danger': '--figma-color-text-ondanger',
  '--figma-color-bg-danger-hover': '--figma-color-text-ondanger',
  '--figma-color-bg-danger-pressed': '--figma-color-text-ondanger',
  '--figma-color-bg-success': '--figma-color-text-onsuccess',
  '--figma-color-bg-success-hover': '--figma-color-text-onsuccess',
  '--figma-color-bg-success-pressed': '--figma-color-text-onsuccess',
  '--figma-color-bg-warning': '--figma-color-text-onwarning',
  '--figma-color-bg-warning-hover': '--figma-color-text-onwarning',
  '--figma-color-bg-warning-pressed': '--figma-color-text-onwarning',
  '--figma-color-bg-selected': '--figma-color-text-onselected',
  '--figma-color-bg-selected-hover': '--figma-color-text-onselected',
  '--figma-color-bg-selected-pressed': '--figma-color-text-onselected'
};

function extractVarToken(value) {
  if (typeof value !== 'string') return null;
  const match = value.match(/var\s*\(\s*(--figma-color-[^)]+)\s*\)/);
  return match ? match[1].trim() : null;
}

function getStyleProp(styleObj, propName) {
  if (!styleObj?.properties) return null;
  const prop = styleObj.properties.find(
    p => (p.key?.name || p.key?.value) === propName
  );
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
      description: 'Require matching "on" text colors when using semantic backgrounds',
      category: 'Best Practices',
      recommended: true
    },
    messages: {
      missingOnColor: 'Semantic background "{{bg}}" requires matching text color "{{expected}}" for proper contrast.'
    },
    schema: []
  },

  create(context) {
    function checkSemanticPairing(styleObj, node) {
      const bgValue = getStyleProp(styleObj, 'backgroundColor') || getStyleProp(styleObj, 'background');
      const bgToken = extractVarToken(bgValue);
      if (!bgToken || !BG_TO_ON[bgToken]) return;

      const expectedOn = BG_TO_ON[bgToken];
      const colorValue = getStyleProp(styleObj, 'color');
      const colorToken = extractVarToken(colorValue);

      if (!colorToken || colorToken !== expectedOn) {
        context.report({
          node,
          messageId: 'missingOnColor',
          data: { bg: bgToken, expected: expectedOn }
        });
      }
    }

    function visitStyleObject(expr, reportNode) {
      if (expr?.type === 'ObjectExpression') {
        checkSemanticPairing(expr, reportNode);
      }
    }

    return {
      JSXAttribute(node) {
        if ((node.name?.name || node.name?.value) !== 'style') return;
        if (node.value?.type === 'JSXExpressionContainer') {
          visitStyleObject(node.value.expression, node);
        }
      },

      Property(node) {
        if (!node.key || (node.key?.name || node.key?.value) !== 'backgroundColor') return;
        const parent = node.parent;
        if (parent?.type === 'ObjectExpression') {
          visitStyleObject(parent, node);
        }
      }
    };
  }
};
