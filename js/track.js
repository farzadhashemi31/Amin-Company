document.addEventListener('DOMContentLoaded', () => {
  const inner = document.getElementById('tickerInner');
  const set = document.getElementById('tickerSet');
  if (!inner || !set) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clone = set.cloneNode(true);
  clone.removeAttribute('id');
  clone.setAttribute('aria-hidden', 'true');
  inner.appendChild(clone);

  if (reduceMotion) return;

  let x = 0;
  let setWidth = 1;
  let targetSpeed = 55; // pixels per second
  let currentSpeed = 55;
  let lastTime = performance.now();
  let running = false;
  let raf = 0;

  const measure = () => {
    setWidth = Math.max(set.getBoundingClientRect().width, 1);
  };
  measure();

  const resizeObserver = new ResizeObserver(measure);
  resizeObserver.observe(set);

  function tick(now) {
    if (!running) return;
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    currentSpeed += (targetSpeed - currentSpeed) * Math.min(dt * 7, 1);
    x -= currentSpeed * dt;
    if (-x >= setWidth) x += setWidth;
    inner.style.transform = `translate3d(${x}px,0,0)`;
    raf = requestAnimationFrame(tick);
  }

  const start = () => {
    if (running || document.hidden) return;
    running = true;
    lastTime = performance.now();
    raf = requestAnimationFrame(tick);
  };
  const stop = () => {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  };

  const visibilityObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting ? start() : stop());
  }, { rootMargin: '100px 0px' });
  visibilityObserver.observe(inner.parentElement);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (inner.parentElement.getBoundingClientRect().bottom > 0 && inner.parentElement.getBoundingClientRect().top < innerHeight) start();
  });

  const ticker = inner.parentElement;
  ticker.addEventListener('mouseenter', () => { targetSpeed = 18; });
  ticker.addEventListener('mouseleave', () => { targetSpeed = 55; });
});
