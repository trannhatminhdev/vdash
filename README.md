# VDash (DashCraft Demo)

`VDash` is a JSON-DSL-driven dashboard project rendered with Lit Web Components.

## Requirements

- Node.js `>= 20`
- npm

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

- The dev server runs at `http://localhost:3000` by default
- The demo app automatically loads the sample file at `dsl-demo/dashboard.json`
- The UI includes these actions:
  - `Edit JSON`: edit the DSL directly
  - `Toggle Theme`: switch between `dark` and `light`
  - `Load JSON File`: load a local `.json` file

## Build and preview

```bash
npm run build
npm run preview
```

## Basic DSL structure

Node hierarchy:

`ROOT -> ROW -> COL -> (CHART | MARKDOWN | DIVIDER)`

Minimal example:

```json
{
  "version": 1,
  "kind": "dashboard",
  "uuid": "demo-uuid",
  "meta": {
    "title": "Demo Dashboard",
    "description": "Short description",
    "theme": "dark"
  },
  "layout": {
    "id": "ROOT_1",
    "type": "ROOT",
    "style": { "background": "transparent" },
    "children": [
      {
        "id": "ROW_1",
        "type": "ROW",
        "style": { "background": "transparent" },
        "children": [
          {
            "id": "COL_1",
            "type": "COL",
            "width": { "xs": 12, "md": 6 },
            "height": { "xs": "260px", "md": "320px" },
            "style": { "background": "transparent" },
            "children": [
              {
                "id": "CHART_1",
                "type": "CHART",
                "chartId": 101,
                "title": "Revenue",
                "description": "Monthly performance"
              }
            ]
          }
        ]
      }
    ]
  }
}
```

## Using the API in code

In this repo, you can import directly from `src/index.ts`:

```ts
import { parse, validate, renderDashboard, updateDashboard } from './src/index.ts';

const app = document.getElementById('app') as HTMLElement;

const raw = '{"version":1,"kind":"dashboard","uuid":"x","meta":{"title":"T","description":"D","theme":"dark"},"layout":{"id":"ROOT","type":"ROOT","style":{"background":"transparent"},"children":[]}}';
const parsed = parse(raw);

if (!parsed.success) {
  console.error(parsed.error);
} else {
  const result = validate(parsed.data);
  if (!result.valid) {
    console.warn(result.errors);
  }

  const dashboardEl = renderDashboard(app, parsed.data as any);

  // Update with a new JSON config later:
  updateDashboard(dashboardEl, parsed.data as any);
}
```

## Build pipeline (widget registry)

If you use the builder layer instead of the UI renderer, register the built-in widgets first:

```ts
import { registerBuiltinWidgets, buildDashboard } from './src/index.ts';

registerBuiltinWidgets();
const built = buildDashboard(dslObject);

if (!built.success) {
  console.error(built.errors);
}
```

## Main structure

- `src/core`: parser, validator, schema loader, widget registry, builder
- `src/renderer`: Lit components and dashboard render functions
- `src/types`: type definitions for the DSL and widget contracts
- `src/widgets`: built-in widget handlers
- `dsl-demo`: sample schema and dashboard data

## Current notes

- `validateSchema` currently performs basic structural checks only and does not yet integrate full AJV validation.
- `vdash-chart` is still a placeholder chart component with demo animation, not a real charting-library integration.

## License

MIT
