/**
 * <vdash-dashboard> — The top-level dashboard web component.
 *
 * Usage:
 *   <vdash-dashboard .config=${dashboardJSON}></vdash-dashboard>
 *   // or
 *   const el = document.createElement('vdash-dashboard');
 *   el.config = dashboardJSON;
 *   document.body.appendChild(el);
 *
 * This component:
 *   1. Accepts a DashboardDSL JSON object via the `config` property.
 *   2. Validates it using the core validator.
 *   3. Recursively renders the layout tree into Lit web components.
 *   4. Applies the correct theme (dark / light).
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles, darkTheme, lightTheme } from '../styles/theme';
import type {
  DashboardDSL,
  RootNode,
  RowNode,
  ColNode,
  ChartNode,
  MarkdownNode,
  DividerNode,
  ContentNode,
  DashboardNode,
} from '../../types';

// Side-effect imports — register child custom elements.
import './vdash-root';
import './vdash-row';
import './vdash-col';
import './vdash-chart';
import './vdash-markdown';
import './vdash-divider';

@customElement('vdash-dashboard')
export class VdashDashboard extends LitElement {
  /**
   * The dashboard configuration object (DashboardDSL JSON).
   * Set this property to render the dashboard.
   */
  @property({ type: Object }) config: DashboardDSL | null = null;

  /** Validation errors (read-only, published for host app). */
  @state() private _errors: string[] = [];

  static override styles = [
    baseStyles,
    darkTheme,
    css`
      :host {
        display: block;
        background: var(--vdash-bg-primary);
        color: var(--vdash-text-primary);
        min-height: 100%;
        overflow-x: hidden;
      }

      /* ── Dashboard header ─────────────────────── */
      .dashboard-header {
        padding: 32px 24px 24px;
        max-width: 1400px;
        margin: 0 auto;
      }

      .dashboard-title {
        font-size: 24px;
        font-weight: 700;
        margin: 0 0 6px;
        background: linear-gradient(135deg, var(--vdash-text-primary), var(--vdash-accent));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .dashboard-description {
        font-size: 13px;
        color: var(--vdash-text-muted);
        margin: 0;
      }

      /* ── Error panel ──────────────────────────── */
      .error-panel {
        max-width: 1400px;
        margin: 16px auto;
        padding: 16px 24px;
        background: rgba(248, 113, 113, 0.08);
        border: 1px solid var(--vdash-error);
        border-radius: var(--vdash-radius-sm);
        color: var(--vdash-error);
        font-size: 13px;
      }

      .error-panel h4 {
        margin: 0 0 8px;
        font-size: 14px;
      }

      .error-panel ul {
        margin: 0;
        padding-left: 20px;
      }

      .error-panel li {
        margin: 4px 0;
      }

      /* ── Empty state ──────────────────────────── */
      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 80px 24px;
        text-align: center;
      }

      .empty-icon {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: var(--vdash-accent-glow);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 16px;
        font-size: 28px;
      }

      .empty-title {
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 8px;
        color: var(--vdash-text-primary);
      }

      .empty-subtitle {
        font-size: 13px;
        color: var(--vdash-text-muted);
        margin: 0;
        max-width: 360px;
      }
    `,
  ];

  override willUpdate(changedProps: Map<string, unknown>): void {
    if (changedProps.has('config')) {
      this._applyTheme();
      this._validate();
    }
  }

  /** Apply the correct theme class based on `config.meta.theme`. */
  private _applyTheme(): void {
    if (!this.config) return;
    const isDark = this.config.meta.theme !== 'light';
    // Swap stylesheets: we replace the theme in adoptedStyleSheets
    const themeSheet = isDark ? darkTheme : lightTheme;
    // Rebuild styles array
    (this.constructor as typeof VdashDashboard).styles = [baseStyles, themeSheet, (this.constructor as typeof VdashDashboard).styles![2]];
    // Force a style re-apply by toggling attribute
    this.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }

  /** Run lightweight validation and populate _errors. */
  private _validate(): void {
    this._errors = [];
    if (!this.config) return;

    if (this.config.kind !== 'dashboard') {
      this._errors.push('"kind" must be "dashboard"');
    }
    if (!this.config.layout) {
      this._errors.push('Missing "layout" object');
    }
  }

  // ─── Recursive renderers ──────────────────────────────────────────────────

  private _renderRoot(root: RootNode) {
    return html`
      <vdash-root background=${root.style?.background || ''}>
        ${root.children.map((row) => this._renderRow(row))}
      </vdash-root>
    `;
  }

  private _renderRow(row: RowNode) {
    return html`
      <vdash-row background=${row.style?.background || ''}>
        ${row.children.map((col) => this._renderCol(col))}
      </vdash-row>
    `;
  }

  private _renderCol(col: ColNode) {
    return html`
      <vdash-col
        col-xs=${col.width.xs}
        col-sm=${col.width.sm ?? nothing}
        col-md=${col.width.md ?? nothing}
        col-lg=${col.width.lg ?? nothing}
        col-xl=${col.width.xl ?? nothing}
        col-xxl=${col.width.xxl ?? nothing}
        height-xs=${col.height.xs}
        height-sm=${col.height.sm ?? nothing}
        height-md=${col.height.md ?? nothing}
        height-lg=${col.height.lg ?? nothing}
        height-xl=${col.height.xl ?? nothing}
        height-xxl=${col.height.xxl ?? nothing}
        background=${col.style?.background || ''}
      >
        ${col.children.map((child) => this._renderContent(child))}
      </vdash-col>
    `;
  }

  private _renderContent(node: ContentNode) {
    switch (node.type) {
      case 'CHART':
        return this._renderChart(node as ChartNode);
      case 'MARKDOWN':
        return this._renderMarkdownNode(node as MarkdownNode);
      case 'DIVIDER':
        return html`<vdash-divider></vdash-divider>`;
      default:
        return html`<div style="padding:12px;color:var(--vdash-warning)">Unknown node type: ${(node as any).type}</div>`;
    }
  }

  private _renderChart(chart: ChartNode) {
    return html`
      <vdash-chart
        chart-id=${chart.chartId}
        title=${chart.title}
        description=${chart.description}
      ></vdash-chart>
    `;
  }

  private _renderMarkdownNode(md: MarkdownNode) {
    return html`<vdash-markdown .content=${md.content}></vdash-markdown>`;
  }

  // ─── Main render ──────────────────────────────────────────────────────────

  override render() {
    // Empty state
    if (!this.config) {
      return html`
        <div class="empty-state">
          <div class="empty-icon">📊</div>
          <h2 class="empty-title">No Dashboard Loaded</h2>
          <p class="empty-subtitle">
            Pass a DashboardDSL JSON object via the <code>config</code> property to render your dashboard.
          </p>
        </div>
      `;
    }

    // Error state
    if (this._errors.length > 0) {
      return html`
        <div class="error-panel">
          <h4>⚠ Validation Errors</h4>
          <ul>
            ${this._errors.map((e) => html`<li>${e}</li>`)}
          </ul>
        </div>
      `;
    }

    // Render dashboard
    return html`
      <div class="dashboard-header">
        <h1 class="dashboard-title">${this.config.meta.title}</h1>
        ${this.config.meta.description
          ? html`<p class="dashboard-description">${this.config.meta.description}</p>`
          : ''}
      </div>
      ${this._renderRoot(this.config.layout)}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vdash-dashboard': VdashDashboard;
  }
}
