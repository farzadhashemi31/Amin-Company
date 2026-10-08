document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = [...document.querySelectorAll('.reveal')];

  if (reduceMotion) {
    reveals.forEach(el => el.classList.add('visible'));
    return;
  }

  // Header content should appear immediately without waiting for scroll.
  document.querySelectorAll('header .reveal').forEach((el, index) => {
    el.style.setProperty('--reveal-delay', `${Math.min(index * 45, 180)}ms`);
    requestAnimationFrame(() => el.classList.add('visible'));
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -8% 0px'
  });

  reveals.forEach(el => {
    if (!el.closest('header')) observer.observe(el);
  });
});
