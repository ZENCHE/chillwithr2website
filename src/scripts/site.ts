const root = document.documentElement;
const hero = document.querySelector<HTMLElement>(".hero")!;
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const fine = matchMedia("(pointer: fine)");
let enabled = !reduced.matches,
  visible = true,
  raf = 0,
  last = 0;
let targetX = 0,
  targetY = 0,
  x = 0,
  y = 0,
  scrollProgress = 0;
const frameIntervals: number[] = [];
root.classList.add("enhanced");
hero.dataset.renderer = "css";
function updateMotion() {
  root.classList.toggle("motion-off", !enabled);
  if (!enabled) {
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
  const moving =
    enabled && (Math.abs(x - targetX) > 0.001 || Math.abs(y - targetY) > 0.001);
  if (moving) wake();
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
reduced.addEventListener("change", () => {
  enabled = !reduced.matches;
  updateMotion();
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    cancelAnimationFrame(raf);
    raf = 0;
    targetX = targetY = 0;
  } else wake();
});
window.addEventListener("pagehide", () => {
  observer.disconnect();
  cancelAnimationFrame(raf);
  raf = 0;
});
window.addEventListener("pageshow", () => {
  observer.observe(hero);
  wake();
});
updateMotion();
