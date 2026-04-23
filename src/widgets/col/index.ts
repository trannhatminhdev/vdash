/**
 * Col Widget — handles the COL node (responsive column with width/height).
 */

import type { ColNode, WidgetBuildResult, WidgetValidationResult } from '../../types';
import { NODE_TYPES } from '../../types';
import { BaseWidget } from '../base';

export class ColWidget extends BaseWidget<ColNode> {
  readonly type = NODE_TYPES.COL;

  validate(node: ColNode): WidgetValidationResult {
    const errors = [];

    // Width xs must be between 1-12
    if (node.width.xs < 1 || node.width.xs > 12) {
      errors.push({
        nodeId: node.id,
        field: 'width.xs',
        message: `Column width.xs must be between 1 and 12, got ${node.width.xs}`,
      });
    }

    return { valid: errors.length === 0, errors };
  }

  build(node: ColNode): WidgetBuildResult {
    return {
      success: true,
      output: {
        id: node.id,
        type: node.type,
        width: node.width,
        height: node.height,
        style: node.style,
        childCount: node.children.length,
      },
    };
  }
}
