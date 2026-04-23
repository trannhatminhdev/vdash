/**
 * Grid — responsive 12-column CSS grid utilities.
 * Breakpoints match the DSL schema: xs / sm / md / lg / xl / xxl.
 */

import { css } from 'lit';

/** Breakpoint pixel values (mobile-first, min-width). */
export const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
} as const;

/**
 * Generates a CSS class string for a responsive column width.
 * Uses CSS custom properties that are set inline on each `<vdash-col>`.
 */
export const gridStyles = css`
  :host {
    --_col-span: var(--vdash-col-xs, 12);
    display: block;
    width: calc(var(--_col-span) / 12 * 100%);
    min-height: var(--vdash-height-xs, auto);
    transition: width var(--vdash-transition, 0.25s ease);
  }

  @media (min-width: 576px) {
    :host {
      --_col-span: var(--vdash-col-sm, var(--vdash-col-xs, 12));
      min-height: var(--vdash-height-sm, var(--vdash-height-xs, auto));
    }
  }

  @media (min-width: 768px) {
    :host {
      --_col-span: var(--vdash-col-md, var(--vdash-col-sm, var(--vdash-col-xs, 12)));
      min-height: var(--vdash-height-md, var(--vdash-height-sm, var(--vdash-height-xs, auto)));
    }
  }

  @media (min-width: 992px) {
    :host {
      --_col-span: var(--vdash-col-lg, var(--vdash-col-md, var(--vdash-col-sm, var(--vdash-col-xs, 12))));
      min-height: var(
        --vdash-height-lg,
        var(--vdash-height-md, var(--vdash-height-sm, var(--vdash-height-xs, auto)))
      );
    }
  }

  @media (min-width: 1200px) {
    :host {
      --_col-span: var(
        --vdash-col-xl,
        var(--vdash-col-lg, var(--vdash-col-md, var(--vdash-col-sm, var(--vdash-col-xs, 12))))
      );
      min-height: var(
        --vdash-height-xl,
        var(
          --vdash-height-lg,
          var(--vdash-height-md, var(--vdash-height-sm, var(--vdash-height-xs, auto)))
        )
      );
    }
  }

  @media (min-width: 1400px) {
    :host {
      --_col-span: var(
        --vdash-col-xxl,
        var(
          --vdash-col-xl,
          var(--vdash-col-lg, var(--vdash-col-md, var(--vdash-col-sm, var(--vdash-col-xs, 12))))
        )
      );
      min-height: var(
        --vdash-height-xxl,
        var(
          --vdash-height-xl,
          var(
            --vdash-height-lg,
            var(--vdash-height-md, var(--vdash-height-sm, var(--vdash-height-xs, auto)))
          )
        )
      );
    }
  }
`;
