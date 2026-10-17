# EconBrief

EconBrief is a public research workspace for company focused financial analysis.

The site is a lightweight static site. Company hubs combine business profiles, durable operating signals, cited research notes, and transparent scenario analysis. There is no build step or paid data feed.

## Structure

- `index.html` — Overview / About landing page and platform directory
- `styles.css` — site-wide styling
- `assets/` — logo, shared platform styling (`platform.css`), and responsive navigation (`platform.js`)
- `posts/` — article pages
- `companies/index.html` — company research library; Apple is the first live sample
- `companies/` — company research hubs; `companies/apple.html` is the first MVP
- `industries.html` — industry intelligence entry and analysis framework
- `macro.html` — macro scope entry and transmission framework
- `robots.txt` — search engine crawling rules
- `sitemap.xml` — sitemap for indexing

## Company research hub MVP

The site uses a shared four-part navigation: Overview / About, Companies, Industries, and Macro. The shared responsive shell is in `assets/platform.css` and `assets/platform.js`. The Apple hub is a static, data driven prototype. Its content lives in `companies/company-data.js`, rendering and the revenue scenario calculator live in `companies/company-hub.js`, and its styles live in `companies/company-hub.css`. To add another company, add a profile under its ID in `companyProfiles` and reuse the page template with that ID. Apple figures are sourced from its Q3 FY 2026 SEC filing, filed 31 July 2026. The dashboard updates on a filing cycle, not in real time; no live market data provider is connected.

## Design direction

The site uses a restrained visual system built around deep navy, cream, and gold accents. The goal is to make financial information clear, professional, and easy to scan.

## Deployment

This site can be deployed for free on platforms such as Cloudflare Pages or Netlify.

Because it is fully static, no build step is required.

## Notes

This repository is intended to serve as the foundation for a long-term archive of financial analysis and research.
