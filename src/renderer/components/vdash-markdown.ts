/**
 * <vdash-markdown> — Markdown content web component.
 * Renders markdown string as styled HTML using `marked`.
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { marked } from 'marked';
import { baseStyles } from '../styles/theme';

@customElement('vdash-markdown')
export class VdashMarkdown extends LitElement {
  @property({ type: String }) content = '';

  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        padding: 16px 20px;
      }

      .markdown-body {
        color: var(--vdash-text-primary, #e4e6f0);
        line-height: 1.7;
        font-size: 14px;
      }

      .markdown-body h1 {
        font-size: 1.75em;
        font-weight: 700;
        margin: 0 0 0.6em;
        background: linear-gradient(135deg, var(--vdash-text-primary), var(--vdash-accent));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .markdown-body h2 {
        font-size: 1.4em;
        font-weight: 600;
        margin: 1.2em 0 0.5em;
        color: var(--vdash-text-primary);
      }

      .markdown-body h3 {
        font-size: 1.15em;
        font-weight: 600;
        margin: 1em 0 0.4em;
        color: var(--vdash-text-primary);
      }

      .markdown-body p {
        margin: 0.5em 0;
        color: var(--vdash-text-secondary, #8b8fa3);
      }

      .markdown-body a {
        color: var(--vdash-accent, #6c63ff);
        text-decoration: none;
        border-bottom: 1px solid transparent;
        transition: border-color var(--vdash-transition);
      }

      .markdown-body a:hover {
        border-bottom-color: var(--vdash-accent);
      }

      .markdown-body code {
        background: var(--vdash-bg-primary, #0f1117);
        color: var(--vdash-accent-secondary, #00d2ff);
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 0.9em;
        font-family: 'JetBrains Mono', 'Fira Code', monospace;
      }

      .markdown-body pre {
        background: var(--vdash-bg-primary, #0f1117);
        border: 1px solid var(--vdash-border-color);
        border-radius: var(--vdash-radius-sm, 8px);
        padding: 14px 18px;
        overflow-x: auto;
        margin: 0.8em 0;
      }

      .markdown-body pre code {
        background: none;
        padding: 0;
        color: var(--vdash-text-primary);
      }

      .markdown-body ul,
      .markdown-body ol {
        padding-left: 1.5em;
        color: var(--vdash-text-secondary);
      }

      .markdown-body li {
        margin: 0.3em 0;
      }

      .markdown-body blockquote {
        border-left: 3px solid var(--vdash-accent);
        margin: 0.8em 0;
        padding: 0.5em 1em;
        background: var(--vdash-accent-glow);
        border-radius: 0 var(--vdash-radius-sm) var(--vdash-radius-sm) 0;
        color: var(--vdash-text-secondary);
      }

      .markdown-body strong {
        color: var(--vdash-text-primary);
        font-weight: 600;
      }

      .markdown-body table {
        width: 100%;
        border-collapse: collapse;
        margin: 0.8em 0;
      }

      .markdown-body th,
      .markdown-body td {
        border: 1px solid var(--vdash-border-color);
        padding: 8px 12px;
        text-align: left;
      }

      .markdown-body th {
        background: var(--vdash-bg-primary);
        font-weight: 600;
        color: var(--vdash-text-primary);
      }

      .markdown-body hr {
        border: none;
        height: 1px;
        background: var(--vdash-border-color);
        margin: 1.2em 0;
      }
    `,
  ];

  private get _renderedMarkdown(): string {
    if (!this.content) return '';
    return marked.parse(this.content, { async: false }) as string;
  }

  override render() {
    return html`
      <div class="markdown-body">
        ${unsafeHTML(this._renderedMarkdown)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vdash-markdown': VdashMarkdown;
  }
}
