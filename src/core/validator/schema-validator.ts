/**
 * Schema Validator — validates raw JSON against the DSL JSON Schema (draft 2020-12).
 *
 * This is the first validation gate. It ensures the LLM output structurally
 * conforms to the dashboard schema before any semantic checks.
 *
 * TODO: Integrate a JSON Schema validator library (e.g. ajv) for runtime validation.
 */

import type { ValidationResult } from './errors';
import { ERROR_CODES, createError } from './errors';

/**
 * Validate a parsed JSON object against the dashboard JSON Schema.
 *
 * @param data - The parsed JSON object to validate.
 * @returns Validation result with any schema violation errors.
 */
export function validateSchema(data: unknown): ValidationResult {
  const errors = [];

  // Basic structural checks (pre-ajv placeholder)
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    return {
      valid: false,
      errors: [createError(ERROR_CODES.SCHEMA_VIOLATION, 'Root must be an object')],
    };
  }

  const obj = data as Record<string, unknown>;

  // Check required top-level fields
  const requiredFields = ['version', 'kind', 'uuid', 'meta', 'layout'];
  for (const field of requiredFields) {
    if (!(field in obj)) {
      errors.push(
        createError(
          ERROR_CODES.SCHEMA_VIOLATION,
          `Missing required field: "${field}"`,
          `/${field}`,
        ),
      );
    }
  }

  if (obj.kind !== 'dashboard') {
    errors.push(
      createError(ERROR_CODES.SCHEMA_VIOLATION, `"kind" must be "dashboard"`, '/kind'),
    );
  }

  return { valid: errors.length === 0, errors };
}
