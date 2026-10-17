/*
 * Values are taken from the latest verified Apple quarterly filing as of
 * 17 October 2026. Money figures are USD billions unless stated otherwise.
 * Add another company profile with the same keys to reuse the hub renderer.
 */
window.companyProfiles = {
  apple: {
    name: "Apple Inc.",
    ticker: "AAPL",
    exchange: "NASDAQ",
    period: "Nine months ended 27 June 2026",
    sourceDate: "31 July 2026",
    fiscalPeriod: "FY 2026 · Q3",
    serviceShare: 25.2,
    metrics: [
      { label: "Revenue", value: "$364.4B", change: "+16% year over year", direction: "up", context: "Nine month reported sales" },
      { label: "Services revenue", value: "$91.7B", change: "+14% year over year", direction: "up", context: "25.2% of total revenue" },
      { label: "Services gross margin", value: "76.3%", change: "+0.8 points", direction: "up", context: "Compared with 75.5%" },
      { label: "Greater China sales", value: "$64.8B", change: "+30% year over year", direction: "up", context: "FX helped reported growth" },
      { label: "Operating cash flow", value: "$117.0B", change: "+43% year over year", direction: "up", context: "Nine month reported cash" }
    ],
    revenueCategories: [
      { label: "iPhone", prior: 160.561, current: 196.515, growth: "+22%" },
      { label: "Services", prior: 80.408, current: 91.728, growth: "+14%" },
      { label: "Mac", prior: 24.982, current: 27.137, growth: "+9%" },
      { label: "iPad", prior: 21.071, current: 21.700, growth: "+3%" },
      { label: "Wearables and accessories", prior: 26.673, current: 27.277, growth: "+2%" }
    ],
    cashFlow: {
      operating: { prior: 81.754, current: 116.996 },
      capitalSpending: { prior: 9.473, current: 6.799 },
      netIncome: { prior: 84.544, current: 101.464 }
    },
    model: {
      priorServices: 80.408,
      priorProducts: 233.287,
      currentProducts: 272.629,
      currentServices: 91.728,
      minGrowth: 8,
      maxGrowth: 20
    },
    research: [
      {
        number: "01",
        theme: "Earnings quality",
        title: "Services: attractive margins, with platform exposure",
        stance: "Balanced view",
        summary: "The Services business brought in $91.7B over nine months, up 14%, and delivered a 76.3% gross margin. The SEC filing also describes litigation and regulation that could change App Store distribution and fees. The durable question is whether service economics hold as platform rules evolve.",
        sources: [
          { label: "SEC filing · revenue and margin", url: "https://www.sec.gov/Archives/edgar/data/320193/000032019326000020/aapl-20260627.htm" },
          { label: "SEC filing · legal risks", url: "https://www.sec.gov/Archives/edgar/data/320193/000032019326000020/aapl-20260627.htm" }
        ]
      },
      {
        number: "02",
        theme: "Regional demand",
        title: "Greater China growth accelerated; check what drove it",
        stance: "Read through carefully",
        summary: "Greater China sales were $64.8B for the first nine months, up 30% from the comparable period. Management attributes the increase primarily to higher iPhone sales and notes a favorable currency effect. Follow the next filing to see whether demand persists beyond currency support and launch timing.",
        sources: [
          { label: "SEC filing · segment results", url: "https://www.sec.gov/Archives/edgar/data/320193/000032019326000020/aapl-20260627.htm" },
          { label: "SEC filing · management discussion", url: "https://www.sec.gov/Archives/edgar/data/320193/000032019326000020/aapl-20260627.htm" }
        ]
      },
      {
        number: "03",
        theme: "Investment and margins",
        title: "AI spend meets component and compute constraints",
        stance: "Watch the trade off",
        summary: "Apple reported $34.0B of research and development spending over nine months, up 33%, and cited higher infrastructure costs including AI investment. Its filing warns that component constraints and rising computing costs could pressure revenue and margins. The release reports a 50.1% quarterly gross margin, including about two percentage points from tariff refunds. Separately, Yahoo Finance reported Morgan Stanley kept its Overweight rating while trimming its target from $360 to $355 on 1 October, a reminder that strong reported growth does not remove valuation debate.",
        sources: [
          { label: "SEC filing · costs and risks", url: "https://www.sec.gov/Archives/edgar/data/320193/000032019326000020/aapl-20260627.htm" },
          { label: "Apple results release · quarterly context", url: "https://www.apple.com/newsroom/2026/07/apple-reports-third-quarter-results/" },
          { label: "Yahoo Finance · Morgan Stanley view", url: "https://finance.yahoo.com/markets/stocks/articles/morgan-stanley-adjusts-price-target-092350310.html" }
        ]
      }
    ]
  }
};
