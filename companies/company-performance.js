(() => {
  const host = document.querySelector('#performance-chart');
  const adapter = window.EconFinancials;
  if (!host || !adapter) return;
  const company = window.companyProfiles?.[document.body.dataset.company];
  const periods = adapter.fromProfile(company);
  const info = {
    revenue: {label:'Revenue',title:'Revenue, in perspective.',unit:'USD billions',definition:'Revenue is the amount earned from selling products and services, before expenses. Higher revenue does not automatically mean higher profit.',formula:'Revenue = the sum of reported product and services revenue. Growth = (current revenue ÷ prior comparable revenue − 1) × 100%.',explanation:'Compare how much Apple earned from products and services over the same nine-month window in each fiscal year.'},
    netIncome: {label:'Net income',title:'Profit after the costs.',unit:'USD billions',definition:'Net income is the profit remaining after operating costs, other income and expenses, and income taxes. It is different from cash generated.',formula:'Net income is a reported figure from the consolidated statement of operations. Comparable growth = (current net income ÷ prior net income − 1) × 100%, when the prior base is positive.',explanation:'Compare the profit remaining after costs and taxes over two equivalent nine-month periods.'},
    margin: {label:'Net profit margin',title:'How much revenue becomes profit?',unit:'Percent of revenue',definition:'Net profit margin shows how much of each dollar of revenue remains as net income. It is a ratio, not a separate cash balance.',formula:'Net profit margin = net income ÷ revenue × 100%. Changes between margins are shown in percentage points. The ratio is unavailable when revenue is zero or missing.',explanation:'Compare the share of revenue retained as net income. Margin is calculated from the same nine-month revenue and profit figures.'}
  };
  const finite = x => typeof x === 'number' && Number.isFinite(x);
  const money = (value, digits=3) => finite(value) ? `$${value.toFixed(digits)}B` : 'Unavailable';
  const formatted = (value, metric, digits=3) => !finite(value) ? 'Unavailable' : metric === 'margin' ? `${value.toFixed(digits)}%` : money(value,digits);
  const signed = value => `${value > 0 ? '+' : value < 0 ? '−' : ''}${Math.abs(value).toFixed(2)}`;
  const latest = periods.at(-1);
  const previous = periods.at(-2);
  const growth = adapter.change(latest,previous,'revenue');
  const snapshot = document.querySelector('#financial-snapshot');
  const metrics = [
    ['Revenue',latest?.revenue,'revenue','USD billions'],
    ['Revenue growth',growth?.value,'growth','Year over year'],
    ['Net income',latest?.netIncome,'netIncome','USD billions'],
    ['Net profit margin',latest ? adapter.metricValue(latest,'margin') : null,'margin','Net income / revenue']
  ];
  metrics.forEach(([label,value,key,unit]) => {
    const article = document.createElement('article');
    const title = document.createElement('span');title.className='snapshot-label';title.textContent=label;
    const number = document.createElement('strong');number.className='snapshot-value';number.textContent=key==='growth' ? finite(value)?`${signed(value)}%`:'Unavailable' : formatted(value,key,2);
    const caption = document.createElement('small');caption.textContent=`${unit} · ${latest?.label || 'Period unavailable'}`;
    article.append(title,number,caption);snapshot.append(article);
  });
  let metric = 'revenue';
  let chart = null;
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const detail = document.querySelector('#performance-detail');
  const empty = document.querySelector('#performance-empty');
  const pointHost = document.querySelector('#performance-points');
  const text = (id,value) => {document.querySelector(id).textContent=value;};
  if (window.echarts) {
    try { chart = window.echarts.init(host,null,{renderer:'svg'}); } catch { /* Period buttons remain usable. */ }
  }
  function closeDetail(focus=false) {
    detail.hidden=true;
    pointHost.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed','false'));
    if (chart) chart.dispatchAction({type:'downplay',seriesIndex:0});
    if (focus) pointHost.querySelector('button:not(:disabled)')?.focus();
  }
  function selectPeriod(index) {
    const period=periods[index];
    const value=period ? adapter.metricValue(period,metric) : null;
    if (!finite(value)) return;
    detail.hidden=false;
    text('#selected-period',`${period.label} · ${period.duration} ended ${period.end}`);
    text('#selected-value',`${info[metric].label}: ${formatted(value,metric)}`);
    const comparison=adapter.change(period,periods[index-1],metric);
    text('#selected-change',comparison ? `${signed(comparison.value)}${metric==='margin'?' percentage points':'%'} versus ${periods[index-1].label}.` : 'Previous comparable period is not available in this dataset.');
    text('#selected-explanation',info[metric].definition);
    document.querySelector('#selected-source').href=period.source;
    pointHost.querySelectorAll('button').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
    if(chart){chart.dispatchAction({type:'downplay',seriesIndex:0});chart.dispatchAction({type:'highlight',seriesIndex:0,dataIndex:index});}
  }
  function render() {
    closeDetail();
    const meta=info[metric];
    text('#performance-title',meta.title);
    text('#performance-kicker',`Financial performance / ${metric==='margin'?'Percent of revenue':'USD'}`);
    text('#performance-explanation',meta.explanation+' Hover for exact values, or select a period to explore.');
    text('#performance-unit',`${meta.unit} · Nine months ended at fiscal Q3`);
    text('#metric-definition',meta.definition);text('#metric-formula',meta.formula);
    const source = document.querySelector('#performance-source');
    source.href=periods.at(-1)?.source || 'https://investor.apple.com/';
    source.textContent=metric==='margin' ? 'Calculated from Apple Q3 FY2026 Form 10-Q · Statement of operations ↗' : `${meta.label} source: Apple Q3 FY2026 Form 10-Q · Statement of operations ↗`;
    document.querySelectorAll('[data-metric]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.metric===metric)));
    pointHost.replaceChildren();
    periods.forEach((period,index)=>{
      const value=adapter.metricValue(period,metric);
      const button=document.createElement('button');button.type='button';button.dataset.period=period.id;button.disabled=!finite(value);
      button.setAttribute('aria-pressed','false');button.setAttribute('aria-controls','performance-detail');
      button.textContent=`${period.label} · ${formatted(value,metric)}`;
      button.setAttribute('aria-label',`${period.duration} ended ${period.end}. ${meta.label}: ${formatted(value,metric)}. Select for explanation.`);
      button.addEventListener('click',()=>selectPeriod(index));pointHost.append(button);
    });
    const available=periods.some(period=>finite(adapter.metricValue(period,metric)));
    empty.hidden=available&&Boolean(chart);
    empty.textContent=!available?'No comparable data is available for this metric.': 'The chart could not load. Use the period buttons to explore the exact values.';
    host.hidden=!available||!chart;
    if(!chart||!available)return;
    const color=getComputedStyle(document.body);
    const token=name=>color.getPropertyValue(name).trim();
    chart.setOption({
      animation:!media.matches,animationDuration:250,animationDurationUpdate:250,
      textStyle:{fontFamily:token('--eb-font'),color:token('--eb-text-secondary')},
      aria:{enabled:true,label:{description:`${company.name}. ${meta.label}, ${meta.unit}. Two comparable nine-month periods. Use the period buttons below the chart for keyboard access to exact values and explanations.`}},
      grid:{top:44,right:24,bottom:58,left:62,containLabel:true},
      tooltip:{trigger:'item',confine:true,position:(point,params,dom,rect,size)=>[Math.max(8,Math.min(point[0]+12,size.viewSize[0]-Math.min(size.contentSize[0],size.viewSize[0]-16)-8)),8],renderMode:'html',extraCssText:'max-width:min(280px,calc(100% - 16px));white-space:normal;overflow-wrap:anywhere;box-sizing:border-box;',backgroundColor:token('--eb-surface'),borderColor:token('--eb-border'),textStyle:{color:token('--eb-text'),fontSize:12,lineHeight:20},formatter:params=>{
        const period=periods[params.dataIndex];return `<strong>${period.label}</strong><br>Nine months ended ${period.end}<br>${meta.label}: <strong>${formatted(adapter.metricValue(period,metric),metric)}</strong><br>${meta.unit}`;
      }},
      xAxis:{type:'category',name:'Comparable reporting period',nameLocation:'middle',nameGap:36,data:periods.map(p=>p.label),axisLine:{lineStyle:{color:token('--eb-border')}},axisTick:{show:false},axisLabel:{color:token('--eb-text-secondary'),fontSize:12}},
      yAxis:{type:'value',name:meta.unit,nameTextStyle:{color:token('--eb-text-secondary')},axisLabel:{color:token('--eb-text-secondary'),formatter:value=>metric==='margin'?`${value}%`:`$${value}B`},splitLine:{lineStyle:{color:token('--eb-border')}},min:values=>Math.min(0,values.min)},
      series:[{id:'financial-performance',type:'bar',barMaxWidth:100,emphasis:{itemStyle:{color:token('--eb-link')}},data:periods.map((period,index)=>({id:period.id,value:adapter.metricValue(period,metric),itemStyle:{color:index===periods.length-1?token('--eb-accent'):token('--eb-chart-prior'),borderRadius:[3,3,0,0]}}))}]
    });
    chart.resize();
  }
  chart?.on('click',params=>{if(params.componentType==='series')selectPeriod(params.dataIndex);});
  document.querySelectorAll('[data-metric]').forEach(button=>button.addEventListener('click',()=>{metric=button.dataset.metric;render();}));
  document.querySelector('#close-performance-detail').addEventListener('click',()=>closeDetail(true));
  detail.addEventListener('keydown',event=>{if(event.key==='Escape')closeDetail(true);});
  if (window.ResizeObserver) new ResizeObserver(()=>chart?.resize()).observe(host);
  else window.addEventListener('resize',()=>chart?.resize());
  media.addEventListener('change',render);
  // Fragment links into previously visible content must still open their disclosure.
  const revealFragment=()=>{
    let id;try { id=decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target=id?document.getElementById(id):null;
    if(target){if(target.tagName==='DETAILS')target.open=true;let parent=target.parentElement;while(parent){if(parent.tagName==='DETAILS')parent.open=true;parent=parent.parentElement;}}
  };
  window.addEventListener('hashchange',revealFragment);revealFragment();render();
})();
