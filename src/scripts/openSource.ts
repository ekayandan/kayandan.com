/** Open-source list: repo filter chips + "show all" expander. Without JS every row is visible. */
export function initOpenSource() {
  const list = document.querySelector<HTMLElement>('[data-os]');
  const controls = document.querySelector<HTMLElement>('[data-os-controls]');
  if (!list || !controls) return;
  const rows = [...list.querySelectorAll<HTMLElement>('[data-pr]')];
  const chips = [...controls.querySelectorAll<HTMLButtonElement>('.chip[data-repo]')];
  const expand = controls.querySelector<HTMLButtonElement>('[data-os-expand]');
  const status = document.querySelector<HTMLElement>('[data-os-status]');
  const total = rows.length;
  let repo = 'all';
  let expanded = false;

  const render = () => {
    let shown = 0;
    for (const row of rows) {
      const matchRepo = repo === 'all' || row.dataset.repo === repo;
      const notable = row.dataset.notable === 'true';
      const visible = matchRepo && (expanded || repo !== 'all' || notable);
      row.hidden = !visible;
      if (visible) shown++;
    }
    if (expanded) list.removeAttribute('data-collapsed');
    else list.setAttribute('data-collapsed', '');
    // The CSS collapse rule is bypassed when a specific repo is chosen.
    if (repo !== 'all') list.removeAttribute('data-collapsed');
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.repo === repo)));
    if (expand) {
      expand.setAttribute('aria-expanded', String(expanded));
      expand.textContent = expanded ? 'Show notable only' : `Show all ${total} merged PRs`;
      expand.hidden = repo !== 'all';
    }
    if (status) status.textContent = `Showing ${shown} of ${total} merged pull requests.`;
  };

  chips.forEach((c) =>
    c.addEventListener('click', () => {
      repo = c.dataset.repo ?? 'all';
      render();
    }),
  );
  expand?.addEventListener('click', () => {
    expanded = !expanded;
    render();
  });
  render();
  if (status) status.textContent = '';
}
