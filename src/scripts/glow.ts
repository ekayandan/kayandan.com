/** Soft cursor-following glow. Viewport-fixed, behind content, lerped, pointer-only. */
export function initGlow() {
  const el = document.querySelector<HTMLElement>('[data-glow]');
  if (!el) return;
  const mq = matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)');
  let enabled = false;
  let tx = innerWidth / 2;
  let ty = innerHeight * 0.3;
  let x = tx;
  let y = ty;
  let raf = 0;

  const tick = () => {
    x += (tx - x) * 0.18;
    y += (ty - y) * 0.18;
    el.style.setProperty('--mx', `${x.toFixed(1)}px`);
    el.style.setProperty('--my', `${y.toFixed(1)}px`);
    raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(tick) : 0;
  };
  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    tx = e.clientX;
    ty = e.clientY;
    el.classList.add('is-on');
    if (!raf) raf = requestAnimationFrame(tick);
  };
  const onLeave = () => el.classList.remove('is-on');

  const enable = () => {
    if (enabled) return;
    enabled = true;
    addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
  };
  const disable = () => {
    if (!enabled) return;
    enabled = false;
    removeEventListener('pointermove', onMove);
    document.documentElement.removeEventListener('pointerleave', onLeave);
    el.classList.remove('is-on');
    cancelAnimationFrame(raf);
    raf = 0;
  };
  const sync = () => (mq.matches ? enable() : disable());
  mq.addEventListener('change', sync);
  sync();
}
