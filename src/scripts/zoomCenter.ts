/**
 * Below desktop width, hover-zoomed media stays anchored to its outer viewport edge and grows toward the centre,
 * capped so it never spills off-screen. Anchoring keeps the pointer inside the clip, so the zoom can't flicker.
 */
export function initZoomCenter() {
  const small = matchMedia('(max-width: 1023px)');
  document.addEventListener(
    'pointerover',
    (e) => {
      const el = (e.target as Element).closest?.('.demo-clip') as HTMLElement | null;
      if (!el || !small.matches) return;
      const r = el.getBoundingClientRect();
      const vw = document.documentElement.clientWidth;
      const fromLeft = r.left + r.width / 2 < vw / 2;
      const room = fromLeft ? vw - 8 - r.left : r.right - 8;
      el.style.setProperty('--zo', fromLeft ? 'left' : 'right');
      el.style.setProperty('--zs', String(Math.max(1, Math.min(1.5, room / r.width))));
    },
    { passive: true },
  );
}
