// ─────────────────────────────────────────────────────────────
//  UI layer — content rendering, terminal, micro-interactions.
// ─────────────────────────────────────────────────────────────
import { PROFILE, EXPERIENCE, TEAM_COUNT, PROJECTS, SKILLS, SKILL_CATEGORIES, EDUCATION, ACHIEVEMENTS, FLOW, ORIGIN, SOFOF_PROJECTS } from './data.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(pointer: fine)').matches;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const emit = (name, detail) => window.dispatchEvent(new CustomEvent(name, { detail }));
const SECTION_IDS = ['hero', 'about', 'origin', 'flow', 'experience', 'projects', 'incident', 'skills', 'terminal', 'contact'];

renderStatic();
renderFlow();
renderExperience();
renderProjects();
renderSofof();
renderSkills();
boot();
typeRoles();
navigation();
reveals();
counters();
tilt();
cursor();
hud();
contact();
terminal();
checkResume();
loadScene();

// ═══════════════════════════════════════════════════════════
//  Boot sequence
// ═══════════════════════════════════════════════════════════
function boot() {
  const el = $('#boot');
  if (!el) return;
  const log = $('#boot-log');
  const bar = $('.boot-bar span', el);
  let seen = false;
  try { seen = sessionStorage.getItem('booted') === '1'; } catch { /* storage blocked */ }

  let finished = false;
  const done = () => {
    if (finished) return;
    finished = true;
    el.classList.add('done');
    try { sessionStorage.setItem('booted', '1'); } catch { /* ignore */ }
    setTimeout(() => el.remove(), 700);
  };
  if (seen || reduceMotion) return done();

  const lines = [
    '<span class="hi">faruk-os</span> v5.0.0 — booting portfolio kernel',
    '',
    `<span class="ok">[  OK  ]</span> Mounting /dev/experience ............ ${TEAM_COUNT} nodes`,
    '<span class="ok">[  OK  ]</span> Starting redis-server .............. :6379 ready',
    '<span class="ok">[  OK  ]</span> Connecting mongodb ................. 10M+ docs indexed',
    '<span class="ok">[  OK  ]</span> Spawning bullmq workers ............ x8',
    '<span class="ok">[  OK  ]</span> Opening websocket channel .......... ws://realtime',
    '<span class="ok">[  OK  ]</span> Initializing WebGL renderer ........ three.js r160',
    '',
    '&gt;&gt; access granted. welcome.',
  ];
  let i = 0;
  const step = () => {
    if (finished) return;
    if (i >= lines.length) return setTimeout(done, 220);
    log.innerHTML += lines[i] + '\n';
    i++;
    bar.style.width = `${(i / lines.length) * 100}%`;
    setTimeout(step, lines[i - 1] ? 55 + Math.random() * 50 : 25);
  };
  step();
  el.addEventListener('click', done);
  addEventListener('keydown', done, { once: true });
}

// ═══════════════════════════════════════════════════════════
//  3D scene — loaded on demand once the page has painted, so the
//  ~600 KB three.js download never blocks content or other scripts.
//  Data-saver users keep the static blueprint (no 3D download).
// ═══════════════════════════════════════════════════════════
function loadScene() {
  const html = document.documentElement;
  if (navigator.connection?.saveData) { html.classList.add('no-webgl'); return; }
  const go = () => import('./scene.js').catch((err) => {
    console.warn('[scene] failed to load 3D — using static background.', err);
    html.classList.add('no-webgl');
  });
  const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 120));
  const start = () => idle(go, { timeout: 1200 });
  if (document.readyState === 'complete') start();
  else addEventListener('load', start, { once: true });
}

// ═══════════════════════════════════════════════════════════
//  Follow-the-request story (the 3D packet is driven by scene.js)
// ═══════════════════════════════════════════════════════════
function renderFlow() {
  const list = $('#flow-steps');
  if (!list) return;
  const pad = (n) => String(n).padStart(2, '0');
  list.innerHTML = FLOW.map((f, i) => `
    <li class="flow-step" data-i="${i}" style="--c:${f.color}">
      <article class="step-card panel">
        <p class="step-hop"><span>HOP ${pad(i + 1)}</span> · ${esc(f.stage)}</p>
        <h3>${esc(f.title)}</h3>
        <p class="step-tech">${esc(f.tech)}</p>
        <p class="step-story">${esc(f.story)}</p>
        <div class="step-foot">
          <span class="step-metric">${esc(f.metric)}</span>
          <span class="step-where">@ ${esc(f.where)}</span>
        </div>
      </article>
    </li>`).join('');

  const dots = $('#flow-dots');
  dots.innerHTML = ['client', ...FLOW.map((f) => f.stage)]
    .map((name, i) => `<i style="--c:${i ? FLOW[i - 1].color : '#ffffff'}" title="${esc(name)}"></i>`).join('');

  const steps = $$('.flow-step', list);
  const dotEls = $$('i', dots);
  const hopEl = $('#flow-hop');
  const nameEl = $('#flow-name');
  let last = -2;
  const update = () => {
    const mid = innerHeight / 2;
    let active = -1;
    let best = innerHeight * 0.42;
    steps.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - mid);
      if (d < best) { best = d; active = i; }
    });
    // scrolled past the last hop → keep it lit
    const lastRect = steps[steps.length - 1].getBoundingClientRect();
    if (active === -1 && lastRect.bottom < mid) active = steps.length - 1;
    if (active === last) return;
    last = active;
    steps.forEach((el, i) => el.classList.toggle('active', i === active));
    dotEls.forEach((d, i) => { d.classList.toggle('on', i <= active + 1); d.classList.toggle('now', i === active + 1); });
    hopEl.textContent = `HOP ${pad(active + 1)} / ${pad(FLOW.length)}`;
    nameEl.textContent = active < 0 ? 'CLIENT' : FLOW[active].stage.toUpperCase();
    nameEl.style.color = active < 0 ? '' : FLOW[active].color;
  };
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  update();
}

// ═══════════════════════════════════════════════════════════
//  Content rendering
// ═══════════════════════════════════════════════════════════
function renderStatic() {
  $('#edu-degree').textContent = EDUCATION.degree;
  $('#edu-school').textContent = `${EDUCATION.school} · ${EDUCATION.period}`;
  $('#achievements').innerHTML = ACHIEVEMENTS.map((a) => `
    <li><b>${esc(a.title)}</b> — ${esc(a.org)}<span>${esc(a.date)}</span>${a.detail ? `<p>${esc(a.detail)}</p>` : ''}</li>`).join('');
  $('#year').textContent = new Date().getFullYear();
  $('#team-count').dataset.count = TEAM_COUNT;
  const dim = $('#bp-dim-label');
  if (dim) dim.textContent = `MECH. ENG. → SOFTWARE · 5+ YRS · ${TEAM_COUNT} TEAMS`;
  $('#exp-sub').textContent = `${TEAM_COUNT} engineering teams across Bangladesh, India, the UK and Canada — newest first.`;
}

function shortHash(s) {
  let h = 2166136261;
  for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
}

// wrap impact metrics in <b class="metric"> so they stand out when skimming
function highlight(text) {
  return esc(text).replace(/(\d+(?:\.\d+)?%|\d+M\+|sub-second)/g, '<b class="metric">$1</b>');
}

function renderExperience() {
  const VISIBLE = 3;
  $('#timeline').innerHTML = EXPERIENCE.map((job, i) => {
    const points = job.points ?? [];
    const stack = job.stack ?? [];
    // roles may carry their own bullets; count every bullet past the first VISIBLE per role as "extra"
    const roleExtra = (job.roles ?? []).reduce((n, r) => n + Math.max(0, (r.points?.length ?? 0) - VISIBLE), 0);
    const extra = Math.max(0, points.length - VISIBLE) + roleExtra;
    const meta = [job.location, job.mode, job.type].filter(Boolean).map(esc).join(' · ');
    const heading = job.roles
      ? `<span class="co">${esc(job.company)}</span>`
      : `${esc(job.role)} <span class="at">@</span> <span class="co">${esc(job.company)}</span>`;
    return `
    <article class="commit reveal${job.type === 'Internship' ? ' intern' : ''}" style="--d:${Math.min(i, 3) * 70}ms">
      <span class="commit-dot"></span>
      <div class="commit-card panel frame">
        <div class="commit-meta">
          <span class="hash">commit ${shortHash(job.company + job.period)}</span>
          ${i === 0 ? '<span class="head">(HEAD → main)</span>' : ''}
          ${job.current ? '<span class="now">● current</span>' : ''}
          <span class="date">${esc(job.period)}</span>
        </div>
        <h3>${heading}</h3>
        <p class="loc">${meta}</p>
        ${job.products?.length ? `<p class="shipped"><span>Shipped</span>${job.products.map((pr) => `<a href="${esc(pr.url)}" target="_blank" rel="noopener">${esc(pr.name)}</a>`).join('')}</p>` : ''}
        ${job.roles ? `<ul class="roles">${job.roles.map((r) => `<li>
          <div class="role-head"><b>${esc(r.title)}</b><span>${esc(r.period)}</span></div>
          ${r.points?.length ? `<ul class="points">${r.points.map((p, k) => `<li${k >= VISIBLE ? ' class="extra"' : ''}>${highlight(p)}</li>`).join('')}</ul>` : ''}
        </li>`).join('')}</ul>` : ''}
        ${points.length ? `<ul class="points">
          ${points.map((p, k) => `<li${k >= VISIBLE ? ' class="extra"' : ''}>${highlight(p)}</li>`).join('')}
        </ul>` : ''}
        ${stack.length || extra > 0 ? `<div class="commit-foot">
          <div class="tags">${stack.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
          ${extra > 0 ? `<button class="more-btn" type="button" aria-expanded="false" data-more="${extra}">+ ${extra} more line${extra > 1 ? 's' : ''}</button>` : ''}
        </div>` : ''}
      </div>
    </article>`;
  }).join('');

  $$('.more-btn').forEach((btn) => btn.addEventListener('click', () => {
    const card = btn.closest('.commit');
    const open = card.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    btn.textContent = open ? '− collapse' : `+ ${btn.dataset.more} more line${btn.dataset.more > 1 ? 's' : ''}`;
  }));
}

function renderProjects() {
  $('#project-grid').innerHTML = PROJECTS.map((p, i) => `
    <div class="reveal" style="--d:${i * 90}ms">
      <article class="project panel frame tilt">
        <div class="win-bar"><i></i><i></i><i></i><span>~/projects/${esc(p.slug)}</span></div>
        <div class="project-body">
          <p class="kicker">${esc(p.kicker)}</p>
          <h3>${esc(p.name)}</h3>
          <p class="desc">${esc(p.description)}</p>
          <ul class="highlights">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
          <div class="tags">${p.stack.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
          <div class="project-foot">
            <span class="status">live in production</span>
            <a class="btn small" href="${esc(p.url)}" target="_blank" rel="noopener" aria-label="Visit ${esc(p.name)} (opens in a new tab)">Visit site ↗</a>
          </div>
        </div>
        <div class="glare"></div>
      </article>
    </div>`).join('');
}

function renderSofof() {
  const el = $('#sofof');
  if (!el || !SOFOF_PROJECTS.length) return;
  el.innerHTML = `
    <p class="sec-tag sofof-tag">// shipped at SOFOF Tech</p>
    <div class="sofof-grid">
      ${SOFOF_PROJECTS.map((p, i) => `
        <article class="sofof-card panel reveal" style="--d:${i * 70}ms">
          <p class="kicker">${esc(p.kicker)}</p>
          <h3>${esc(p.name)}${p.ar ? ` <span class="ar" lang="ar" dir="rtl">${esc(p.ar)}</span>` : ''}</h3>
          <p class="desc">${esc(p.description)}</p>
          <div class="tags">${p.platforms.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
          <a class="sofof-link" href="${esc(p.url)}" target="_blank" rel="noopener" aria-label="Visit ${esc(p.name)} (opens in a new tab)">${esc(p.url.replace(/^https?:\/\//, '').replace(/\/$/, ''))} ↗</a>
        </article>`).join('')}
    </div>`;
}

function renderSkills() {
  const groups = Object.entries(SKILL_CATEGORIES).map(([key, cat]) => {
    const items = SKILLS.filter((s) => s.cat === key);
    return `
      <div class="skill-group reveal" style="--c:${cat.color}">
        <h3>${esc(cat.label)}</h3>
        <div class="chips">
          ${items.map((s) => `<button type="button" class="chip" data-skill="${esc(s.label)}">${s.node ? '<i>◆</i>' : ''}${esc(s.label)}</button>`).join('')}
        </div>
      </div>`;
  });
  $('#skill-groups').innerHTML = groups.join('');

  const readout = $('#skill-readout');
  const idle = readout.innerHTML;
  const byLabel = new Map(SKILLS.map((s) => [s.label, s]));
  const show = (s) => {
    const cat = SKILL_CATEGORIES[s.cat];
    readout.style.setProperty('--c', cat.color);
    readout.innerHTML = `<span class="prompt">&gt;</span> <b>${esc(s.label)}</b> <span class="dim">:: ${esc(cat.label)}</span><br>${esc(s.info)}`;
  };

  $$('.chip').forEach((chip) => {
    const s = byLabel.get(chip.dataset.skill);
    const enter = () => { show(s); emit('skill:focus', { label: s.label }); };
    const leave = () => { readout.innerHTML = idle; emit('skill:focus', { label: null }); };
    chip.addEventListener('mouseenter', enter);
    chip.addEventListener('focus', enter);
    chip.addEventListener('mouseleave', leave);
    chip.addEventListener('blur', leave);
    chip.addEventListener('click', () => { show(s); emit('skill:burst', { label: s.label }); ping(chip); });
  });

  // hero button → fire the same broadcast as clicking the core
  const bBtn = $('#broadcast-btn');
  bBtn?.addEventListener('click', () => {
    emit('scene:broadcast');
    ping(bBtn);
  });

  // 3D node clicked → highlight its chip
  addEventListener('node:select', (e) => {
    const label = e.detail?.label;
    if (!label) return toast(`✓ broadcast sent → ${SKILLS.filter((s) => s.node).length} services`);
    const chip = $(`.chip[data-skill="${CSS.escape(label)}"]`);
    if (chip) { ping(chip); show(byLabel.get(label)); }
  });
}

function ping(el) {
  const cls = el.classList.contains('broadcast-btn') ? 'fired' : 'ping';
  el.classList.remove(cls);
  void el.offsetWidth; // restart animation
  el.classList.add(cls);
}

// ═══════════════════════════════════════════════════════════
//  Hero typing
// ═══════════════════════════════════════════════════════════
function typeRoles() {
  const el = $('#typed');
  const roles = PROFILE.roles;
  if (reduceMotion) { el.textContent = roles[0]; return; }
  let r = 0;
  let c = roles[0].length;
  let deleting = false;
  const tick = () => {
    const word = roles[r];
    c += deleting ? -1 : 1;
    el.textContent = word.slice(0, c);
    let wait = deleting ? 32 : 65 + Math.random() * 50;
    if (!deleting && c >= word.length) { deleting = true; wait = 1900; }
    else if (deleting && c <= 0) { deleting = false; r = (r + 1) % roles.length; wait = 280; }
    setTimeout(tick, wait);
  };
  setTimeout(() => { deleting = true; tick(); }, 2600);
}

// ═══════════════════════════════════════════════════════════
//  Navigation
// ═══════════════════════════════════════════════════════════
function navigation() {
  const nav = $('#nav');
  const links = $('#nav-links');
  const toggle = $('#nav-toggle');

  const onScroll = () => nav.classList.toggle('scrolled', scrollY > 30);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  $$('a', links).forEach((a) => a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      $$('[data-nav]').forEach((a) => a.classList.toggle('active', a.dataset.nav === e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  SECTION_IDS.forEach((id) => io.observe(document.getElementById(id)));
}

// ═══════════════════════════════════════════════════════════
//  Reveal on scroll + counters
// ═══════════════════════════════════════════════════════════
function reveals() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach((el) => io.observe(el));
}

function counters() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const el = e.target;
      const to = Number(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      if (reduceMotion) { el.textContent = to + suffix; return; }
      const t0 = performance.now();
      const dur = 1500;
      const step = (now) => {
        const t = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - t, 4);
        el.textContent = Math.round(to * eased) + suffix;
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach((el) => io.observe(el));
}

// ═══════════════════════════════════════════════════════════
//  3D tilt cards
// ═══════════════════════════════════════════════════════════
function tilt() {
  if (!finePointer || reduceMotion) return;
  $$('.tilt').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * 10}deg) rotateY(${(px - 0.5) * 12}deg) translateZ(0)`;
      card.style.setProperty('--gx', `${px * 100}%`);
      card.style.setProperty('--gy', `${py * 100}%`);
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}

// ═══════════════════════════════════════════════════════════
//  Custom cursor
// ═══════════════════════════════════════════════════════════
function cursor() {
  const el = $('.cursor');
  if (!finePointer || !el) return;
  let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
  addEventListener('pointermove', (e) => {
    x = e.clientX; y = e.clientY;
    el.classList.add('on');
    el.classList.toggle('hover', !!e.target.closest('a, button, input, .chip, #scene.pointing'));
  }, { passive: true });
  document.addEventListener('pointerleave', () => el.classList.remove('on'));
  const loop = () => {
    cx += (x - cx) * 0.22;
    cy += (y - cy) * 0.22;
    el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    requestAnimationFrame(loop);
  };
  loop();
}

// ═══════════════════════════════════════════════════════════
//  HUD + progress bar
// ═══════════════════════════════════════════════════════════
function hud() {
  const bar = $('#progress-bar');
  const xy = $('#hud-xy');
  const pct = $('#hud-scroll');
  const sector = $('#hud-sector');
  const sections = SECTION_IDS.map((id) => document.getElementById(id));

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? scrollY / max : 0;
    bar.style.transform = `scaleX(${p})`;
    pct.textContent = `${String(Math.round(p * 100)).padStart(3, '0')}%`;
    const mid = scrollY + innerHeight / 2;
    let idx = 0;
    sections.forEach((s, i) => { if (s.offsetTop <= mid) idx = i; });
    sector.textContent = `SECTOR ${String(idx).padStart(2, '0')} · ${SECTION_IDS[idx].toUpperCase()}`;
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  addEventListener('pointermove', (e) => {
    xy.textContent = `X ${(e.clientX / innerWidth).toFixed(3)} · Y ${(e.clientY / innerHeight).toFixed(3)}`;
  }, { passive: true });
}

// ═══════════════════════════════════════════════════════════
//  Contact helpers
// ═══════════════════════════════════════════════════════════
function contact() {
  $('#mail-link').href = `mailto:${PROFILE.email}`;
  $('#mail-link').textContent = PROFILE.email;
  // every [data-link] anchor (nav, hero, contact, footer) follows PROFILE
  const links = { linkedin: PROFILE.linkedin, github: PROFILE.github, email: `mailto:${PROFILE.email}` };
  $$('[data-link]').forEach((a) => { a.href = links[a.dataset.link] ?? a.href; });
  $('#gh-link').href = PROFILE.github;
  $('#copy-email').addEventListener('click', copyEmail);
}

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(PROFILE.email);
    toast(`copied → ${PROFILE.email}`);
  } catch {
    toast(PROFILE.email);
  }
}

addEventListener('ui:toast', (e) => toast(e.detail));

let toastTimer;
function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

// The résumé is generated on demand: the quick view prints as a one-page PDF.
function checkResume() {
  $('#cv-link')?.addEventListener('click', () => emit('quick:print'));
}

// ═══════════════════════════════════════════════════════════
//  Interactive terminal
// ═══════════════════════════════════════════════════════════
function terminal() {
  const out = $('#term-out');
  const input = $('#term-input');
  const form = $('#term-form');
  const history = [];
  let hIdx = 0;

  const print = (html = '', cls = '') => {
    const d = document.createElement('div');
    d.className = `ln ${cls}`;
    d.innerHTML = html;
    out.appendChild(d);
  };
  const printLines = (lines) => lines.forEach((l) => (Array.isArray(l) ? print(l[0], l[1]) : print(l)));
  const link = (href, text = href) => `<a href="${esc(href)}" target="_blank" rel="noopener">${esc(text)}</a>`;
  const pad = (s, n) => s + ' '.repeat(Math.max(1, n - s.length));

  const FILES = {
    'about.txt': () => [PROFILE.summary],
    'experience.log': () => cmds.experience(),
    'skills.json': () => {
      const obj = {};
      Object.entries(SKILL_CATEGORIES).forEach(([k, c]) => { obj[c.label] = SKILLS.filter((s) => s.cat === k).map((s) => s.label); });
      return [`<span class="a">${esc(JSON.stringify(obj, null, 2))}</span>`];
    },
    'contact.md': () => cmds.contact(),
    'resume.pdf': () => [['generated on demand — try <span class="c">open cv</span>', 'dim']],
  };

  const cmds = {
    help: () => [
      ['available commands:', 'dim'],
      ...[
        ['whoami', 'who is this guy'],
        ['about', 'short bio'],
        ['experience', 'career log'],
        ['projects', 'things in production'],
        ['skills', 'tech stack by category'],
        ['education', 'academic background'],
        ['achievements', 'awards & recognition'],
        ['contact', 'ways to reach me'],
        ['neofetch', 'system info'],
        ['ls / cat <file>', 'browse the filesystem'],
        ['open <target>', 'github | linkedin | email | cv | <project>'],
        ['goto <section>', 'scroll to a section'],
        ['history / clear', 'the usual'],
        ['sudo hire-faruk', 'you know you want to'],
      ].map(([c, d]) => `  <span class="c">${esc(pad(c, 18))}</span><span class="dim">${esc(d)}</span>`),
      ['tip: ↑/↓ for history, tab to autocomplete', 'dim'],
    ],
    whoami: () => [
      `<span class="ok">${esc(PROFILE.name)}</span>`,
      `${esc(PROFILE.title)} @ ${esc(PROFILE.company)} · ${esc(PROFILE.location)}`,
      ['backend · microservices · databases · real-time systems', 'dim'],
    ],
    about: () => [PROFILE.summary],
    experience: () => EXPERIENCE.map((j) =>
      `<span class="a">${esc(pad(j.period, 22))}</span><span class="ok">${esc(j.role)}</span> <span class="m">@</span> <span class="c">${esc(j.company)}</span>`),
    projects: () => PROJECTS.flatMap((p) => [
      `<span class="c">▸ ${esc(p.name)}</span> <span class="dim">— ${esc(p.kicker)}</span>`,
      `  ${esc(p.description)}`,
      `  <span class="dim">stack:</span> ${esc(p.stack.join(', '))}`,
      `  ${link(p.url)}`,
      '',
    ]).concat([
      ['shipped at SOFOF Tech:', 'dim'],
      ...SOFOF_PROJECTS.map((p) => `<span class="c">▸ ${esc(p.name)}</span> <span class="dim">— ${esc(p.kicker)}</span>  ${link(p.url)}`),
    ]),
    skills: () => Object.entries(SKILL_CATEGORIES).map(([k, c]) =>
      `<span style="color:${c.color}">${esc(pad(c.label, 15))}</span>${esc(SKILLS.filter((s) => s.cat === k).map((s) => s.label).join(' · '))}`),
    education: () => [
      `<span class="ok">${esc(EDUCATION.degree)}</span>`,
      `${esc(EDUCATION.school)}`,
      [`${EDUCATION.period} · ${EDUCATION.location}`, 'dim'],
    ],
    achievements: () => ACHIEVEMENTS.map((a) => `<span class="a">★</span> ${esc(a.title)} <span class="dim">— ${esc(a.org)}, ${esc(a.date)}</span>`),
    contact: () => [
      `<span class="dim">email   </span> <a href="mailto:${esc(PROFILE.email)}">${esc(PROFILE.email)}</a>`,
      `<span class="dim">github  </span> ${link(PROFILE.github, `@${PROFILE.githubHandle}`)}`,
      `<span class="dim">linkedin</span> ${link(PROFILE.linkedin, `in/${PROFILE.linkedinHandle}`)}`,
    ],
    neofetch: () => {
      const art = [
        '   ┌──────────────┐ ',
        '   │ &gt;_           │ ',
        '   │   faruk-os   │ ',
        '   │              │ ',
        '   └──────┬───────┘ ',
        '      ────┴────     ',
        '                    ',
        '                    ',
      ];
      const info = [
        `<span class="ok">faruk</span>@<span class="ok">portfolio</span>`,
        '<span class="dim">─────────────────</span>',
        `<span class="c">OS</span>       ${esc(PROFILE.title)}`,
        `<span class="c">Uptime</span>   5+ years`,
        `<span class="c">Host</span>     ${esc(PROFILE.location)}`,
        `<span class="c">Shell</span>    TypeScript / Python`,
        `<span class="c">Stack</span>    Node · NestJS · Postgres · Mongo · Redis`,
        `<span class="c">Record</span>   200% faster on 10M+ rows`,
      ];
      return [
        ...art.map((a, i) => `<span class="m">${a}</span>${info[i] ?? ''}`),
        '<span style="color:#00f0ff">███</span><span style="color:#ff2bd6">███</span><span style="color:#39ff88">███</span><span style="color:#ffb800">███</span><span style="color:#9d8cff">███</span>',
      ];
    },
    ls: () => [Object.keys(FILES).map((f) => (f.endsWith('.pdf') ? `<span class="m">${f}</span>` : `<span class="c">${f}</span>`)).join('   ')],
    cat: (arg) => {
      if (!arg) return [['usage: cat &lt;file&gt; — try ls', 'err']];
      const f = FILES[arg];
      return f ? f() : [[`cat: ${esc(arg)}: no such file`, 'err']];
    },
    open: (arg = '') => {
      const a = arg.toLowerCase();
      const key = a.replace(/[^a-z0-9]/g, '');
      const project = key ? PROJECTS.find((p) => p.slug.replace(/-/g, '').includes(key)) : null;
      const targets = {
        github: PROFILE.github,
        linkedin: PROFILE.linkedin,
        email: `mailto:${PROFILE.email}`,
        mail: `mailto:${PROFILE.email}`,
      };
      if (a === 'cv' || a === 'resume') {
        emit('quick:print');
        return [['opening one-page résumé → print / save as PDF …', 'ok']];
      }
      const url = targets[a] ?? project?.url;
      if (!url) return [['usage: open github | linkedin | email | cv | zaynax | hishabpati | assunnah', 'err']];
      window.open(url, url.startsWith('mailto:') ? '_self' : '_blank', 'noopener');
      return [[`opening ${url} …`, 'ok']];
    },
    goto: (arg = '') => {
      const id = SECTION_IDS.find((s) => s.startsWith(arg.toLowerCase())) ?? (arg === 'stack' ? 'skills' : null);
      if (!id || !arg) return [[`usage: goto ${SECTION_IDS.join(' | ')}`, 'err']];
      document.getElementById(id).scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
      return [[`→ ${id}`, 'ok']];
    },
    history: () => history.map((h, i) => `<span class="dim">${String(i + 1).padStart(4)}</span>  ${esc(h)}`),
    date: () => [new Date().toString()],
    echo: (...args) => [esc(args.join(' '))],
    clear: () => { out.innerHTML = ''; return []; },
    sudo: (arg) => {
      if (arg === 'hire-faruk' || arg === 'hire') {
        setTimeout(() => { location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent("Let's work together")}`; }, 1600);
        return [
          ['[sudo] password for recruiter: ********', 'dim'],
          ['verifying offer letter …', 'dim'],
          ['✔ access granted. opening mail client …', 'ok'],
        ];
      }
      return [['nice try. this incident will be reported. 👀', 'err']];
    },
    robots: () => [
      ['before software — robotics & IoT at MIST:', 'dim'],
      ...ORIGIN.map((r) => `<span class="a">▸</span> <span class="c">${esc(r.name)}</span> <span class="dim">— ${esc(r.from)} → ${esc(r.to)}</span>`),
    ],
    exit: () => [['there is no escape. try "contact" instead.', 'dim']],
  };
  cmds.stack = cmds.skills;
  cmds.origin = cmds.robots;
  cmds.work = cmds.experience;
  cmds.cls = cmds.clear;

  const run = (raw) => {
    const line = raw.trim();
    print(`<span class="p">faruk@portfolio</span>:<span class="p2">~</span>$ ${esc(line)}`);
    if (line) {
      history.push(line);
      hIdx = history.length;
      const [name, ...args] = line.split(/\s+/);
      const fn = cmds[name.toLowerCase()];
      if (fn) printLines(fn(...args));
      else print(`zsh: command not found: ${esc(name)} — type <span class="c">help</span>`, 'err');
    }
    out.scrollTop = out.scrollHeight;
  };

  printLines([
    ['Last login: ' + new Date().toDateString() + ' on ttys001', 'dim'],
    `Welcome to <span class="c">faruk-os</span>. Type <span class="c">help</span> to list commands.`,
    '',
  ]);

  form.addEventListener('submit', (e) => { e.preventDefault(); run(input.value); input.value = ''; });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault();
      hIdx = Math.max(0, hIdx - 1);
      input.value = history[hIdx];
    } else if (e.key === 'ArrowDown' && history.length) {
      e.preventDefault();
      hIdx = Math.min(history.length, hIdx + 1);
      input.value = history[hIdx] ?? '';
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const [name, arg] = input.value.split(/\s+/);
      if (arg !== undefined && name === 'cat') {
        const f = Object.keys(FILES).find((k) => k.startsWith(arg));
        if (f) input.value = `cat ${f}`;
      } else {
        const match = Object.keys(cmds).filter((c) => c.startsWith(name));
        if (match.length === 1) input.value = match[0] + ' ';
        else if (match.length > 1) print(match.join('   '), 'dim');
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      out.innerHTML = '';
    }
  });

  $('#term').addEventListener('click', (e) => {
    if (!e.target.closest('a') && !getSelection().toString()) input.focus({ preventScroll: true });
  });
  $$('[data-cmd]').forEach((b) => b.addEventListener('click', () => {
    run(b.dataset.cmd);
    input.focus({ preventScroll: true });
  }));
}
