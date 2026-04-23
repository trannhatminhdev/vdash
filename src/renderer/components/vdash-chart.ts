/**
 * <vdash-chart> — Chart placeholder web component.
 * Displays chart metadata with a stylish card.
 * In production, you would integrate a real charting library (ECharts, Chart.js, etc.).
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../styles/theme';

@customElement('vdash-chart')
export class VdashChart extends LitElement {
  @property({ type: Number, attribute: 'chart-id' }) chartId = 0;
  @property({ type: String }) title = '';
  @property({ type: String }) description = '';

  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        height: 100%;
      }

      .chart-card {
        height: 100%;
        display: flex;
        flex-direction: column;
        border-radius: var(--vdash-radius-sm, 8px);
        overflow: hidden;
        transition: transform var(--vdash-transition), box-shadow var(--vdash-transition);
      }

      /* ── Header ─────────────────────────────────── */
      .chart-header {
        padding: 16px 20px 12px;
        flex-shrink: 0;
      }

      .chart-title {
        font-size: 14px;
        font-weight: 600;
        color: var(--vdash-text-primary);
        margin: 0 0 4px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .chart-badge {
        font-size: 10px;
        font-weight: 500;
        color: var(--vdash-accent);
        background: var(--vdash-accent-glow);
        padding: 2px 8px;
        border-radius: 20px;
        letter-spacing: 0.5px;
        text-transform: uppercase;
      }

      .chart-description {
        font-size: 12px;
        color: var(--vdash-text-muted);
        margin: 0;
        line-height: 1.5;
      }

      /* ── Chart Area ─────────────────────────────── */
      .chart-area {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
        position: relative;
        overflow: hidden;
        min-height: 120px;
      }

      /* Decorative animated bars */
      .chart-bars {
        display: flex;
        align-items: flex-end;
        gap: 6px;
        height: 80px;
      }

      .chart-bar {
        width: 18px;
        border-radius: 4px 4px 0 0;
        background: linear-gradient(180deg, var(--vdash-accent), var(--vdash-accent-secondary));
        opacity: 0.7;
        animation: barGrow 1.5s ease-out forwards;
        transform-origin: bottom;
      }

      .chart-bar:nth-child(1) { height: 45%; animation-delay: 0s; }
      .chart-bar:nth-child(2) { height: 75%; animation-delay: 0.1s; }
      .chart-bar:nth-child(3) { height: 55%; animation-delay: 0.2s; }
      .chart-bar:nth-child(4) { height: 90%; animation-delay: 0.3s; }
      .chart-bar:nth-child(5) { height: 65%; animation-delay: 0.4s; }
      .chart-bar:nth-child(6) { height: 80%; animation-delay: 0.5s; }
      .chart-bar:nth-child(7) { height: 50%; animation-delay: 0.6s; }

      @keyframes barGrow {
        from {
          transform: scaleY(0);
          opacity: 0;
        }
        to {
          transform: scaleY(1);
          opacity: 0.7;
        }
      }

      .chart-id-label {
        margin-top: 12px;
        font-size: 11px;
        color: var(--vdash-text-muted);
        letter-spacing: 0.5px;
      }

      /* Slot for custom chart content */
      ::slotted(*) {
        width: 100%;
        height: 100%;
      }
    `,
  ];

  override render() {
    return html`
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">
            ${this.title || 'Untitled Chart'}
            <span class="chart-badge">chart #${this.chartId}</span>
          </h3>
          ${this.description
            ? html`<p class="chart-description">${this.description}</p>`
            : ''}
        </div>
        <div class="chart-area">
          <slot>
            <!-- Default: animated bar chart placeholder -->
            <div class="chart-bars">
              <div class="chart-bar"></div>
              <div class="chart-bar"></div>
              <div class="chart-bar"></div>
              <div class="chart-bar"></div>
              <div class="chart-bar"></div>
              <div class="chart-bar"></div>
              <div class="chart-bar"></div>
            </div>
            <span class="chart-id-label">chartId: ${this.chartId}</span>
          </slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vdash-chart': VdashChart;
  }
}
