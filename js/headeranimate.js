document.addEventListener('DOMContentLoaded', () => {
  const canTilt = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!canTilt || reduceMotion) return;

  document.querySelectorAll('[data-tilt]').forEach(card => {
    let raf = 0;
    let rect = null;
    let lastX = 0;
    let lastY = 0;
    const strength = Number(card.dataset.tiltStrength || 10);

    const render = () => {
      raf = 0;
      if (!rect) return;
      const x = (lastX - rect.left) / rect.width - 0.5;
      const y = (lastY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(850px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) translateZ(0) scale(1.012)`;
    };

    card.addEventListener('pointerenter', () => {
      rect = card.getBoundingClientRect();
    });

    card.addEventListener('pointermove', e => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!raf) raf = requestAnimationFrame(render);
    }, { passive: true });

    card.addEventListener('pointerleave', () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      rect = null;
      card.style.transform = 'perspective(850px) rotateY(0) rotateX(0) translateZ(0) scale(1)';
    });
  });
});
