const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function animateCounter(el, duration = 1600) {
  const target = Number(el.dataset.target || 0);
  if (reduceMotion) {
    el.textContent = target.toLocaleString('en');
    return;
  }

  const start = performance.now();
  const easeOut = t => 1 - Math.pow(1 - t, 3);

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(easeOut(progress) * target).toLocaleString('en');
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const counters = [...document.querySelectorAll('[data-target]')];
const counterObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    animateCounter(entry.target);
    obs.unobserve(entry.target);
  });
}, { threshold: 0.35 });

counters.forEach(el => counterObserver.observe(el));
