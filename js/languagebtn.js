let currentLang = localStorage.getItem('lang') === 'fa' ? 'fa' : 'en';

function syncLanguageButtons(lang) {
  const isFa = lang === 'fa';
  ['langBtn', 'langBtn_mobile'].forEach((btnId) => {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.classList.toggle('rtl', isFa);
    btn.setAttribute('aria-label', isFa ? 'Switch language to English' : 'تغییر زبان به فارسی');
  });

  [
    { en: 'enOpt', fa: 'faOpt' },
    { en: 'enOpt_mobile', fa: 'faOpt_mobile' }
  ].forEach(({ en, fa }) => {
    const enEl = document.getElementById(en);
    const faEl = document.getElementById(fa);
    if (!enEl || !faEl) return;
    enEl.className = `lang-option ${isFa ? 'inactive' : 'active'}`;
    faEl.className = `lang-option ${isFa ? 'active' : 'inactive'}`;
  });
}

async function applyLanguage(lang) {
  const applied = await setLanguage(lang);
  if (!applied) return;
  currentLang = applied;
  syncLanguageButtons(applied);
}

function toggleLang() {
  applyLanguage(currentLang === 'en' ? 'fa' : 'en');
}

syncLanguageButtons(currentLang);
applyLanguage(currentLang);
