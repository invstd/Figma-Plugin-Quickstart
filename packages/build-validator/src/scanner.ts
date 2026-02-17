import * as fs from 'fs';
import * as path from 'path';
import * as acorn from 'acorn';
import * as walk from 'acorn-walk';
import { glob } from 'glob';
import type { Violation, ValidationResult } from './types.js';

const HEX_COLOR = /#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/;
const RGB_COLOR = /rgba?\s*\(/;
const HSL_COLOR = /hsla?\s*\(/;
const NAMED_COLORS = ['red', 'green', 'blue', 'black', 'white', 'gray', 'grey', 'yellow', 'orange', 'purple', 'pink'];
const COLOR_PROPS = ['color', 'backgroundColor', 'borderColor', 'fill', 'stroke'];
const VALID_SPACING = ['4px', '8px', '16px', '24px'];
const SPACING_PROPS = ['padding', 'margin', 'gap', 'paddingTop', 'paddingBottom', 'marginTop', 'marginBottom'];
const FONT_LH_PAIRS: Record<string, string> = { '10px': '16px', '11px': '16px', '12px': '16px', '13px': '20px' };

function extractStringValue(node: acorn.Node): string | null {
  if (node.type === 'Literal' && typeof (node as any).value === 'string') {
    return (node as any).value;
  }
  if (node.type === 'TemplateLiteral' && (node as any).expressions?.length === 0) {
    return (node as any).quasis?.[0]?.value?.cooked ?? null;
  }
  return null;
}

function getLoc(node: acorn.Node): { line: number; column: number } {
  const loc = (node as any).loc;
  return loc ? { line: loc.start.line, column: loc.start.column } : { line: 0, column: 0 };
}

function scanAst(code: string, filename: string): Violation[] {
  const violations: Violation[] = [];
  let ast: acorn.Node;

  try {
    ast = acorn.parse(code, {
      ecmaVersion: 2020,
      sourceType: 'module',
      locations: true,
      allowHashBang: true
    });
  } catch {
    return violations;
  }

  walk.ancestor(ast, {
    Property(node: acorn.Node, _state: unknown, ancestors: acorn.Node[]) {
      const prop = node as any;
      const parent = ancestors.length >= 2 ? ancestors[ancestors.length - 2] : null;
      const key = prop.key?.name || prop.key?.value;
      const value = extractStringValue(prop.value);
      if (!value) return;

      // Hardcoded colors
      if (COLOR_PROPS.includes(key)) {
        if (HEX_COLOR.test(value) || RGB_COLOR.test(value) || HSL_COLOR.test(value)) {
          violations.push({
            kind: 'hardcoded-color',
            message: `Hardcoded color "${value}"`,
            file: filename,
            ...getLoc(prop.value),
            value,
            suggestion: 'Use var(--figma-color-*) design tokens'
          });
        }
        const lower = value.toLowerCase().trim();
        if (NAMED_COLORS.includes(lower) && lower !== 'transparent') {
          violations.push({
            kind: 'hardcoded-color',
            message: `Named color "${value}"`,
            file: filename,
            ...getLoc(prop.value),
            value,
            suggestion: 'Use var(--figma-color-*) design tokens'
          });
        }
      }

      // Spacing
      if (SPACING_PROPS.includes(key)) {
        const match = value.match(/^(\d+)\s*px$/);
        if (match && !VALID_SPACING.includes(`${match[1]}px`)) {
          violations.push({
            kind: 'invalid-spacing',
            message: `Invalid spacing "${value}". Use 4px, 8px, 16px, or 24px`,
            file: filename,
            ...getLoc(prop.value),
            value,
            suggestion: 'Use Figma spacing scale: 4px, 8px, 16px, 24px'
          });
        }
      }

      // Line height / font size
      if (key === 'fontSize' && FONT_LH_PAIRS[value]) {
        const objParent = parent as any;
        if (objParent?.type === 'ObjectExpression') {
          const lhProp = objParent.properties?.find((p: any) => (p.key?.name || p.key?.value) === 'lineHeight');
          const lhValue = lhProp ? extractStringValue(lhProp.value) : null;
          const expected = FONT_LH_PAIRS[value];
          if (!lhValue) {
            violations.push({
              kind: 'missing-line-height',
              message: `fontSize "${value}" requires lineHeight "${expected}"`,
              file: filename,
              ...getLoc(prop),
              suggestion: `Add lineHeight: '${expected}'`
            });
          } else if (lhValue !== expected) {
            violations.push({
              kind: 'wrong-line-height',
              message: `fontSize "${value}" should pair with lineHeight "${expected}", not "${lhValue}"`,
              file: filename,
              ...getLoc(lhProp.value),
              value: lhValue,
              suggestion: `Use lineHeight: '${expected}'`
            });
          }
        }
      }
    }
  });

  // Dedupe violations by file:line:column:kind
  const seen = new Set<string>();
  return violations.filter((v) => {
    const key = `${v.file}:${v.line}:${v.column ?? 0}:${v.kind}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function validateFile(filePath: string): Violation[] {
  const code = fs.readFileSync(filePath, 'utf-8');
  return scanAst(code, path.relative(process.cwd(), filePath));
}

export async function validateDirectory(
  dir: string,
  pattern: string = '**/*.{js,jsx,ts,tsx}'
): Promise<ValidationResult> {
  const cwd = path.resolve(process.cwd(), dir);
  const files = await glob(pattern, { cwd, absolute: true });
  const violations: Violation[] = [];

  for (const f of files) {
    const code = fs.readFileSync(f, 'utf-8');
    violations.push(...scanAst(code, path.relative(cwd, f)));
  }

  return {
    ok: violations.length === 0,
    violations,
    filesScanned: files.length
  };
}
