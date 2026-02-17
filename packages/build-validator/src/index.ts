/**
 * @inversestudio/build-validator
 * Scans built JS/JSX files for Figma design system violations.
 * Use in CI or pre-publish to fail builds on violations.
 */

import { validateFile, validateDirectory } from './scanner.js';
import type { ValidationResult, Violation } from './types.js';

export { validateFile, validateDirectory };
export type { ValidationResult, Violation };
