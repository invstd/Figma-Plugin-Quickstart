import noHardcodedColors from './rules/no-hardcoded-colors.js';
import requireLineHeight from './rules/require-line-height.js';
import semanticColorPairing from './rules/semantic-color-pairing.js';
import frameworkSpacing from './rules/framework-spacing.js';

export default {
  meta: {
    name: '@inversestudio/eslint-plugin-figma-native',
    version: '1.0.0'
  },
  rules: {
    'no-hardcoded-colors': noHardcodedColors,
    'require-line-height': requireLineHeight,
    'semantic-color-pairing': semanticColorPairing,
    'framework-spacing': frameworkSpacing
  }
};
