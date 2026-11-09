const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealItems = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
if ('IntersectionObserver' in window && !reduceMotion) {
  const observer = new IntersectionObserver((entries, instance) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        instance.unobserve(entry.target);
      }
    }
  }, { threshold: 0.08, rootMargin: '0px 0px 40px 0px' });
  document.documentElement.classList.add('js');
  revealItems.forEach((item) => observer.observe(item));
}

const filterButtons = [...document.querySelectorAll<HTMLButtonElement>('[data-filter]')];
const episodeCards = [...document.querySelectorAll<HTMLElement>('[data-channels]')];
const filterCount = document.querySelector<HTMLElement>('#filter-count');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter ?? 'all';
    filterButtons.forEach((candidate) => {
      const active = candidate === button;
      candidate.classList.toggle('active', active);
      candidate.setAttribute('aria-pressed', String(active));
    });
    let shown = 0;
    episodeCards.forEach((card) => {
      const matches = filter === 'all' || (card.dataset.channels ?? '').split(' ').includes(filter);
      card.hidden = !matches;
      if (matches) shown++;
    });
    if (filterCount) {
      filterCount.textContent = filter === 'all'
        ? 'SHOWING ALL CONVERSATIONS'
        : `SHOWING ${shown} ${filter.toUpperCase()} CONVERSATION${shown === 1 ? '' : 'S'}`;
    }
  });
});

const studioSwitch = document.querySelector<HTMLButtonElement>('#studio-switch');
const bumper = document.querySelector<HTMLAudioElement>('#bumper');
const hero = document.querySelector<HTMLElement>('.show');
const switchCopy = studioSwitch?.querySelector<HTMLElement>('.switch-copy');

studioSwitch?.addEventListener('click', () => {
  const turnOn = studioSwitch.getAttribute('aria-pressed') !== 'true';
  studioSwitch.setAttribute('aria-pressed', String(turnOn));
  hero?.classList.toggle('studio-on', turnOn);
  if (switchCopy?.firstChild) switchCopy.firstChild.textContent = turnOn ? 'SWITCH OFF THE STUDIO ' : 'SWITCH ON THE STUDIO ';
  if (bumper) {
    if (turnOn) {
      bumper.currentTime = 0;
      void bumper.play().catch(() => { /* Lighting still works when audio is blocked. */ });
    } else {
      bumper.pause();
      bumper.currentTime = 0;
    }
  }
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) bumper?.pause();
});

const progressBar = document.querySelector<HTMLElement>('#scroll-progress-bar');
let progressFrame = 0;
const updateProgress = () => {
  progressFrame = 0;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  if (progressBar) progressBar.style.width = `${scrollable > 0 ? Math.min(100, window.scrollY / scrollable * 100) : 0}%`;
};
window.addEventListener('scroll', () => {
  if (!progressFrame) progressFrame = requestAnimationFrame(updateProgress);
}, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();
