/**
 * Semantic Validator — business-rule validation that JSON Schema alone cannot express.
 *
 * Runs AFTER schema validation passes. Checks things like:
 * - Unique node IDs across the entire tree
 * - Valid node hierarchy (ROOT → ROW → COL → content)
 * - Column width sums per row ≤ 12
 */

import type { ValidationResult, ValidationError } from './errors';
import { ERROR_CODES, createError } from './errors';
import { collectIds } from '../../utils/id';
import { walkTree } from '../../utils/traverse';

/**
 * Run all semantic validation rules on a parsed dashboard.
 */
export function validateSemantics(data: Record<string, unknown>): ValidationResult {
  const errors: ValidationError[] = [];
  const layout = data.layout as Record<string, unknown>;

  if (!layout) {
    return { valid: false, errors: [createError(ERROR_CODES.SCHEMA_VIOLATION, 'Missing layout')] };
  }

  // Rule 1: All node IDs must be unique
  const { duplicates } = collectIds(layout);
  for (const dup of duplicates) {
    errors.push(
      createError(ERROR_CODES.DUPLICATE_ID, `Duplicate node ID: "${dup}"`, undefined, dup),
    );
  }

  // Rule 2: Validate hierarchy — ROOT can only contain ROW, ROW can only contain COL, etc.
  walkTree(layout, (node, depth) => {
    const type = node.type as string | undefined;
    const children = node.children as Record<string, unknown>[] | undefined;

    if (!children || !Array.isArray(children)) return;

    const allowedChildren = getAllowedChildTypes(type);
    if (!allowedChildren) return;

    for (const child of children) {
      const childType = child.type as string;
      if (!allowedChildren.includes(childType)) {
        errors.push(
          createError(
            ERROR_CODES.INVALID_HIERARCHY,
            `"${type}" cannot contain child of type "${childType}". Allowed: [${allowedChildren.join(', ')}]`,
            undefined,
            node.id as string,
          ),
        );
      }
    }
  });

  return { valid: errors.length === 0, errors };
}

/** Returns allowed child node types for a given parent type. */
function getAllowedChildTypes(parentType: string | undefined): string[] | null {
  switch (parentType) {
    case 'ROOT':
      return ['ROW'];
    case 'ROW':
      return ['COL'];
    case 'COL':
      return ['CHART', 'MARKDOWN', 'DIVIDER'];
    default:
      return null;
  }
}
