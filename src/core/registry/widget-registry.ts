/**
 * Widget Registry — maps node type strings to their widget handlers.
 *
 * This is the core dispatching mechanism: when the builder encounters
 * a node with `type: "CHART"`, the registry resolves the matching handler.
 */

import type { NodeType } from '../../types';
import type { WidgetHandler } from '../../types';

const handlers = new Map<NodeType, WidgetHandler>();

/**
 * Register a widget handler for a node type.
 * @throws if a handler is already registered for the given type.
 */
export function registerWidget(handler: WidgetHandler): void {
  if (handlers.has(handler.type)) {
    throw new Error(`Widget handler already registered for type: "${handler.type}"`);
  }
  handlers.set(handler.type, handler);
}

/**
 * Look up the handler for a node type.
 * @returns the handler, or `undefined` if none registered.
 */
export function getWidgetHandler(type: NodeType): WidgetHandler | undefined {
  return handlers.get(type);
}

/**
 * Check if a handler exists for the given type.
 */
export function hasWidgetHandler(type: NodeType): boolean {
  return handlers.has(type);
}

/**
 * Get all registered node types.
 */
export function getRegisteredTypes(): NodeType[] {
  return Array.from(handlers.keys());
}

/**
 * Clear all registered handlers (useful for testing).
 */
export function clearRegistry(): void {
  handlers.clear();
}
