(() => {
  const companyId = document.body.dataset.company;
  const company = window.companyProfiles?.[companyId];
  if (!company) return;

  const format = (value) => `$${value.toFixed(1)}B`;

  document.title = `${company.name} (${company.ticker}) | EconBrief Company Hub`;
  document.querySelector(".topbar-status").innerHTML = `<i></i>Filing data · ${company.sourceDate}`;
  document.querySelector(".report-stamp strong").textContent = company.fiscalPeriod;
  document.querySelector(".report-stamp small").textContent = company.period;
  document.querySelector("#service-share").textContent = `${company.serviceShare.toFixed(1)}%`;

  const metricGrid = document.querySelector("#signal-grid");
  metricGrid.innerHTML = company.metrics.map((metric) => `
    <article class="signal-card">
      <span class="signal-label">${metric.label}</span>
      <strong class="signal-value">${metric.value}</strong>
      <span class="signal-change ${metric.direction}">${metric.change}</span>
      <span class="signal-context">${metric.context}</span>
    </article>
  `).join("");

  const chart = document.querySelector("#revenue-chart");
  const maximum = Math.max(...company.revenueCategories.map((item) => item.current));
  chart.innerHTML = company.revenueCategories.map((item) => `
    <div class="revenue-row">
      <div class="revenue-label"><strong>${item.label}</strong><span>${item.growth}</span></div>
      <div class="bar-pair" aria-hidden="true">
        <span class="bar prior" style="width:${(item.prior / maximum * 100).toFixed(1)}%"></span>
        <span class="bar current" style="width:${(item.current / maximum * 100).toFixed(1)}%"></span>
      </div>
      <div class="revenue-values"><span>${format(item.prior)}</span><strong>${format(item.current)}</strong></div>
    </div>
  `).join("");

  const cashChart = document.querySelector("#cash-chart");
  const maxCash = company.cashFlow.operating.current;
  cashChart.innerHTML = [
    { key: "Operating cash flow", values: company.cashFlow.operating },
    { key: "Capital spending", values: company.cashFlow.capitalSpending },
    { key: "Net income", values: company.cashFlow.netIncome }
  ].map((row) => `
    <div class="cash-row">
      <strong>${row.key}</strong>
      <div class="cash-bars">
        <span class="cash-bar prior" style="width:${(row.values.prior / maxCash * 100).toFixed(1)}%"><i>FY 2025 · ${format(row.values.prior)}</i></span>
        <span class="cash-bar current" style="width:${(row.values.current / maxCash * 100).toFixed(1)}%"><i>FY 2026 · ${format(row.values.current)}</i></span>
      </div>
    </div>
  `).join("");

  const fcfPrior = company.cashFlow.operating.prior - company.cashFlow.capitalSpending.prior;
  const fcfCurrent = company.cashFlow.operating.current - company.cashFlow.capitalSpending.current;
  document.querySelector("#cash-summary").innerHTML = `
    <div><span>Free cash flow proxy</span><strong>${format(fcfCurrent)}</strong><small>Prior period ${format(fcfPrior)}</small></div>
    <div><span>Cash conversion</span><strong>${(company.cashFlow.operating.current / company.cashFlow.netIncome.current).toFixed(2)}×</strong><small>Operating cash flow / net income</small></div>
  `;

  const researchGrid = document.querySelector("#research-grid");
  researchGrid.innerHTML = company.research.map((item) => `
    <article class="research-card">
      <div class="research-topline"><span>${item.number} / ${item.theme}</span><span class="stance">${item.stance}</span></div>
      <h3>${item.title}</h3>
      <p>${item.summary}</p>
      <div class="citations">${item.sources.map((source, index) => `<a href="${source.url}" target="_blank" rel="noopener noreferrer">[${index + 1}] ${source.label} ↗</a>`).join("")}</div>
    </article>
  `).join("");

  const slider = document.querySelector("#services-growth");
  const growthOutput = document.querySelector("#growth-output");
  const revenueOutput = document.querySelector("#scenario-revenue");
  const deltaOutput = document.querySelector("#scenario-delta");
  const observedRevenue = company.model.currentProducts + company.model.currentServices;

  function updateScenario() {
    const growth = Number(slider.value) / 100;
    const productRevenue = company.model.currentProducts;
    const servicesRevenue = company.model.priorServices * (1 + growth);
    const scenarioRevenue = productRevenue + servicesRevenue;
    const delta = scenarioRevenue - observedRevenue;

    growthOutput.textContent = `${(growth * 100).toFixed(1)}%`;
    revenueOutput.textContent = format(scenarioRevenue);
    deltaOutput.textContent = Math.abs(delta) < 0.1
      ? "Reported baseline"
      : `${delta > 0 ? "+" : "−"}${format(Math.abs(delta))} versus reported`;
    deltaOutput.classList.toggle("positive", delta > 0.1);
    deltaOutput.classList.toggle("negative", delta < -0.1);
    slider.style.setProperty("--range-progress", `${((Number(slider.value) - Number(slider.min)) / (Number(slider.max) - Number(slider.min))) * 100}%`);
    slider.setAttribute("aria-valuetext", `${(growth * 100).toFixed(1)} percent Services growth`);
  }

  slider.addEventListener("input", updateScenario);
  updateScenario();
})();
