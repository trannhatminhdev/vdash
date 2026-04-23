/**
 * Chart Widget — handles the CHART node (data visualization placeholder).
 */

import type { ChartNode, WidgetBuildResult, WidgetValidationResult } from '../../types';
import { NODE_TYPES } from '../../types';
import { BaseWidget } from '../base';

export class ChartWidget extends BaseWidget<ChartNode> {
  readonly type = NODE_TYPES.CHART;

  validate(node: ChartNode): WidgetValidationResult {
    const errors = [];

    if (node.chartId <= 0) {
      errors.push({
        nodeId: node.id,
        field: 'chartId',
        message: `chartId must be a positive integer, got ${node.chartId}`,
      });
    }

    return { valid: errors.length === 0, errors };
  }

  build(node: ChartNode): WidgetBuildResult {
    return {
      success: true,
      output: {
        id: node.id,
        type: node.type,
        chartId: node.chartId,
        title: node.title,
        description: node.description,
      },
    };
  }
}
