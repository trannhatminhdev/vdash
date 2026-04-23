/**
 * Divider Widget — handles the DIVIDER node (visual separator).
 */

import type { DividerNode, WidgetBuildResult } from '../../types';
import { NODE_TYPES } from '../../types';
import { BaseWidget } from '../base';

export class DividerWidget extends BaseWidget<DividerNode> {
  readonly type = NODE_TYPES.DIVIDER;

  build(node: DividerNode): WidgetBuildResult {
    return {
      success: true,
      output: {
        id: node.id,
        type: node.type,
      },
    };
  }
}
