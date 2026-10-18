(() => {
  const picker = document.querySelector('.language-picker');
  if (!picker) return;
  const url = new URL(window.location.href);
  const isProxy = url.hostname.endsWith('.translate.goog');
  const requested = isProxy ? url.searchParams.get('_x_tr_tl') : null;
  const language = requested === 'en' ? 'en' : requested?.startsWith('zh') ? 'zh-CN' : picker.dataset.nativeLanguage;
  picker.querySelector('[data-language-label]').textContent = language === 'en' ? 'English' : '中文';
  const original = new URL(picker.dataset.pageUrl);
  original.hash = url.hash;
  if (!isProxy && url.protocol.startsWith('http')) original.search = url.search;
  picker.querySelectorAll('[data-language]').forEach(link => {
    const target = link.dataset.language;
    if (target === language) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
    if (target === picker.dataset.nativeLanguage) {
      link.href = original.href;
    } else {
      const translated = new URL('https://translate.google.com/translate');
      translated.search = new URLSearchParams({sl:'auto',tl:target,hl:target,u:original.href}).toString();
      link.href = translated.href;
    }
  });
  document.addEventListener('click', event => { if (!picker.contains(event.target)) picker.open = false; });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && picker.open) { picker.open = false; picker.querySelector('summary').focus(); }
  });
})();
