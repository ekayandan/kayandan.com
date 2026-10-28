/** Scroll-spy: marks the nav link of the section that currently owns the top of the viewport. */
export function initSpy() {
  const navs = [...document.querySelectorAll<HTMLElement>('[data-nav]')];
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];
  const sections = [...document.querySelectorAll<HTMLElement>('main section[id]')];
  if (!links.length || !sections.length) return;

  let current = '';
  let ticking = false;

  const update = () => {
    ticking = false;
    const line = innerHeight * 0.35;
    let id = '';
    for (const s of sections) {
      if (s.getBoundingClientRect().top <= line) id = s.id;
      else break;
    }
    const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom) id = sections[sections.length - 1].id;
    if (id === current) return;
    current = id;
    for (const a of links) {
      const on = a.dataset.navLink === id;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
      // Keep the active chip visible inside the horizontally scrolling mobile bar.
      const scroller = a.closest('ul');
      if (on && scroller && scroller.scrollWidth > scroller.clientWidth && navs.some((n) => n.contains(a) && n.offsetParent)) {
        const target = a.offsetLeft - scroller.clientWidth / 2 + a.clientWidth / 2;
        scroller.scrollTo({ left: target, behavior: 'auto' });
      }
    }
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll, { passive: true });
  update();
}
