/**
 * ESLint rule: require-line-height
 * Enforces explicit lineHeight on text elements when fontSize is set.
 * Valid pairs: 11px→16px, 12px→16px, 13px→20px, 10px→16px
 */

const VALID_PAIRS = {
  '10px': '16px',
  '11px': '16px',
  '12px': '16px',
  '13px': '20px'
};

const TEXT_COMPONENTS = ['Text', 'Muted', 'span', 'p', 'label', 'h1', 'h2', 'h3', 'h4'];

function getFontSizeFromStyle(styleObj) {
  if (!styleObj || styleObj.type !== 'ObjectExpression') return null;
  const fontSizeProp = styleObj.properties.find(
    p => (p.key?.name || p.key?.value) === 'fontSize'
  );
  if (!fontSizeProp?.value) return null;
  if (fontSizeProp.value.type === 'Literal' && typeof fontSizeProp.value.value === 'string') {
    return fontSizeProp.value.value.trim();
  }
  return null;
}

function getLineHeightFromStyle(styleObj) {
  if (!styleObj || styleObj.type !== 'ObjectExpression') return null;
  const lhProp = styleObj.properties.find(
    p => (p.key?.name || p.key?.value) === 'lineHeight'
  );
  if (!lhProp?.value) return null;
  if (lhProp.value.type === 'Literal' && typeof lhProp.value.value === 'string') {
    return lhProp.value.value.trim();
  }
  return null;
}

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Require explicit lineHeight when fontSize is set on text elements',
      category: 'Best Practices',
      recommended: true
    },
    messages: {
      missingLineHeight: 'Text with fontSize "{{fontSize}}" must have explicit lineHeight. Use {{expected}} for this font size.',
      wrongLineHeight: 'fontSize "{{fontSize}}" should pair with lineHeight "{{expected}}", not "{{actual}}".'
    },
    schema: []
  },

  create(context) {
    function checkStyleObject(styleObj, node) {
      const fontSize = getFontSizeFromStyle(styleObj);
      if (!fontSize) return;

      const expected = VALID_PAIRS[fontSize];
      if (!expected) return; // Unknown font size, skip

      const lineHeight = getLineHeightFromStyle(styleObj);
      if (!lineHeight) {
        context.report({
          node,
          messageId: 'missingLineHeight',
          data: { fontSize, expected }
        });
        return;
      }
      if (lineHeight !== expected) {
        context.report({
          node,
          messageId: 'wrongLineHeight',
          data: { fontSize, expected, actual: lineHeight }
        });
      }
    }

    return {
      JSXElement(node) {
        const name = node.openingElement.name?.name || node.openingElement.name?.value;
        if (!name || !TEXT_COMPONENTS.includes(name)) return;

        const styleAttr = node.openingElement.attributes.find(
          a => (a.name?.name || a.name?.value) === 'style'
        );
        if (!styleAttr?.value?.expression) return;

        const expr = styleAttr.value.expression;
        if (expr.type === 'ObjectExpression') {
          checkStyleObject(expr, node);
        }
      }
    };
  }
};
