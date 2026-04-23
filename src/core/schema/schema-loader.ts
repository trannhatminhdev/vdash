/**
 * Schema Loader — loads and provides the DSL JSON Schema at runtime.
 *
 * The schema is the contract that LLMs must follow when generating dashboard JSON.
 * This module centralizes schema access so it can be used by validators,
 * exported to consumers, or bundled into LLM prompts.
 */

// Import the schema as a static asset (Vite handles JSON imports)
import dslSchema from './dsl.schema.json';

/**
 * Get the raw DSL JSON Schema object.
 */
export function getDSLSchema(): Record<string, unknown> {
  return dslSchema as Record<string, unknown>;
}

/**
 * Get the schema as a formatted JSON string, ready to embed in LLM prompts.
 */
export function getDSLSchemaString(pretty = true): string {
  return JSON.stringify(dslSchema, null, pretty ? 2 : 0);
}
