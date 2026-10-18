(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  const close = () => { nav?.classList.remove('is-open'); toggle?.setAttribute('aria-expanded', 'false'); };
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav?.classList.toggle('is-open', open);
  });
  nav?.addEventListener('click', e => { if (e.target.closest('a')) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { close(); toggle?.focus(); } });
  document.addEventListener('click', e => { if (!nav?.contains(e.target) && !toggle?.contains(e.target)) close(); });
  const search = document.querySelector('#company-search');
  if (!search) return;
  let market = 'all';
  const cards = [...document.querySelectorAll('[data-company]')];
  const update = () => {
    const query = search.value.trim().toLowerCase();
    let count = 0;
    cards.forEach(card => {
      const show = (market === 'all' || card.dataset.market === market) && card.dataset.company.includes(query);
      card.hidden = !show;
      if (show) count++;
    });
    document.querySelector('#result-count').textContent = `${count} 家公司`;
    document.querySelector('.empty-state').hidden = count !== 0;
  };
  update();
  search.addEventListener('input', update);
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    market = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(item => {
      const selected = item === button;
      item.classList.toggle('selected', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    update();
  }));
})();
