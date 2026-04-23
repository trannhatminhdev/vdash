/**
 * Parser — converts raw JSON string from LLM output into a validated JS object.
 */

import { ERROR_CODES, createError } from '../validator/errors';
import type { ValidationResult } from '../validator/errors';

export interface ParseResult {
  success: boolean;
  data: unknown;
  error?: string;
}

/**
 * Safely parse a raw JSON string.
 * Handles common LLM output issues like markdown code fences.
 */
export function parse(raw: string): ParseResult {
  // Strip markdown code fences that LLMs often wrap JSON in
  const cleaned = stripCodeFences(raw);

  try {
    const data = JSON.parse(cleaned);
    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      data: null,
      error: err instanceof Error ? err.message : 'Unknown parse error',
    };
  }
}

/**
 * Remove common markdown code fences (```json ... ```) that LLMs add.
 */
function stripCodeFences(input: string): string {
  const trimmed = input.trim();

  // Match ```json ... ``` or ``` ... ```
  const fenceRegex = /^```(?:json)?\s*\n?([\s\S]*?)\n?\s*```$/;
  const match = trimmed.match(fenceRegex);

  return match ? match[1].trim() : trimmed;
}
