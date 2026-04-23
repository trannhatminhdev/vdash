/**
 * <vdash-row> — Row web component.
 * Renders a flex row that wraps columns horizontally.
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../styles/theme';

@customElement('vdash-row')
export class VdashRow extends LitElement {
  @property({ type: String }) background = '';

  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .row {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -8px;
        width: calc(100% + 16px);
      }
    `,
  ];

  override updated(): void {
    if (this.background) {
      this.style.setProperty('background', this.background);
    }
  }

  override render() {
    return html`
      <div class="row">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vdash-row': VdashRow;
  }
}
