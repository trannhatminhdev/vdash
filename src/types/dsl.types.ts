/**
 * Top-level Dashboard DSL types — represents the full JSON document structure.
 */

import type { RootNode } from './node.types';

export type Theme = 'dark' | 'light';

export interface DashboardMeta {
  title: string;
  description: string;
  theme: Theme;
}

/** The root document shape that LLM output must conform to. */
export interface DashboardDSL {
  version: number;
  kind: 'dashboard';
  uuid: string;
  meta: DashboardMeta;
  layout: RootNode;
}
