# Dashboard DSL and API Standardization Proposal

## Goal

Design a Dashboard DSL structure that is easy to generate with AI, easy to validate with JSON Schema, and easy to extend with new widgets later.

The proposal is to make the DSL explicitly separated:

- `widgets`: the list of content blocks to render.
- `layout`: the grid configuration and widget placement.
- `state`: dashboard state if filters, breakpoints, or runtime configuration need to be persisted.

## Proposed DSL Structure (v1)

```ts
type Breakpoint = 'lg' | 'md' | 'sm' | 'xs'

type VBIDashboardDSL = {
  version: 1
  type: 'dashboard'
  uuid: string
  meta: {
    title: string
    description?: string
    theme?: string
    mode?: 'edit' | 'view'
  }
  widgets: VBIDashboardWidget[]
  layout: {
    engine: 'gridstack'
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480 }
    cellHeight?: number
    layouts: {
      lg: GridItemLayout[]
      md?: GridItemLayout[]
      sm?: GridItemLayout[]
      xs?: GridItemLayout[]
    }
  }
  state?: VBIDashboardState
}

type GridItemLayout = {
  id: string
  widgetId: string
  x: number
  y: number
  w: number
  h: number
  static?: boolean
}

type VBIDashboardWidget =
  | { id: string; type: 'chart'; chartId: string; title?: string; description?: string }
  | { id: string; type: 'insight'; insightId: string; title?: string; description?: string }

type VBIDashboardState = {
  // Can be extended in a later phase if runtime state persistence is needed.
}
```

`state` is an optional section reserved for future expansion if runtime dashboard state needs to be persisted. Phase 1 can skip implementing this part.

### Public API (Proposal)

```ts
type DashboardInit = {
  uuid?: string
  meta?: Partial<VBIDashboardDSL['meta']>
  cellHeight?: number
}

type GridItemInput = Omit<GridItemLayout, 'widgetId'>

type AddChartInput = {
  id?: string
  type?: 'chart'
  chartId: string
  title?: string
  description?: string
  layout: {
    lg: GridItemInput
    md?: GridItemInput
    sm?: GridItemInput
    xs?: GridItemInput
  }
}

type AddInsightInput = {
  id?: string
  type?: 'insight'
  insightId: string
  title?: string
  description?: string
  layout: {
    lg: GridItemInput
    md?: GridItemInput
    sm?: GridItemInput
    xs?: GridItemInput
  }
}

type AddWidgetInput =
  | (AddChartInput & { type: 'chart' })
  | (AddInsightInput & { type: 'insight' })

type UpdateWidgetBaseInput = {
  title?: string
  description?: string
}

type UpdateChartWidgetInput = UpdateWidgetBaseInput & {
  chartId?: string
  insightId?: never
}

type UpdateInsightWidgetInput = UpdateWidgetBaseInput & {
  chartId?: never
  insightId?: string
}

type UpdateWidgetInput = UpdateChartWidgetInput | UpdateInsightWidgetInput

interface VdashBuilder {
  setMeta(patch: Partial<VBIDashboardDSL['meta']>): this

  addWidget(input: AddWidgetInput): this
  updateWidget(id: string, patch: UpdateWidgetInput): this
  removeWidget(id: string): this

  setLayout(widgetId: string, breakpoint: Breakpoint, layout: GridItemInput): this
  removeLayout(id: string, breakpoint: Breakpoint): this

  toJSON(): VBIDashboardDSL
}

type VdashFactory = {
  (init?: DashboardInit): VdashBuilder
  fromJSON(input: unknown): VdashBuilder
}

declare const vdash: VdashFactory
```

### Example Usage

```ts
import { VdashComponent } from '@vbi/dash'

const dashboard = vdash({
  meta: { title: 'Executive KPI', mode: 'edit' },
})
  .addWidget({
    type: 'insight',
    insightId: 'insight_margin_warning',
    title: 'Margin Alert',
    layout: { lg: { x: 6, y: 0, w: 6, h: 4 } },
  })

dashboard
  .updateWidget('w_chart_1', { title: 'Revenue (Updated)' })
  .setLayout('w_chart_1', 'md', { x: 0, y: 0, w: 10, h: 4 })

<VdashComponent dashboard={dashboard} />
```

## Questions for Review

1. Should `VBIDashboardWidget` store `chartId` / `insightId`, or should it store full nested DSL (`dsl: VBIChartDSL | VBIInsightDSL`)?
2. For a reusable `Vdash` component across multiple frameworks, should the layout engine be `gridstackjs` (framework-agnostic core) or `react-grid-layout` (React-first)?
