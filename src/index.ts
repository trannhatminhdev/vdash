/**
 * DashCraft — Public API
 *
 * JSON-driven dashboard generator with schema validation.
 * Provides schema for LLMs to generate dashboard configurations.
 */

// ─── Types ───────────────────────────────────────────────────────────────────
export type {
  // DSL document
  DashboardDSL,
  DashboardMeta,
  Theme,
  // Nodes
  RootNode,
  RowNode,
  ColNode,
  ChartNode,
  MarkdownNode,
  DividerNode,
  ContentNode,
  LayoutNode,
  DashboardNode,
  NodeType,
  NodeStyle,
  // Responsive
  ResponsiveWidth,
  ResponsiveHeight,
  Breakpoint,
  // Widget system
  WidgetHandler,
  WidgetValidationResult,
  WidgetValidationError,
  WidgetBuildResult,
} from './types';

export { NODE_TYPES } from './types';

// ─── Core: Parser ────────────────────────────────────────────────────────────
export { parse } from './core/parser';
export type { ParseResult } from './core/parser';

// ─── Core: Validator ─────────────────────────────────────────────────────────
export { validate, validateSchema, validateSemantics, ERROR_CODES } from './core/validator';
export type { ValidationResult, ValidationError, ErrorCode } from './core/validator';

// ─── Core: Registry ──────────────────────────────────────────────────────────
export {
  registerWidget,
  getWidgetHandler,
  hasWidgetHandler,
  getRegisteredTypes,
} from './core/registry';

// ─── Core: Builder ───────────────────────────────────────────────────────────
export { buildDashboard } from './core/builder';
export type { BuildResult } from './core/builder';

// ─── Core: Schema ────────────────────────────────────────────────────────────
export { getDSLSchema, getDSLSchemaString } from './core/schema';

// ─── Widgets ─────────────────────────────────────────────────────────────────
export { registerBuiltinWidgets } from './widgets';

// ─── Utils ───────────────────────────────────────────────────────────────────
export { generateNodeId, isValidNodeId, walkTree, findNodes, countNodes } from './utils';

// ─── Renderer (Lit Web Components) ───────────────────────────────────────────
export {
  renderDashboard,
  updateDashboard,
  VdashDashboard,
  VdashRoot,
  VdashRow,
  VdashCol,
  VdashChart,
  VdashMarkdown,
  VdashDivider,
} from './renderer';
