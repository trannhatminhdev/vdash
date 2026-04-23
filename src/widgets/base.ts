/**
 * Base Widget — abstract base that all widget handlers extend.
 * Provides shared scaffolding so individual widgets only override what they need.
 */

import type {
  DashboardNode,
  NodeType,
  WidgetHandler,
  WidgetValidationResult,
  WidgetBuildResult,
} from '../types';

export abstract class BaseWidget<T extends DashboardNode = DashboardNode>
  implements WidgetHandler<T>
{
  abstract readonly type: NodeType;

  /**
   * Default validation — passes everything.
   * Override in subclasses to add widget-specific rules.
   */
  validate(node: T): WidgetValidationResult {
    return { valid: true, errors: [] };
  }

  /**
   * Build must be implemented by every widget.
   */
  abstract build(node: T): WidgetBuildResult;
}
