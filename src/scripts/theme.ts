export type ThemeChoice = 'system' | 'light' | 'dark';

const KEY = 'theme';
const root = document.documentElement;
const order: ThemeChoice[] = ['system', 'light', 'dark'];
const colors = { light: '#fdfdfc', dark: '#111110' };

export function getTheme(): ThemeChoice {
  const t = root.getAttribute('data-theme');
  return t === 'light' || t === 'dark' ? t : 'system';
}

function syncMeta(choice: ThemeChoice) {
  const metas = document.querySelectorAll<HTMLMetaElement>('meta[data-theme-color]');
  metas.forEach((m, i) => {
    if (choice === 'system') {
      m.content = i === 0 ? colors.light : colors.dark;
    } else {
      m.content = colors[choice];
    }
  });
}

function syncButtons(choice: ThemeChoice) {
  const next = order[(order.indexOf(choice) + 1) % order.length];
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
    btn.setAttribute('aria-label', `Theme: ${choice}. Switch to ${next}.`);
    btn.dataset.state = choice;
    btn.querySelectorAll<HTMLElement>('[data-theme-icon]').forEach((el) => {
      el.hidden = el.dataset.themeIcon !== choice;
    });
  });
}

export function setTheme(choice: ThemeChoice) {
  if (choice === 'system') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', choice);
  try {
    if (choice === 'system') localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, choice);
  } catch {
    /* storage unavailable: the choice still applies for this page view */
  }
  syncMeta(choice);
  syncButtons(choice);
}

export function cycleTheme() {
  const next = order[(order.indexOf(getTheme()) + 1) % order.length];
  setTheme(next);
}

export function initTheme() {
  syncMeta(getTheme());
  syncButtons(getTheme());
  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => btn.addEventListener('click', cycleTheme));
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (getTheme() === 'system') syncMeta('system');
  });
}
