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

## Deploy

Static files only — drag the folder into Netlify, or push to GitHub and enable Pages.
