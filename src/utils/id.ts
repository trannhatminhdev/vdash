/**
 * ID generation and validation utilities.
 * Follows the DSL convention: `{TYPE}-{nanoid}` (e.g. "ROW-psBLWR8EgBF0MXfsAUoMa").
 */

import type { NodeType } from '../types';

/**
 * Generate a prefixed unique ID for a node.
 * @example generateNodeId('CHART') → "CHART-x7Kp2mQ9rLw3"
 */
export function generateNodeId(type: NodeType): string {
  const random = crypto.getRandomValues(new Uint8Array(16));
  const id = Array.from(random, (b) => b.toString(36).padStart(2, '0'))
    .join('')
    .slice(0, 21);
  return `${type}-${id}`;
}

/**
 * Check whether a node ID matches the expected `{TYPE}-{random}` pattern.
 */
export function isValidNodeId(id: string): boolean {
  return /^[A-Z_]+-[a-z0-9_-]+$/i.test(id) && id.length > 2;
}

/**
 * Collect all node IDs from a tree, detecting duplicates.
 * Returns the set of IDs and any duplicates found.
 */
export function collectIds(
  node: Record<string, unknown>,
): { ids: Set<string>; duplicates: string[] } {
  const ids = new Set<string>();
  const duplicates: string[] = [];

  function walk(n: Record<string, unknown>) {
    if (typeof n.id === 'string') {
      if (ids.has(n.id)) {
        duplicates.push(n.id);
      }
      ids.add(n.id);
    }
    if (Array.isArray(n.children)) {
      for (const child of n.children) {
        walk(child as Record<string, unknown>);
      }
    }
  }

  walk(node);
  return { ids, duplicates };
}
