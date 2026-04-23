/**
 * Validator module — combines schema + semantic validation into a single pipeline.
 */

export { validateSchema } from './schema-validator';
export { validateSemantics } from './semantic-validator';
export { ERROR_CODES, createError } from './errors';
export type { ValidationResult, ValidationError, ErrorCode } from './errors';

import type { ValidationResult } from './errors';
import { validateSchema } from './schema-validator';
import { validateSemantics } from './semantic-validator';

/**
 * Full validation pipeline: schema check → semantic check.
 * Short-circuits on schema failure.
 */
export function validate(data: unknown): ValidationResult {
  // Step 1: Schema validation
  const schemaResult = validateSchema(data);
  if (!schemaResult.valid) {
    return schemaResult;
  }

  // Step 2: Semantic validation
  const semanticResult = validateSemantics(data as Record<string, unknown>);
  return {
    valid: semanticResult.valid,
    errors: [...schemaResult.errors, ...semanticResult.errors],
  };
}
