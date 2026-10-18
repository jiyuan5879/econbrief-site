# EconBrief

EconBrief is a public research workspace for company focused financial analysis.

The site is a lightweight static site. Company hubs combine business profiles, durable operating signals, cited research notes, and transparent scenario analysis. There is no build step or paid data feed.

## Structure

- `index.html` — Chinese-language entry page with image links to the three primary sections
- `about.html` — platform purpose, method, sources, and author
- `assets/editorial.css` / `assets/editorial.js` — new entry and library design, mobile navigation, company search and market filters
- `assets/images/` — locally hosted Unsplash photos and source credits
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

Primary navigation is About / 公司分析 / 行业研究. The new entry, About, company library, and industry library use `assets/editorial.css` and `assets/editorial.js`. Existing detailed research pages retain their earlier styles in `assets/platform.css` and `assets/platform.js`. Macro is retained as a legacy page outside the primary navigation. The Apple hub is a static, data driven prototype. Its content lives in `companies/company-data.js`, rendering and the revenue scenario calculator live in `companies/company-hub.js`, and its styles live in `companies/company-hub.css`. To add another company, add a profile under its ID in `companyProfiles` and reuse the page template with that ID. Apple figures are sourced from its Q3 FY 2026 SEC filing, filed 31 July 2026. The dashboard updates on a filing cycle, not in real time; no live market data provider is connected.

## Design direction

The entry and libraries use blue-black, platinum-white and muted gold, generous spacing, a subtle grid pattern and clickable photographic cards. Planned company coverage is marked explicitly. Images are hosted locally; source URLs and license information are recorded in `assets/images/credits.md`.

## Deployment

The site deploys to Netlify directly from GitHub without a build step. `netlify.toml` sets the publish directory to the repository root (`.`) and leaves the build command empty.

One-time setup in Netlify:

1. Select **Add new project → Import an existing project → GitHub**.
2. Authorize access to `jiyuan5879/econbrief-site` and select that repository.
3. Set the production branch to `main`, leave the base directory and build command empty, and set the publish directory to `.`.
4. Deploy the project. Subsequent pushes to `main` will automatically trigger production deployments.

If a Netlify project already exists, link this repository in its **Project configuration → Build & deploy → Continuous deployment** settings instead of creating a second project. Ensure automatic builds are enabled.

To publish later changes, commit them and run `git push origin main`. GitHub Actions and Netlify API tokens are not required for this Git integration. The existing GitHub Pages workflow is independent of Netlify.

## Notes

This repository is intended to serve as the foundation for a long-term archive of financial analysis and research.

## Language selection

All pages offer 中文 / English in the header. Main entry and library pages are maintained in Chinese; existing detailed research pages retain English source content. The other language opens Google Translate's hosted website translation for the current page. This requires Google Translate access and the publicly deployed site; it does not translate localhost or local file contents. No API key or embedded legacy translation widget is used. Links remain usable without JavaScript; JavaScript preserves section/query context and updates the selected language on Google's translation proxy. Shared styling and behavior are in `assets/language.css` and `assets/language.js`.
