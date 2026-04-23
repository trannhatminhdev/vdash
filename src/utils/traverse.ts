/**
 * Generic tree traversal helpers for the dashboard node tree.
 */

import type { DashboardNode } from '../types';

type AnyNode = Record<string, unknown>;

/**
 * Depth-first traversal of the dashboard tree.
 * Calls `visitor` on every node, passing the node and its depth (0-based).
 */
export function walkTree(
  node: AnyNode,
  visitor: (node: AnyNode, depth: number) => void,
  depth = 0,
): void {
  visitor(node, depth);

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      walkTree(child as AnyNode, visitor, depth + 1);
    }
  }
}

/**
 * Find all nodes matching a predicate.
 */
export function findNodes(
  root: AnyNode,
  predicate: (node: AnyNode) => boolean,
): AnyNode[] {
  const result: AnyNode[] = [];
  walkTree(root, (node) => {
    if (predicate(node)) {
      result.push(node);
    }
  });
  return result;
}

/**
 * Count total nodes in the tree.
 */
export function countNodes(root: AnyNode): number {
  let count = 0;
  walkTree(root, () => { count++; });
  return count;
}
