/**
 * Root Widget — handles the ROOT node (top-level layout container).
 */

import type { RootNode, WidgetBuildResult } from '../../types';
import { NODE_TYPES } from '../../types';
import { BaseWidget } from '../base';

export class RootWidget extends BaseWidget<RootNode> {
  readonly type = NODE_TYPES.ROOT;

  build(node: RootNode): WidgetBuildResult {
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
