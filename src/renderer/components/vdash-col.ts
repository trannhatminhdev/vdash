/**
 * <vdash-col> — Responsive column web component.
 * Maps DSL `ColNode` to a CSS 12-column grid cell with responsive width/height.
 */

import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { gridStyles } from "../styles/grid";
import { baseStyles } from "../styles/theme";

@customElement("vdash-col")
export class VdashCol extends LitElement {
  /* Responsive column span (1–12) per breakpoint */
  @property({ type: Number, attribute: "col-xs" }) colXs = 12;
  @property({ type: Number, attribute: "col-sm" }) colSm?: number;
  @property({ type: Number, attribute: "col-md" }) colMd?: number;
  @property({ type: Number, attribute: "col-lg" }) colLg?: number;
  @property({ type: Number, attribute: "col-xl" }) colXl?: number;
  @property({ type: Number, attribute: "col-xxl" }) colXxl?: number;

  /* Responsive height per breakpoint */
  @property({ type: String, attribute: "height-xs" }) heightXs = "auto";
  @property({ type: String, attribute: "height-sm" }) heightSm?: string;
  @property({ type: String, attribute: "height-md" }) heightMd?: string;
  @property({ type: String, attribute: "height-lg" }) heightLg?: string;
  @property({ type: String, attribute: "height-xl" }) heightXl?: string;
  @property({ type: String, attribute: "height-xxl" }) heightXxl?: string;

  /** Background override from DSL style. */
  @property({ type: String }) background = "";

  static override styles = [
    baseStyles,
    gridStyles,
    css`
      :host {
        padding: 8px;
      }

      .col-inner {
        height: 100%;
        background: var(--_col-bg, var(--vdash-bg-card));
        border: 1px solid var(--vdash-border-color);
        border-radius: var(--vdash-radius);
        box-shadow: var(--vdash-shadow-sm);
        overflow: hidden;
        transition:
          transform var(--vdash-transition),
          box-shadow var(--vdash-transition),
          border-color var(--vdash-transition);
        position: relative;
      }

      .col-inner::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: linear-gradient(
          135deg,
          var(--vdash-accent-glow) 0%,
          transparent 50%
        );
        opacity: 0;
        transition: opacity var(--vdash-transition);
        pointer-events: none;
      }

      :host(:hover) .col-inner {
        transform: translateY(-2px);
        box-shadow: var(--vdash-shadow);
        border-color: var(--vdash-accent);
      }

      :host(:hover) .col-inner::before {
        opacity: 1;
      }

      .col-content {
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: column;
      }
    `,
  ];

  override connectedCallback(): void {
    super.connectedCallback();
    this._applyResponsiveVars();
  }

  override updated(): void {
    this._applyResponsiveVars();
  }

  /** Push responsive CSS custom properties onto the host element. */
  private _applyResponsiveVars(): void {
    const s = this.style;
    s.setProperty("--vdash-col-xs", String(this.colXs));
    if (this.colSm != null) s.setProperty("--vdash-col-sm", String(this.colSm));
    if (this.colMd != null) s.setProperty("--vdash-col-md", String(this.colMd));
    if (this.colLg != null) s.setProperty("--vdash-col-lg", String(this.colLg));
    if (this.colXl != null) s.setProperty("--vdash-col-xl", String(this.colXl));
    if (this.colXxl != null) s.setProperty("--vdash-col-xxl", String(this.colXxl));

    s.setProperty("--vdash-height-xs", this.heightXs);
    if (this.heightSm) s.setProperty("--vdash-height-sm", this.heightSm);
    if (this.heightMd) s.setProperty("--vdash-height-md", this.heightMd);
    if (this.heightLg) s.setProperty("--vdash-height-lg", this.heightLg);
    if (this.heightXl) s.setProperty("--vdash-height-xl", this.heightXl);
    if (this.heightXxl) s.setProperty("--vdash-height-xxl", this.heightXxl);

    if (this.background) {
      s.setProperty("--_col-bg", this.background);
    }
  }

  override render() {
    return html`
      <div class="col-inner">
        <div class="col-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "vdash-col": VdashCol;
  }
}
