/**
 * Row Widget — handles the ROW node (horizontal grouping of columns).
 */

import type { RowNode, WidgetBuildResult } from '../../types';
import { NODE_TYPES } from '../../types';
import { BaseWidget } from '../base';

export class RowWidget extends BaseWidget<RowNode> {
  readonly type = NODE_TYPES.ROW;

  build(node: RowNode): WidgetBuildResult {
    return {
      success: true,
      output: {
        id: node.id,
        type: node.type,
        style: node.style,
        childCount: node.children.length,
      },
    };
  }
}
