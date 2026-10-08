// Mobile only; desktop cards and translations retain their original markup.
document.addEventListener('DOMContentLoaded', () => {
  const media = window.matchMedia('(max-width: 47.999rem)');
  const items = [...document.querySelectorAll('.services .service_box')].map((card, index) => {
    const heading = card.querySelector('.box_title h3');
    const panel = card.querySelector('.box_txt');
    if (!heading || !panel) return null;
    heading.classList.add('service_heading');
    const original = document.createElement('span');
    original.textContent = heading.textContent;
    const key = heading.getAttribute('data-i18n');
    if (key) original.setAttribute('data-i18n', key);
    heading.removeAttribute('data-i18n');
    heading.replaceChildren(original);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'service_toggle';
    button.id = `service-toggle-${index}`;
    panel.id = `service-panel-${index}`;
    button.setAttribute('aria-controls', panel.id);
    button.append(original.cloneNode(true));
    heading.append(button);
    const item = { button, panel, open: false };
    button.addEventListener('click', () => {
      if (!media.matches) return;
      const open = !item.open;
      items.forEach(other => { other.open = other === item && open; });
      render();
    });
    return item;
  }).filter(Boolean);
  function render() {
    items.forEach(({button, panel, open}) => {
      button.setAttribute('aria-expanded', String(media.matches && open));
      panel.hidden = media.matches && !open;
    });
  }
  media.addEventListener('change', render);
  render();
});
