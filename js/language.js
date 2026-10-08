async function setLanguage(lang) {
  const safeLang = lang === 'fa' ? 'fa' : 'en';
  try {
    const url = new URL(`./js/language/${safeLang}.json`, document.baseURI);
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Language file failed: ${response.status}`);
    const translations = await response.json();

    localStorage.setItem('lang', safeLang);
    document.documentElement.lang = safeLang;
    document.documentElement.dataset.language = safeLang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (Object.prototype.hasOwnProperty.call(translations, key)) el.textContent = translations[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (Object.prototype.hasOwnProperty.call(translations, key)) el.setAttribute('placeholder', translations[key]);
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
      const key = el.getAttribute('data-i18n-aria-label');
      if (Object.prototype.hasOwnProperty.call(translations, key)) el.setAttribute('aria-label', translations[key]);
    });

    window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: safeLang } }));
    return safeLang;
  } catch (error) {
    console.error('Language switch failed:', error);
    return null;
  }
}
