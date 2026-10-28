/** Staggered blur-up entrance. Above-the-fold first (50ms steps, max 8), the rest once on scroll. */
export function initReveal() {
  const root = document.documentElement;
  const items = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
  root.classList.add('js-ready');
  if (!items.length) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const vh = innerHeight;
  let n = 0;
  const below: HTMLElement[] = [];
  const first: HTMLElement[] = [];
  for (const el of items) {
    const r = el.getBoundingClientRect();
    if (r.top < vh && r.bottom > 0) {
      el.style.setProperty('--reveal-delay', `${40 + Math.min(n, 8) * 50}ms`);
      n++;
      first.push(el);
    } else {
      below.push(el);
    }
  }
  // Flush styles so the hidden state is committed, then transition to the visible state.
  void document.body.offsetHeight;
  first.forEach((el) => el.classList.add('is-in'));

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        (e.target as HTMLElement).classList.add('is-in');
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.01 },
  );
  below.forEach((el) => io.observe(el));

  // Anything hash-navigated or printed should never stay hidden.
  addEventListener('beforeprint', () => items.forEach((el) => el.classList.add('is-in')));
}
