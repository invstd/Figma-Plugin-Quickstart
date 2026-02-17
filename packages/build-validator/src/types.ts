export type ViolationKind =
  | 'hardcoded-color'
  | 'missing-line-height'
  | 'wrong-line-height'
  | 'invalid-spacing'
  | 'semantic-pairing';

export interface Violation {
  kind: ViolationKind;
  message: string;
  file: string;
  line: number;
  column?: number;
  value?: string;
  suggestion?: string;
}

export interface ValidationResult {
  ok: boolean;
  violations: Violation[];
  filesScanned: number;
}
