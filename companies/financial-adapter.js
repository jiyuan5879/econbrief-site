/* Convert the existing profile into comparable nine-month periods.
   All currency inputs remain USD billions; no annualization or interpolation. */
(() => {
  const finite = value => typeof value === 'number' && Number.isFinite(value) ? value : null;
  const total = (profile, field) => {
    const rows = profile?.revenueCategories;
    if (!Array.isArray(rows) || !rows.length || rows.some(row => finite(row[field]) === null)) return null;
    return Math.round(rows.reduce((sum, row) => sum + row[field], 0) * 1000) / 1000;
  };
  const metricValue = (period, key) => {
    if (key === 'margin') return finite(period.revenue) !== null && period.revenue > 0 && finite(period.netIncome) !== null ? period.netIncome / period.revenue * 100 : null;
    return finite(period[key]);
  };
  const change = (current, previous, key) => {
    const now = current ? metricValue(current, key) : null;
    const prior = previous ? metricValue(previous, key) : null;
    if (now === null || prior === null) return null;
    if (key === 'margin') return {value:now - prior,unit:'percentage points'};
    // Percentage growth is not meaningful against zero or a negative base.
    return prior > 0 ? {value:(now / prior - 1) * 100,unit:'%'} : null;
  };
  const fromProfile = profile => {
    if (!profile || !Array.isArray(profile.revenueCategories)) return [];
    // Metadata is specific to the existing Apple source; other profiles need explicit periods.
    if (profile.ticker !== 'AAPL') return [];
    const source = 'https://www.sec.gov/Archives/edgar/data/320193/000032019326000020/aapl-20260627.htm';
    return [
      {id:'FY2025-9M',label:'FY2025 · 9M',end:'28 June 2025',duration:'Nine months',revenue:total(profile,'prior'),netIncome:finite(profile.cashFlow?.netIncome?.prior),source},
      {id:'FY2026-9M',label:'FY2026 · 9M',end:'27 June 2026',duration:'Nine months',revenue:total(profile,'current'),netIncome:finite(profile.cashFlow?.netIncome?.current),source}
    ];
  };
  window.EconFinancials = {fromProfile,metricValue,change};
})();
