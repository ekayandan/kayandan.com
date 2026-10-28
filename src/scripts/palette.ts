import { setTheme, type ThemeChoice } from './theme';

function toast(msg: string) {
  const el = document.querySelector<HTMLElement>('[data-toast]');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('is-on');
  window.clearTimeout((toast as unknown as { t?: number }).t);
  (toast as unknown as { t?: number }).t = window.setTimeout(() => el.classList.remove('is-on'), 2000);
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }
    ta.remove();
    return ok;
  }
}

export function initPalette() {
  const dialog = document.querySelector<HTMLDialogElement>('[data-palette]');
  if (!dialog || typeof dialog.showModal !== 'function') {
    document.querySelectorAll('[data-palette-open]').forEach((b) => ((b as HTMLElement).hidden = true));
    return;
  }
  const input = dialog.querySelector<HTMLInputElement>('[data-palette-input]')!;
  const list = dialog.querySelector<HTMLElement>('[data-palette-list]')!;
  const empty = dialog.querySelector<HTMLElement>('[data-palette-empty]')!;
  const options = [...list.querySelectorAll<HTMLElement>('[role="option"]')];
  const groups = [...list.querySelectorAll<HTMLElement>('.palette-group')];
  let active = 0;
  let opener: HTMLElement | null = null;
  let skipRestore = false;

  // Platform-aware modifier hint.
  const isMac = /Mac|iPhone|iPad/.test(navigator.userAgent);
  document.querySelectorAll<HTMLElement>('[data-mod]').forEach((k) => (k.textContent = isMac ? '⌘' : 'Ctrl'));

  const visible = () => options.filter((o) => !o.hidden);

  const setActive = (i: number, scroll = true) => {
    const v = visible();
    if (!v.length) {
      input.removeAttribute('aria-activedescendant');
      return;
    }
    active = (i + v.length) % v.length;
    options.forEach((o) => o.setAttribute('aria-selected', 'false'));
    const el = v[active];
    el.setAttribute('aria-selected', 'true');
    input.setAttribute('aria-activedescendant', el.id);
    if (scroll) el.scrollIntoView({ block: 'nearest' });
  };

  const filter = () => {
    const q = input.value.trim().toLowerCase();
    const terms = q.split(/\s+/).filter(Boolean);
    for (const o of options) {
      const hay = `${o.textContent ?? ''} ${o.dataset.text ?? ''}`.toLowerCase();
      o.hidden = !terms.every((t) => hay.includes(t));
    }
    for (const g of groups) {
      let n = g.nextElementSibling;
      let any = false;
      while (n && !n.classList.contains('palette-group')) {
        if (!(n as HTMLElement).hidden) any = true;
        n = n.nextElementSibling;
      }
      g.hidden = !any;
    }
    const v = visible();
    empty.hidden = v.length > 0;
    list.hidden = v.length === 0;
    setActive(0, false);
  };

  const open = () => {
    if (dialog.open) return;
    opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    skipRestore = false;
    input.value = '';
    filter();
    dialog.showModal();
    input.focus();
  };
  const close = () => dialog.close();

  const run = (o: HTMLElement) => {
    const type = o.dataset.type;
    const value = o.dataset.value ?? '';
    close();
    if (type === 'nav') {
      const target = document.getElementById(value);
      if (target) {
        skipRestore = true;
        target.scrollIntoView({ block: 'start' });
        history.replaceState(null, '', `#${value}`);
        // Move focus to the section heading so keyboard and screen-reader users land there.
        const h = target.querySelector<HTMLElement>('h2');
        if (h) {
          h.tabIndex = -1;
          h.focus({ preventScroll: true });
        }
      }
    } else if (type === 'link') {
      window.open(value, '_blank', 'noopener,noreferrer');
    } else if (type === 'copy') {
      copyText(value).then((ok) => toast(ok ? 'Email address copied' : 'Could not copy. Select it manually.'));
    } else if (type === 'theme') {
      setTheme(value as ThemeChoice);
      toast(`Theme: ${value}`);
    }
  };

  input.addEventListener('input', filter);
  input.addEventListener('keydown', (e) => {
    const v = visible();
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(active + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(active - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActive(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActive(v.length - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (v[active]) run(v[active]);
    }
  });
  list.addEventListener('click', (e) => {
    const o = (e.target as HTMLElement).closest<HTMLElement>('[role="option"]');
    if (o) run(o);
  });
  list.addEventListener('pointermove', (e) => {
    const o = (e.target as HTMLElement).closest<HTMLElement>('[role="option"]');
    if (!o) return;
    const i = visible().indexOf(o);
    if (i >= 0 && i !== active) setActive(i, false);
  });
  dialog.addEventListener('close', () => {
    input.blur();
    if (!skipRestore && opener && opener.isConnected && opener !== document.body) opener.focus({ preventScroll: true });
  });
  // Click on the backdrop (the dialog element itself) closes it.
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) close();
  });

  document.querySelectorAll('[data-palette-open]').forEach((b) => b.addEventListener('click', open));
  addEventListener('keydown', (e) => {
    const t = e.target as HTMLElement | null;
    const typing = !!t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      dialog.open ? close() : open();
    } else if (e.key === '/' && !typing && !dialog.open && !e.metaKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      open();
    }
  });
}
