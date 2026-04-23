/**
 * Widgets barrel — exports all widget classes and provides auto-registration.
 */

export { BaseWidget } from './base';
export { RootWidget } from './root';
export { RowWidget } from './row';
export { ColWidget } from './col';
export { ChartWidget } from './chart';
export { MarkdownWidget } from './markdown';
export { DividerWidget } from './divider';

import { registerWidget } from '../core/registry';
import { RootWidget } from './root';
import { RowWidget } from './row';
import { ColWidget } from './col';
import { ChartWidget } from './chart';
import { MarkdownWidget } from './markdown';
import { DividerWidget } from './divider';

/**
 * Register all built-in widgets with the registry.
 * Call once at application startup.
 */
export function registerBuiltinWidgets(): void {
  const widgets = [
    new RootWidget(),
    new RowWidget(),
    new ColWidget(),
    new ChartWidget(),
    new MarkdownWidget(),
    new DividerWidget(),
  ];

  for (const widget of widgets) {
    registerWidget(widget);
  }
}
