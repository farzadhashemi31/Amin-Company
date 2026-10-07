  const cards  = Array.from(document.querySelectorAll('.card'));
  const dotsEl = document.getElementById('dots');
  const total  = cards.length;
  let current  = 0;

  cards.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(d);
  });

  function getOffset(idx) {
    let diff = idx - current;
    if (diff > Math.floor(total / 2))  diff -= total;
    if (diff < -Math.floor(total / 2)) diff += total;
    return diff;
  }

  function render() {
    cards.forEach((card, i) => {
      const o = getOffset(i);
      card.classList.remove('pos--2','pos--1','pos-0','pos-1','pos-2','pos-hidden','active');
      if      (o ===  0) card.classList.add('pos-0',  'active');
      else if (o === -1) card.classList.add('pos--1');
      else if (o ===  1) card.classList.add('pos-1');
      else if (o === -2) card.classList.add('pos--2');
      else if (o ===  2) card.classList.add('pos-2');
      else               card.classList.add('pos-hidden');
    });
    document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function goTo(idx) {
    current = ((idx % total) + total) % total;
    render();
  }

  document.getElementById('btn-prev').addEventListener('click', e => { e.stopPropagation(); goTo(current - 1); });
  document.getElementById('btn-next').addEventListener('click', e => { e.stopPropagation(); goTo(current + 1); });
  cards.forEach((card, i) => card.addEventListener('click', () => { if (i !== current) goTo(i); }));
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  goTo(current + 1);
    if (e.key === 'ArrowRight') goTo(current - 1);
  });

  let deskStartX = 0;
  const deskWrap = document.getElementById('carousel');
  deskWrap.addEventListener('touchstart', e => { deskStartX = e.touches[0].clientX; });
  deskWrap.addEventListener('touchend',   e => {
    const diff = deskStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });

  render();


  const mTrack   = document.getElementById('m-track');
  const mDotsEl  = document.getElementById('m-dots');
  const mCards   = mTrack.querySelectorAll('.mobile-card');
  const mTotal   = mCards.length;
  let   mCurrent = 0;

  mCards.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'mobile-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => mGoTo(i));
    mDotsEl.appendChild(d);
  });
function mRender() {
    mTrack.style.transform = `translateX(-${mCurrent * 100}%)`;
    document.querySelectorAll('.mobile-dot').forEach((d, i) => d.classList.toggle('active', i === mCurrent));
  }

  function mGoTo(idx) {
    mCurrent = ((idx % mTotal) + mTotal) % mTotal;
    mRender();
  }

  document.getElementById('m-prev').addEventListener('click', () => mGoTo(mCurrent - 1));
  document.getElementById('m-next').addEventListener('click', () => mGoTo(mCurrent + 1));

  
  let mStartX = 0;
  const mWrap = document.getElementById('m-wrap');
  mWrap.addEventListener('touchstart', e => { mStartX = e.touches[0].clientX; }, { passive: true });
  mWrap.addEventListener('touchend',   e => {
    const diff = mStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) mGoTo(diff > 0 ? mCurrent + 1 : mCurrent - 1);
  });

  mRender();