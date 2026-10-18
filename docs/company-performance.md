# Company overview and financial performance (Step 3)

This step changes only the Apple company detail page. The company directory, other pages, routes, global theme and original company dataset remain unchanged.

## Source and reporting basis

The existing profile in `companies/company-data.js` contains product/services revenue and net income for two comparable periods. `financial-adapter.js` sums the five existing revenue categories and uses the existing cash-flow net-income comparison:

| Period | End date | Revenue (USD billions) | Net income (USD billions) |
| --- | --- | --- | --- |
| FY2025, nine months | 28 June 2025 | 313.695 | 84.544 |
| FY2026, nine months | 27 June 2026 | 364.357 | 101.464 |

These values were checked against Apple's [Q3 FY2026 Form 10-Q, consolidated statement of operations](https://www.sec.gov/Archives/edgar/data/320193/000032019326000020/aapl-20260627.htm). Margin = net income / revenue × 100; revenue growth = (current / prior − 1) × 100. Margin changes are percentage points. The snapshot rounds to two decimals; tooltips and selected-period values use three. These are cumulative nine-month figures, not single-quarter or annual figures. No further history or time ranges are fabricated. A zero/negative prior base does not produce a percentage growth rate; missing input produces an unavailable state. Zero profit is retained as zero; zero revenue produces an unavailable margin.

## Interaction

- Select Revenue, Net income or Net profit margin to update the same ECharts chart, title, units, axes, definitions and source note.
- Hover a bar to read its exact value and period. Click/tap it to open a contextual explanation.
- Two equivalent native buttons provide keyboard and touch access to the same explanations. Close the panel or choose another period; changing metrics clears the selection.
- Definitions, calculation and methodology are native disclosures. Existing business composition and operating-signal content is retained in disclosures below the new overview. Existing fragment links open the required disclosure.
- The original research notes and scenario slider remain intact.
- ResizeObserver keeps the chart sized to its container; reduced-motion disables chart transitions.
- If ECharts cannot load, the period buttons still expose exact values and explanations. If data is missing, the chart is hidden and an unavailable message appears.

## Dependencies and limitations

Apache ECharts 5.6.0 is pinned and hosted locally under `assets/vendor/`, with its Apache license and NOTICE. No framework, package manager or backend was added. Its minified distribution is about 1 MB before HTTP compression and is loaded only on the detail page. The existing Apple photo and credits are reused. Other companies still do not have detail pages. English remains the source language of this page, with the unchanged Google website-translation selector providing Chinese. No live data is fetched.

## Test and preview

```sh
node --test tests/financial-adapter.test.cjs
python3 -m http.server 8000
```

Open `http://localhost:8000/companies/apple.html`. Exercise each metric, hover and select both periods, close the panel, expand methodology and the original business sections, switch a business line and adjust the existing scenario slider. Check a narrow mobile viewport and the browser's reduced-motion emulation. Google website translation requires the published site, rather than localhost.

Validation completed in local Chrome at 320, 390, 768 and 1440px: all three metric series and exact tooltips, actual bar clicks/taps, period selection and close/reselect, simulated missing metric data, responsive sizing and reduced-motion configuration. Keyboard Enter selection and Escape close were checked separately. Existing business selection, five research notes, scenario updates and translation URLs passed. Tooltip measurement overflow was contained locally to the chart; document-wide overflow was checked both before and after showing tooltips. Automated adapter tests cover exact source totals, missing and non-numeric inputs, zero/negative profit and undefined growth/margin.
