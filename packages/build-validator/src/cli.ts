#!/usr/bin/env node
/**
 * CLI for figma-validate-build
 * Usage: figma-validate-build [dir] [options]
 */

import * as path from 'path';
import { validateDirectory } from './scanner.js';

const dir = process.argv[2] || 'dist';
const pattern = process.argv.includes('--ts')
  ? '**/*.{js,jsx,ts,tsx}'
  : '**/*.js'; // Include all JS files

async function main() {
  const result = await validateDirectory(dir, pattern);

  if (result.violations.length === 0) {
    console.log(`✓ No design system violations (scanned ${result.filesScanned} files)`);
    process.exit(0);
  }

  console.error(`\n✗ ${result.violations.length} design system violation(s) in ${result.filesScanned} files:\n`);
  for (const v of result.violations) {
    const loc = v.column ? `${v.file}:${v.line}:${v.column}` : `${v.file}:${v.line}`;
    console.error(`  ${loc} [${v.kind}] ${v.message}`);
    if (v.suggestion) console.error(`    → ${v.suggestion}`);
  }
  console.error('');
  process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
