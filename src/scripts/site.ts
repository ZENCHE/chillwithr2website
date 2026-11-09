const button = document.querySelector<HTMLButtonElement>('#intro-audio');
const audio = document.querySelector<HTMLAudioElement>('#bumper');
const show = document.querySelector<HTMLElement>('.show');
const label = button?.querySelector('span');

function setPlaying(playing: boolean) {
  button?.setAttribute('aria-pressed', String(playing));
  show?.classList.toggle('playing', playing);
  if (label) label.textContent = playing ? 'Stop intro' : 'Play intro';
}
function stop() {
  audio?.pause();
  if (audio) audio.currentTime = 0;
  setPlaying(false);
}
button?.addEventListener('click', async () => {
  if (!audio) return;
  if (button.getAttribute('aria-pressed') === 'true') {
    stop();
    return;
  }
  setPlaying(true);
  audio.currentTime = 0;
  try {
    await audio.play();
  } catch {
    setPlaying(false);
    if (label) label.textContent = 'Audio unavailable';
  }
});
audio?.addEventListener('ended', () => setPlaying(false));
document.addEventListener('visibilitychange', () => {
  if (document.hidden) stop();
});

