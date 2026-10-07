document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('dropdown-btn');
  const menu = document.getElementById('dropdown-menu');
  const arrow = document.getElementById('dropdown-arrow');

  if (btn && menu && arrow) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = menu.classList.toggle('open');
      arrow.classList.toggle('rotate-180', isOpen);
      btn.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (e) => {
      const parent = document.getElementById('dropdown-parent');
      if (parent && !parent.contains(e.target)) {
        menu.classList.remove('open');
        arrow.classList.remove('rotate-180');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const burgerBtn = document.getElementById('burger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobilePanel = mobileMenu?.querySelector('.mobile_menu_panel');
  const mobileCloseBtn = document.getElementById('mobile-menu-close');
  const mobileDropBtn = document.getElementById('mobile-dropdown-btn');
  const mobileDropMenu = document.getElementById('mobile-dropdown');
  const mobileArrow = document.getElementById('mobile-arrow');

  const closeMobileDropdown = () => {
    if (!mobileDropBtn || !mobileDropMenu || !mobileArrow) return;
    mobileDropMenu.classList.remove('open');
    mobileArrow.classList.remove('rotate-180');
    mobileDropBtn.setAttribute('aria-expanded', 'false');
  };

  const setMenuState = (open) => {
    if (!burgerBtn || !mobileMenu) return;
    mobileMenu.classList.toggle('open', open);
    burgerBtn.classList.toggle('is-open', open);
    burgerBtn.setAttribute('aria-expanded', String(open));
    burgerBtn.setAttribute('aria-label', open ? 'بستن منو' : 'باز کردن منو');
    mobileMenu.setAttribute('aria-hidden', String(!open));
    document.documentElement.classList.toggle('menu-open', open);
    document.body.classList.toggle('menu-open', open);
    if (!open) closeMobileDropdown();
  };

  if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', () => {
      setMenuState(!mobileMenu.classList.contains('open'));
    });

    mobileCloseBtn?.addEventListener('click', () => {
      if (mobileCloseBtn.classList.contains('is-closing')) return;
      mobileCloseBtn.classList.add('is-closing');
      window.setTimeout(() => {
        setMenuState(false);
        mobileCloseBtn.classList.remove('is-closing');
        burgerBtn.focus();
      }, 140);
    });

    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) setMenuState(false);
    });

    mobilePanel?.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuState(false));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        setMenuState(false);
        burgerBtn.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1280 && mobileMenu.classList.contains('open')) {
        setMenuState(false);
      }
    });
  }

  if (mobileDropBtn && mobileDropMenu && mobileArrow) {
    mobileDropBtn.addEventListener('click', () => {
      const isOpen = mobileDropMenu.classList.toggle('open');
      mobileArrow.classList.toggle('rotate-180', isOpen);
      mobileDropBtn.setAttribute('aria-expanded', String(isOpen));
    });
  }
});
