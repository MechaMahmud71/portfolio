# faruk-os — 3D portfolio

Interactive 3D portfolio built with **three.js** and vanilla JS. No build step.

## Run locally

ES modules need an HTTP server (opening `index.html` directly won't work):

```bash
npx serve .            # or: python3 -m http.server 8080
```

## Edit content

Everything (bio, jobs, projects, skills, links) lives in [`js/data.js`](js/data.js).
Add `node: true` to a skill to make it a node in the 3D graph.

To enable the **cv.pdf** button, put your resume next to `index.html` as `resume.pdf`
(the button hides itself when the file is missing).

## Features

- **Blueprint design** — engineering-drawing look, IBM Plex, one orange accent
  ([`css/blueprint.css`](css/blueprint.css) layers over the base styles in `css/style.css`)
- **Fast first paint** — three.js loads on demand after the page has painted and fades in;
  data-saver visitors get the static blueprint without the 3D download

- **3D service mesh** hero (drag, hover, click, `broadcast()`)
- **Follow a request** — scroll-driven 3D pipeline through the stack (`FLOW` in data.js)
- **Fix the incident** — simulated on-call drill with a live latency chart
- **Quick view** — 30-second recruiter summary; shareable via `?view=quick`
- **Print / save PDF** — printing the site always produces a one-page résumé
- **⌘K / Ctrl+K command palette**, interactive terminal, notebook (writing)

## Structure

```
index.html      markup + section anchors (data-scene drives the 3D camera)
css/style.css   theme, layout, HUD, terminal
js/data.js      content
js/scene.js     three.js scene: service-mesh graph, packets, bloom, scroll choreography
js/ui.js        boot sequence, rendering, terminal, tilt, cursor, HUD
js/pipeline.js  "follow a request" 3D pipeline
js/incident.js  on-call drill
js/quick.js     recruiter quick view + print layout
js/palette.js   ⌘K command palette
js/notes.js     notebook / writing
```

## Deploy — https://farukalmahmud.online

Build a clean upload package (only the site files — no `tools/`, README or git data):

```bash
git archive -o dist/farukalmahmud-site.zip HEAD
```

### A. Hostinger web hosting (domain + hosting plan)

1. hPanel → **Websites** → make sure `farukalmahmud.online` is added as a website
   (a "parked domain" page means no hosting is attached yet).
2. **File Manager** → `public_html/` → delete Hostinger's default files →
   upload `dist/farukalmahmud-site.zip` → right-click → **Extract** here.
   `index.html` must sit directly in `public_html/`.
3. hPanel → **Security → SSL** → make sure SSL is active.
   `.htaccess` already redirects http/www → `https://farukalmahmud.online`.

*(Alternative: hPanel → Advanced → **Git** can deploy straight from a GitHub repo.)*

### B. Domain only (free hosting elsewhere, DNS at Hostinger)

- **GitHub Pages:** push this repo, enable Pages, set custom domain `farukalmahmud.online`.
  Hostinger DNS: `A @` → 185.199.108.153 · 185.199.109.153 · 185.199.110.153 · 185.199.111.153,
  `CNAME www` → `mechamahmud71.github.io`.
- **Netlify:** drag the folder in, add the custom domain.
  Hostinger DNS: `A @` → 75.2.60.5, `CNAME www` → `<your-site>.netlify.app`.

(`.htaccess` only applies on Hostinger; GitHub Pages / Netlify handle HTTPS themselves.)

### After it's live

- Paste the URL into LinkedIn's **Post Inspector** to refresh the preview card.
- Add the site in **Google Search Console** and submit `sitemap.xml`.
