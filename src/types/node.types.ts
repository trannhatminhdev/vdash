/**
 * Node type definitions — each interface maps 1:1 to a node in the DSL JSON Schema.
 */

import type { ResponsiveWidth, ResponsiveHeight } from './responsive.types';

// ─── Node type discriminators ────────────────────────────────────────────────

export const NODE_TYPES = {
  ROOT: 'ROOT',
  ROW: 'ROW',
  COL: 'COL',
  CHART: 'CHART',
  MARKDOWN: 'MARKDOWN',
  DIVIDER: 'DIVIDER',
} as const;

export type NodeType = (typeof NODE_TYPES)[keyof typeof NODE_TYPES];

// ─── Style ───────────────────────────────────────────────────────────────────

export interface NodeStyle {
  background: string;
  [key: string]: unknown;
}

// ─── Layout nodes (structural) ───────────────────────────────────────────────

export interface RootNode {
  id: string;
  type: typeof NODE_TYPES.ROOT;
  style: NodeStyle;
  children: RowNode[];
}

export interface RowNode {
  id: string;
  type: typeof NODE_TYPES.ROW;
  style: NodeStyle;
  children: ColNode[];
}

export interface ColNode {
  id: string;
  type: typeof NODE_TYPES.COL;
  width: ResponsiveWidth;
  height: ResponsiveHeight;
  style: NodeStyle;
  children: ContentNode[];
}

// ─── Content nodes (leaf-level) ──────────────────────────────────────────────

export interface ChartNode {
  id: string;
  type: typeof NODE_TYPES.CHART;
  chartId: number;
  title: string;
  description: string;
}

export interface MarkdownNode {
  id: string;
  type: typeof NODE_TYPES.MARKDOWN;
  content: string;
}

export interface DividerNode {
  id: string;
  type: typeof NODE_TYPES.DIVIDER;
}

// ─── Union types ─────────────────────────────────────────────────────────────

export type ContentNode = ChartNode | MarkdownNode | DividerNode;

export type LayoutNode = RootNode | RowNode | ColNode;

/** Any node in the dashboard tree. */
export type DashboardNode = LayoutNode | ContentNode;
