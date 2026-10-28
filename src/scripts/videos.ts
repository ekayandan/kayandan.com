/**
 * Demo clips loop only while in view, each starting after its own random delay so they never run in sync.
 * A watchdog restarts any in-view clip the browser paused or that ended. With reduced motion they stay on the poster.
 */
export function initVideos() {
  const vids = [...document.querySelectorAll<HTMLVideoElement>('video[data-demo]')];
  if (!vids.length) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

  const visible = new Set<HTMLVideoElement>();
  const timers = new Map<HTMLVideoElement, number>();

  const play = (v: HTMLVideoElement) => {
    v.loop = true;
    v.muted = true;
    if (v.preload === 'none') {
      v.preload = 'auto';
      v.load();
    }
    v.play().catch(() => {});
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const v = e.target as HTMLVideoElement;
        if (e.isIntersecting) {
          visible.add(v);
          if (!timers.has(v) && v.paused) {
            timers.set(
              v,
              window.setTimeout(() => {
                timers.delete(v);
                if (visible.has(v)) play(v);
              }, Math.random() * 2500),
            );
          }
        } else {
          visible.delete(v);
          clearTimeout(timers.get(v));
          timers.delete(v);
          v.pause();
        }
      }
    },
    { threshold: 0.1 },
  );
  vids.forEach((v) => {
    v.loop = true;
    v.addEventListener('ended', () => visible.has(v) && play(v));
    io.observe(v);
  });

  setInterval(() => {
    if (document.hidden) return;
    for (const v of visible) if (v.paused && !timers.has(v)) play(v);
  }, 1500);
}
