/**
 * <vdash-divider> — Visual separator web component.
 * Renders a horizontal divider line with subtle gradient accent.
 */

import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { baseStyles } from '../styles/theme';

@customElement('vdash-divider')
export class VdashDivider extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        padding: 12px 0;
      }

      .divider {
        height: 1px;
        border: none;
        background: linear-gradient(
          90deg,
          transparent 0%,
          var(--vdash-border-color, rgba(255, 255, 255, 0.06)) 15%,
          var(--vdash-accent, #6c63ff) 50%,
          var(--vdash-border-color, rgba(255, 255, 255, 0.06)) 85%,
          transparent 100%
        );
        opacity: 0.5;
        transition: opacity var(--vdash-transition, 0.25s ease);
      }

      :host(:hover) .divider {
        opacity: 0.9;
      }
    `,
  ];

  override render() {
    return html`<hr class="divider" />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vdash-divider': VdashDivider;
  }
}
