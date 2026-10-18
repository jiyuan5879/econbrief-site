# EconBrief visual system

The global theme is `assets/design-system.css`, loaded **last** on every page. Keep structural layouts in `editorial.css`, `home.css`, `platform.css`, and `company-hub.css`. The global stylesheet supplies semantic tokens and compatibility rules for their existing components. Do not append theme overrides to individual pages.

## Core tokens

| Token | Value / purpose |
| --- | --- |
| `--eb-bg` | `#07111F`, page and navigation |
| `--eb-bg-secondary` | `#101E30`, sections and cards |
| `--eb-surface` | `#17283D`, nested panels and controls |
| `--eb-text` | `#F7F9FC`, headings and key values |
| `--eb-text-secondary` | `#A9B8C9`, explanatory text |
| `--eb-accent` | `#438BFF`, active controls and current chart series |
| `--eb-link` | `#85B5FF`, readable links and focus rings on navy |
| `--eb-border` | `rgba(255,255,255,0.12)`, quiet separators |
| `--eb-positive` / `--eb-negative` | Semantic financial changes; preserve text labels |

System fonts support Latin and Chinese without new font dependencies. Display headings use responsive sizes and medium weights. Existing page-specific font sizes remain where their hierarchy or chart density requires them. Spacing tokens use an 8px base; existing section order, grids, gutters and image crops remain intact.

Legacy names such as `--gold` and `--platform-gold` are compatibility aliases for the new blue palette. The logo and photographs retain their original colors. Contrast scrims remain over images. Charts retain their values, bar widths, donut geometry, range progress, category labels and positive/negative meaning; series colors follow the global palette.

## Interaction and accessibility

- Flat surfaces, 4px corners, subdued borders; no metallic shadows or shimmer.
- Blue focus outlines on links, buttons, inputs and disclosure summaries.
- 180ms color and border transitions; reduced-motion disables animation, transitions and smooth scrolling.
- Both existing navigation implementations and the Google language selector are retained.
- Mobile safeguards allow text wrapping instead of clipping the viewport.

## Maintenance boundary

This is an incremental theme bridge, not a page rebuild. Older CSS still contains historical colors and font declarations. The final shared stylesheet overrides them; remove obsolete declarations only during a separate stylesheet cleanup. Google Translate remains an external service. No data, content, imagery, JavaScript, page structure or navigation destinations changed in this step.

## Local preview

From the repository root:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. Check `/companies/`, `/industries.html`, `/about.html`, `/companies/apple.html`, `/macro.html`, and `/posts/energy-chain.html` as well as the homepage. Stop with Ctrl+C. Google website translation uses the published URL and cannot translate localhost.

## Validation for Step 1

- Nine pages checked in Chrome at 320, 390, 768 and 1440px (36 page/viewport combinations); no document-wide horizontal overflow.
- Confirmed primary canvas and heading colors across all pages.
- Exercised both mobile menu implementations, company search, market filters, Apple scenario slider, chart rows and research-note rendering.
- All page bodies remained byte-for-byte unchanged; JavaScript and research data were not modified.
- Primary, secondary, link and semantic text tokens meet WCAG AA (4.5:1) on all three solid surfaces. This is token verification, not a full accessibility audit of photographic backgrounds or third-party translations.
- Representative homepage, industry and company screenshots reviewed. Removed unused Google font requests now that these pages use the system-font stack.
