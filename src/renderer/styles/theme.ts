/**
 * Theme — CSS custom properties for dark / light themes.
 * Applied on the host `<vdash-dashboard>` element.
 */

import { css } from 'lit';

export const darkTheme = css`
  :host {
    /* ── Surfaces ─────────────────────────────────────── */
    --vdash-bg-primary: #0f1117;
    --vdash-bg-secondary: #161923;
    --vdash-bg-card: #1c1f2e;
    --vdash-bg-card-hover: #232738;

    /* ── Borders ──────────────────────────────────────── */
    --vdash-border-color: rgba(255, 255, 255, 0.06);
    --vdash-border-subtle: rgba(255, 255, 255, 0.03);

    /* ── Text ─────────────────────────────────────────── */
    --vdash-text-primary: #e4e6f0;
    --vdash-text-secondary: #8b8fa3;
    --vdash-text-muted: #5a5e72;

    /* ── Accent ───────────────────────────────────────── */
    --vdash-accent: #6c63ff;
    --vdash-accent-glow: rgba(108, 99, 255, 0.15);
    --vdash-accent-secondary: #00d2ff;

    /* ── Status ───────────────────────────────────────── */
    --vdash-success: #34d399;
    --vdash-warning: #fbbf24;
    --vdash-error: #f87171;

    /* ── Misc ─────────────────────────────────────────── */
    --vdash-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
    --vdash-shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.25);
    --vdash-radius: 12px;
    --vdash-radius-sm: 8px;
    --vdash-transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);

    /* ── Glass ─────────────────────────────────────────── */
    --vdash-glass-bg: rgba(28, 31, 46, 0.65);
    --vdash-glass-blur: blur(16px);
  }
`;

export const lightTheme = css`
  :host {
    /* ── Surfaces ─────────────────────────────────────── */
    --vdash-bg-primary: #f4f5f9;
    --vdash-bg-secondary: #ffffff;
    --vdash-bg-card: #ffffff;
    --vdash-bg-card-hover: #f0f1f5;

    /* ── Borders ──────────────────────────────────────── */
    --vdash-border-color: rgba(0, 0, 0, 0.08);
    --vdash-border-subtle: rgba(0, 0, 0, 0.04);

    /* ── Text ─────────────────────────────────────────── */
    --vdash-text-primary: #1a1d2e;
    --vdash-text-secondary: #6b7085;
    --vdash-text-muted: #9ca0b3;

    /* ── Accent ───────────────────────────────────────── */
    --vdash-accent: #5b52e0;
    --vdash-accent-glow: rgba(91, 82, 224, 0.1);
    --vdash-accent-secondary: #0ea5e9;

    /* ── Status ───────────────────────────────────────── */
    --vdash-success: #10b981;
    --vdash-warning: #f59e0b;
    --vdash-error: #ef4444;

    /* ── Misc ─────────────────────────────────────────── */
    --vdash-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
    --vdash-shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
    --vdash-radius: 12px;
    --vdash-radius-sm: 8px;
    --vdash-transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);

    /* ── Glass ─────────────────────────────────────────── */
    --vdash-glass-bg: rgba(255, 255, 255, 0.7);
    --vdash-glass-blur: blur(16px);
  }
`;

/** Shared reset + base styles for all DashCraft components. */
export const baseStyles = css`
  :host {
    box-sizing: border-box;
    font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`;
