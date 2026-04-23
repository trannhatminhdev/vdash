/**
 * Tree Builder — traverses a validated dashboard tree and delegates
 * each node to its registered widget handler for rendering.
 */

import type { DashboardDSL } from '../../types';
import { getWidgetHandler } from '../registry';
import { walkTree } from '../../utils/traverse';

export interface BuildResult {
  success: boolean;
  outputs: Map<string, unknown>;
  errors: string[];
}

/**
 * Build the dashboard from a validated DSL object.
 * Walks every node and invokes the registered widget handler's `build()`.
 */
export function buildDashboard(dsl: DashboardDSL): BuildResult {
  const outputs = new Map<string, unknown>();
  const errors: string[] = [];

  walkTree(dsl.layout as unknown as Record<string, unknown>, (node) => {
    const type = node.type as string;
    const id = node.id as string;

    const handler = getWidgetHandler(type as any);
    if (!handler) {
      errors.push(`No widget handler registered for type: "${type}" (node: ${id})`);
      return;
    }

    const result = handler.build(node as any);
    if (result.success) {
      outputs.set(id, result.output);
    } else {
      errors.push(`Build failed for node "${id}" (type: ${type})`);
    }
  });

  return {
    success: errors.length === 0,
    outputs,
    errors,
  };
}
