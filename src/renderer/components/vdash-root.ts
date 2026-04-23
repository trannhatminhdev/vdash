/**
 * <vdash-root> — Root layout web component.
 * Top-level container that holds all rows.
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../styles/theme';

@customElement('vdash-root')
export class VdashRoot extends LitElement {
  @property({ type: String }) background = '';

  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        width: 100%;
        min-height: 100%;
      }

      .root {
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;
        padding: 16px;
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
      <div class="root">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vdash-root': VdashRoot;
  }
}
