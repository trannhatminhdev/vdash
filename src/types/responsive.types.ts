/**
 * Responsive breakpoint types matching the 12-column grid system.
 * Maps to CSS breakpoints: xs < sm < md < lg < xl < xxl
 */

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/** Column span (1–12) for each breakpoint. `xs` is required as the mobile-first default. */
export interface ResponsiveWidth {
  xs: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
}

/** Height value per breakpoint. Accepts `auto` or a CSS length (`200px`, `50vh`, `100%`). */
export interface ResponsiveHeight {
  xs: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  xxl?: string;
}
