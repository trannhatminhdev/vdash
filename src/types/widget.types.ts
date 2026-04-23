/**
 * Widget system types — defines the contract every widget must implement.
 */

import type { DashboardNode, NodeType } from './node.types';

/** The interface every widget handler must implement. */
export interface WidgetHandler<T extends DashboardNode = DashboardNode> {
  /** The node type this widget handles (e.g. "CHART", "ROW"). */
  readonly type: NodeType;

  /** Validate node-specific business rules beyond JSON Schema. */
  validate(node: T): WidgetValidationResult;

  /** Build / render the node into the target output format. */
  build(node: T): WidgetBuildResult;
}

export interface WidgetValidationResult {
  valid: boolean;
  errors: WidgetValidationError[];
}

export interface WidgetValidationError {
  nodeId: string;
  field?: string;
  message: string;
}

export interface WidgetBuildResult {
  success: boolean;
  output: unknown;
}
