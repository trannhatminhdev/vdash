/**
 * Markdown Widget — handles the MARKDOWN node (rich text content).
 */

import type { MarkdownNode, WidgetBuildResult, WidgetValidationResult } from '../../types';
import { NODE_TYPES } from '../../types';
import { BaseWidget } from '../base';

export class MarkdownWidget extends BaseWidget<MarkdownNode> {
  readonly type = NODE_TYPES.MARKDOWN;

  validate(node: MarkdownNode): WidgetValidationResult {
    const errors = [];

    if (!node.content || node.content.trim().length === 0) {
      errors.push({
        nodeId: node.id,
        field: 'content',
        message: 'Markdown content cannot be empty',
      });
    }

    return { valid: errors.length === 0, errors };
  }

  build(node: MarkdownNode): WidgetBuildResult {
    return {
      success: true,
      output: {
        id: node.id,
        type: node.type,
        content: node.content,
      },
    };
  }
}
