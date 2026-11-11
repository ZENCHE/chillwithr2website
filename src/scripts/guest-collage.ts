document.querySelectorAll<HTMLElement>('[data-guest-collage]').forEach(collage => {
  let active: HTMLElement | null = null;
  let pinned = false;
  const close = () => {
    if (!active) return;
    active.classList.remove('is-open');
    active.querySelector('button')!.setAttribute('aria-expanded', 'false');
    active.querySelector<HTMLElement>('.collage-bio')!.hidden = true;
    active = null;
    pinned = false;
  };
  const position = () => {
    if (!active) return;
    const panel = active.querySelector<HTMLElement>('.collage-bio')!;
    const card = active.getBoundingClientRect();
    const stage = collage.getBoundingClientRect();
    const width = panel.offsetWidth;
    const left = Math.max(stage.left, Math.min(card.left + (card.width - width) / 2, stage.right - width));
    panel.style.left = `${left - card.left}px`;
    panel.classList.remove('is-below');
    panel.classList.toggle('is-below', panel.getBoundingClientRect().top < 12);
  };
  const open = (card: HTMLElement) => {
    if (active === card) return;
    close();
    active = card;
    card.classList.add('is-open');
    card.querySelector('button')!.setAttribute('aria-expanded', 'true');
    card.querySelector<HTMLElement>('.collage-bio')!.hidden = false;
    position();
  };
  collage.querySelectorAll<HTMLElement>('.collage-guest').forEach(card => {
    const button = card.querySelector('button')!;
    card.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') open(card); });
    card.addEventListener('pointerleave', () => {
      if (active === card && !pinned && !card.contains(document.activeElement)) close();
    });
    button.addEventListener('focus', () => open(card));
    button.addEventListener('blur', () => { if (active === card && !pinned) close(); });
    button.addEventListener('click', () => {
      if (active === card && pinned) close();
      else { open(card); pinned = true; }
    });
  });
  document.addEventListener('pointerdown', event => { if (!collage.contains(event.target as Node)) close(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  window.addEventListener('resize', position, { passive: true });
});
