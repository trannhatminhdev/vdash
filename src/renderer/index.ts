/**
 * Renderer barrel — public API for the rendering layer.
 *
 * Usage:
 *   import { renderDashboard } from 'dashcraft/renderer';
 *   renderDashboard(container, dashboardJSON);
 */

// Side-effect: register all custom elements
import './components/vdash-dashboard';

export { VdashDashboard } from './components/vdash-dashboard';
export { VdashRoot } from './components/vdash-root';
export { VdashRow } from './components/vdash-row';
export { VdashCol } from './components/vdash-col';
export { VdashChart } from './components/vdash-chart';
export { VdashMarkdown } from './components/vdash-markdown';
export { VdashDivider } from './components/vdash-divider';

import type { DashboardDSL } from '../types';
import type { VdashDashboard } from './components/vdash-dashboard';

/**
 * Mount a dashboard into a container element.
 *
 * @param container — The DOM element to render into.
 * @param config    — The dashboard DSL JSON object.
 * @returns         — The created `<vdash-dashboard>` element.
 *
 * @example
 *   import { renderDashboard } from 'dashcraft/renderer';
 *
 *   const json = await fetch('/api/dashboard.json').then(r => r.json());
 *   renderDashboard(document.getElementById('app')!, json);
 */
export function renderDashboard(
  container: HTMLElement,
  config: DashboardDSL,
): VdashDashboard {
  const el = document.createElement('vdash-dashboard') as VdashDashboard;
  el.config = config;
  container.innerHTML = '';
  container.appendChild(el);
  return el;
}

/**
 * Update an existing dashboard with new config.
 */
export function updateDashboard(
  el: VdashDashboard,
  config: DashboardDSL,
): void {
  el.config = config;
}
