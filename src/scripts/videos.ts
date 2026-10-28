/** Plays demo clips only while in view; with reduced motion they stay on the poster frame. */
export function initVideos() {
  const vids = [...document.querySelectorAll<HTMLVideoElement>('video[data-demo]')];
  if (!vids.length) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const v = e.target as HTMLVideoElement;
        if (e.isIntersecting) {
          if (v.preload === 'none') {
            v.preload = 'auto';
            v.load();
          }
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      }
    },
    { threshold: 0.25 },
  );
  vids.forEach((v) => io.observe(v));
}
