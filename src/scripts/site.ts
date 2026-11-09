const root = document.documentElement;
const hero = document.querySelector<HTMLElement>(".hero")!;
const button = document.querySelector<HTMLButtonElement>("#intro-audio")!;
const audio = document.querySelector<HTMLAudioElement>("#bumper")!;
const label = button.querySelector("span:last-child")!;
const icon = button.querySelector(".audio-icon")!;
const motionButton =
  document.querySelector<HTMLButtonElement>("#motion-toggle")!;
const bars = [...document.querySelectorAll<HTMLElement>(".meter i")];
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const fine = matchMedia("(pointer: fine)");
let enabled = !reduced.matches,
  visible = true,
  playing = false,
  raf = 0,
  last = 0;
let targetX = 0,
  targetY = 0,
  x = 0,
  y = 0,
  scrollProgress = 0;
let playRequest = 0;
const frameIntervals: number[] = [];
let context: AudioContext | undefined,
  analyser: AnalyserNode | undefined,
  samples: Uint8Array<ArrayBuffer> | undefined;
root.classList.add("enhanced");
hero.dataset.renderer = "css";
motionButton.hidden = false;
function updateMotion() {
  motionButton.disabled = reduced.matches;
  root.classList.toggle("motion-off", !enabled);
  motionButton.setAttribute("aria-pressed", String(enabled));
  motionButton.querySelector("span:last-child")!.textContent = enabled
    ? "Motion on"
    : "Motion off";
  if (!enabled) {
    bars.forEach((b) => b.style.removeProperty("height"));
    hero.style.setProperty("--energy", "0");
    targetX = targetY = x = y = scrollProgress = 0;
    root.style.setProperty("--px", "0");
    root.style.setProperty("--py", "0");
    root.style.setProperty("--scroll", "0");
  }
  wake();
}
function wake() {
  if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame);
}
function frame(time: number) {
  raf = 0;
  const dt = Math.min((time - last) / 1000 || 0.016, 0.05);
  if (import.meta.env.DEV && last && time - last < 80) {
    frameIntervals.push(time - last);
    if (frameIntervals.length > 180) frameIntervals.shift();
    if (frameIntervals.length % 30 === 0) {
      const sorted = [...frameIntervals].sort((a, b) => a - b);
      hero.dataset.motionProfile = JSON.stringify({
        frames: sorted.length,
        medianMs: sorted[Math.floor(sorted.length * 0.5)],
        p95Ms: sorted[Math.floor(sorted.length * 0.95)],
      });
    }
  }
  last = time;
  if (!visible || document.hidden) return;
  const k = 1 - Math.exp(-7 * dt);
  x += (targetX - x) * k;
  y += (targetY - y) * k;
  if (enabled) {
    root.style.setProperty("--px", x.toFixed(4));
    root.style.setProperty("--py", y.toFixed(4));
    root.style.setProperty("--scroll", scrollProgress.toFixed(4));
  }
  let energy = 0;
  if (playing && analyser && samples && enabled) {
    analyser.getByteFrequencyData(samples);
    for (let i = 0; i < bars.length; i++) {
      const v = samples[2 + i * 3] / 255;
      energy += v;
      bars[i].style.height = `${Math.max(8, v * 100)}%`;
    }
    energy /= bars.length;
    hero.style.setProperty("--energy", energy.toFixed(3));
  }

  const moving =
    enabled && (Math.abs(x - targetX) > 0.001 || Math.abs(y - targetY) > 0.001);
  if (moving || (playing && enabled)) wake();
}
hero.addEventListener(
  "pointermove",
  (e) => {
    if (!enabled || !fine.matches || e.pointerType === "touch") return;
    const r = hero.getBoundingClientRect();
    targetX = ((e.clientX - r.left) / r.width - 0.5) * 2;
    targetY = ((e.clientY - r.top) / r.height - 0.5) * 2;
    wake();
  },
  { passive: true },
);
function resetPointer() {
  targetX = targetY = 0;
  wake();
}
hero.addEventListener("pointerleave", resetPointer);
window.addEventListener("blur", resetPointer);
window.addEventListener(
  "scroll",
  () => {
    if (enabled) {
      scrollProgress = Math.min(
        1,
        Math.max(0, window.scrollY / hero.offsetHeight),
      );
      wake();
    }
  },
  { passive: true },
);
const observer = new IntersectionObserver(
  (entries) => {
    visible = entries[0].isIntersecting;
    if (visible) wake();
    else {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  },
  { threshold: 0 },
);
observer.observe(hero);
motionButton.addEventListener("click", () => {
  enabled = !enabled;
  updateMotion();
});
reduced.addEventListener("change", () => {
  enabled = !reduced.matches;
  updateMotion();
});
function setPlaying(value: boolean) {
  playing = value;
  button.setAttribute("aria-pressed", String(value));
  hero.classList.toggle("playing", value);
  label.textContent = value ? "Stop intro" : "Play intro";
  icon.textContent = value ? "■" : "▶";
  if (!value) {
    bars.forEach((b) => b.style.removeProperty("height"));
    hero.style.setProperty("--energy", "0");
  }
  wake();
}
function stop() {
  playRequest++;
  audio.pause();
  audio.currentTime = 0;
  setPlaying(false);
  context?.suspend();
}
button.addEventListener("click", async () => {
  if (playing) {
    stop();
    return;
  }
  const request = ++playRequest;
  button.disabled = true;
  try {
    if (!context) {
      try {
        context = new AudioContext();
        analyser = context.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.75;
        samples = new Uint8Array(analyser.frequencyBinCount);
        const source = context.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(context.destination);
      } catch {
        analyser = undefined;
      }
    }
    if (context) await context.resume();
    if (request !== playRequest || document.hidden) return;
    audio.currentTime = 0;
    await audio.play();
    if (request !== playRequest || document.hidden) {
      audio.pause();
      return;
    }
    setPlaying(true);
  } catch {
    setPlaying(false);
    label.textContent = "Audio unavailable";
  } finally {
    button.disabled = false;
  }
});
audio.addEventListener("ended", () => {
  setPlaying(false);
  context?.suspend();
});
audio.addEventListener("error", () => {
  setPlaying(false);
  label.textContent = "Audio unavailable";
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stop();
    cancelAnimationFrame(raf);
    raf = 0;
    targetX = targetY = 0;
  } else wake();
});
window.addEventListener("pagehide", () => {
  stop();
  observer.disconnect();
  cancelAnimationFrame(raf);
  raf = 0;
});
window.addEventListener("pageshow", () => {
  observer.observe(hero);
  wake();
});
updateMotion();
