/**
 * Validation error codes and structured error types.
 * Used by both schema-validator and semantic-validator.
 */

export const ERROR_CODES = {
  // Parser errors
  INVALID_JSON: 'INVALID_JSON',

  // Schema validation errors
  SCHEMA_VIOLATION: 'SCHEMA_VIOLATION',

  // Semantic validation errors
  DUPLICATE_ID: 'DUPLICATE_ID',
  INVALID_NODE_ID_FORMAT: 'INVALID_NODE_ID_FORMAT',
  EMPTY_CHILDREN: 'EMPTY_CHILDREN',
  INVALID_HIERARCHY: 'INVALID_HIERARCHY',
  COL_WIDTH_OVERFLOW: 'COL_WIDTH_OVERFLOW',
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export interface ValidationError {
  code: ErrorCode;
  message: string;
  /** JSON pointer to the offending location (e.g. "/layout/children/0/id"). */
  path?: string;
  /** The node ID if available. */
  nodeId?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

/** Create a validation error helper. */
export function createError(
  code: ErrorCode,
  message: string,
  path?: string,
  nodeId?: string,
): ValidationError {
  return { code, message, ...(path && { path }), ...(nodeId && { nodeId }) };
}
