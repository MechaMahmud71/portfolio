// ─────────────────────────────────────────────────────────────
//  "Fix the incident" — a simulated on-call drill.
//  Numbers are illustrative; each correct fix links to real work.
// ─────────────────────────────────────────────────────────────
const root = document.getElementById('incident-app');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

const SLO = 1000;        // ms
const BASE_P95 = 4200;   // ms
const POINTS = 64;

const ACTIONS = [
  {
    id: 'index', label: 'Add a compound index', cmd: 'db.donations.createIndex(...)', good: true,
    log: '[db] index built — aggregate() now uses IXSCAN instead of scanning 10.2M docs',
    note: '<b>Index added.</b> The aggregation stops scanning every document. In production at <b>As Sunnah Foundation</b>, rewriting the pipelines and adding strategic indexes made queries <b>200% faster on 10M+ records</b>.',
  },
  {
    id: 'cache', label: 'Cache analytics on a schedule', cmd: 'cron: precompute → redis', good: true,
    log: '[cache] scheduled job warms analytics in Redis — hit ratio 96%',
    note: '<b>Cache warmed.</b> Most dashboard requests never touch the database now. The real version brought analytics dashboards down to <b>sub-second</b> response.',
  },
  {
    id: 'queue', label: 'Move exports to a job queue', cmd: 'bullmq: exports worker', good: true,
    log: '[queue] CSV exports handed to a BullMQ worker — requests return immediately',
    note: '<b>Exports queued.</b> Slow work leaves the request path, so timeouts disappear. Same pattern I used for background processing and data sync.',
  },
  {
    id: 'scale', label: 'Scale up the server', cmd: 'instance: 2× bigger', good: false,
    log: '[infra] instance resized — latency dips slightly, cost doubles',
    note: '<b>Hmm.</b> Bigger hardware buys a little time and doubles the bill — but a full collection scan is still a full collection scan.',
  },
  {
    id: 'restart', label: 'Restart the service', cmd: 'kubectl rollout restart', good: false,
    log: '[ops] service restarted — latency recovers for a moment, then climbs right back',
    note: '<b>Back to square one.</b> A restart clears symptoms, not causes. The problem is in the query, not the process.',
  },
];

const INTRO_LOG = [
  '[alert] p95 latency 4.2s > SLO 1s — GET /api/analytics/donations',
  '[db] slow query: donations.aggregate() — COLLSCAN, 10.2M docs examined',
  '[api] 3.1% of export requests timing out after 30s',
  '[hint] three fixes resolve this; the other two only treat symptoms',
];

if (root) init();

function init() {
  root.innerHTML = `
    <div class="inc panel frame">
      <div class="inc-head">
        <div>
          <p class="inc-id">INCIDENT #4021 · simulated drill</p>
          <h3>Analytics dashboard is timing out</h3>
        </div>
        <span class="inc-status" id="inc-status">SEV-2 · FIRING</span>
      </div>

      <div class="inc-grid">
        <figure class="inc-chart">
          <figcaption><span>p95 latency · live</span><span class="inc-slo">— SLO 1s</span></figcaption>
          <svg viewBox="0 0 600 220" preserveAspectRatio="none" role="img" aria-label="Live p95 latency chart">
            <defs>
              <linearGradient id="inc-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stop-color="currentColor" stop-opacity="0.35"/>
                <stop offset="1" stop-color="currentColor" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <g class="inc-gridlines">${[0, 1, 2, 3, 4].map((i) => `<line x1="0" x2="600" y1="${i * 55}" y2="${i * 55}"/>`).join('')}</g>
            <line class="inc-slo-line" x1="0" x2="600" y1="${y(SLO)}" y2="${y(SLO)}"/>
            <path class="inc-area" id="inc-area" fill="url(#inc-fill)"/>
            <path class="inc-line" id="inc-line"/>
          </svg>
        </figure>
        <div class="inc-tiles">
          <div class="inc-tile"><span>p95 latency</span><b id="t-p95">—</b></div>
          <div class="inc-tile"><span>DB load</span><b id="t-db">—</b></div>
          <div class="inc-tile"><span>Error rate</span><b id="t-err">—</b></div>
          <div class="inc-tile"><span>Infra cost</span><b id="t-cost">1.0×</b></div>
        </div>
      </div>

      <div class="inc-bottom">
        <div class="inc-log" id="inc-log" role="log" aria-live="polite" aria-label="Incident log" tabindex="0"></div>
        <div class="inc-actions">
          <p class="inc-ask">Pick a fix:</p>
          ${ACTIONS.map((a) => `
            <button type="button" class="inc-act" data-act="${a.id}">
              <b>${a.label}</b><code>${a.cmd}</code>
            </button>`).join('')}
        </div>
      </div>

      <div class="inc-note" id="inc-note" aria-live="polite">
        Production is degraded. Read the log, then choose what to do.
      </div>
    </div>`;

  const els = {
    line: root.querySelector('#inc-line'),
    area: root.querySelector('#inc-area'),
    svg: root.querySelector('svg'),
    status: root.querySelector('#inc-status'),
    log: root.querySelector('#inc-log'),
    note: root.querySelector('#inc-note'),
    p95: root.querySelector('#t-p95'),
    db: root.querySelector('#t-db'),
    err: root.querySelector('#t-err'),
    cost: root.querySelector('#t-cost'),
  };

  let state;
  let series;
  let latency;
  let blip = 0;
  let steps = 0;
  let resolved = false;

  const reset = () => {
    state = { index: false, cache: false, queue: false, scale: false };
    latency = BASE_P95;
    series = Array.from({ length: POINTS }, () => BASE_P95 * (0.95 + Math.random() * 0.1));
    blip = 0;
    steps = 0;
    resolved = false;
    els.log.innerHTML = '';
    INTRO_LOG.forEach((l) => log(l, l.startsWith('[alert]') ? 'bad' : ''));
    els.note.innerHTML = 'Production is degraded. Read the log, then choose what to do.';
    els.status.textContent = 'SEV-2 · FIRING';
    els.status.className = 'inc-status';
    root.querySelectorAll('.inc-act').forEach((b) => { b.disabled = false; b.classList.remove('done', 'meh'); });
    root.querySelector('.inc-reset')?.remove();
    render();
  };

  // what the system converges to, given the fixes applied
  const targets = () => {
    let p95 = BASE_P95;
    if (state.index) p95 /= 3;          // "200% faster"
    if (state.cache) p95 *= 0.18;       // sub-second once cached
    if (state.scale) p95 *= 0.85;
    const db = state.cache ? 14 : state.index ? 38 : 94;
    const err = state.queue ? 0.1 : 3.1;
    return { p95, db: Math.max(8, db - (state.scale ? 10 : 0)), err };
  };

  function log(text, cls = '') {
    const t = new Date().toTimeString().slice(0, 8);
    const d = document.createElement('div');
    d.className = cls;
    d.textContent = `${t} ${text}`;
    els.log.appendChild(d);
    els.log.scrollTop = els.log.scrollHeight;
  }

  function act(id) {
    if (resolved) return;
    const a = ACTIONS.find((x) => x.id === id);
    const btn = root.querySelector(`[data-act="${id}"]`);
    steps++;
    log(a.log, a.good ? 'good' : 'meh');
    els.note.innerHTML = a.note;
    if (id === 'restart') {
      blip = 6; // brief recovery, then back
      return;
    }
    state[id] = true;
    btn.disabled = true;
    btn.classList.add(a.good ? 'done' : 'meh');
    if (state.index && state.cache && state.queue) resolve();
  }

  function resolve() {
    resolved = true;
    setTimeout(() => {
      log(`[alert] resolved — p95 under SLO, errors < 0.5%`, 'good');
      els.status.textContent = 'RESOLVED';
      els.status.className = 'inc-status ok';
      els.note.innerHTML = `<b>Resolved in ${steps} action${steps > 1 ? 's' : ''}.</b> Index → cache → queue is the same playbook I used at <b>As Sunnah Foundation</b>: make the query cheap, avoid running it, and keep slow work off the request path.`;
      const again = document.createElement('button');
      again.type = 'button';
      again.className = 'btn small inc-reset';
      again.textContent = 'Run the drill again';
      again.addEventListener('click', reset);
      els.note.appendChild(again);
      root.querySelectorAll('.inc-act').forEach((b) => { b.disabled = true; });
    }, 900);
  }

  function render() {
    const pts = series.map((v, i) => `${(i / (POINTS - 1)) * 600},${y(v).toFixed(1)}`);
    els.line.setAttribute('d', `M${pts.join('L')}`);
    els.area.setAttribute('d', `M0,220L${pts.join('L')}L600,220Z`);
    const healthy = latency < SLO;
    els.svg.classList.toggle('healthy', healthy);
    const t = targets();
    els.p95.textContent = latency >= 1000 ? `${(latency / 1000).toFixed(1)}s` : `${Math.round(latency)}ms`;
    els.p95.className = healthy ? 'ok' : 'bad';
    els.db.textContent = `${Math.round(t.db)}%`;
    els.db.className = t.db > 70 ? 'bad' : t.db > 35 ? 'warn' : 'ok';
    els.err.textContent = `${t.err.toFixed(1)}%`;
    els.err.className = t.err > 0.5 ? 'bad' : 'ok';
    els.cost.textContent = state.scale ? '2.0×' : '1.0×';
    els.cost.className = state.scale ? 'warn' : '';
  }

  function tick() {
    const t = targets();
    let goal = t.p95;
    if (blip > 0) { goal = t.p95 * 0.35; blip--; }
    const noise = reduceMotion ? 0 : (Math.random() - 0.5) * goal * 0.12;
    latency += (goal - latency) * 0.22 + noise;
    latency = Math.max(80, latency);
    series.push(latency);
    series.shift();
    render();
  }

  root.addEventListener('click', (e) => {
    const b = e.target.closest('.inc-act');
    if (b && !b.disabled) act(b.dataset.act);
  });

  // only animate while visible
  let timer = null;
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !timer) timer = setInterval(tick, 320);
    else if (!entry.isIntersecting && timer) { clearInterval(timer); timer = null; }
  }).observe(root);

  reset();
}

function y(ms) {
  // 0..5000ms → 220..0 (clamped)
  return 220 - Math.min(5000, Math.max(0, ms)) / 5000 * 210;
}
