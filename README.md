# A NEW SKY

An HTML5 point-and-click adventure game by Alex Ayers (2012), ported to
TypeScript and playable on GitHub Pages.

**Play:** https://alexayers.github.io/www.anewsky.com/

## Controls

- **Left click** — interact / select an inventory item, use a selected item on
  the world, and walk through doors.
- **Right click** — examine the selected inventory item (close-up view).

## Tech

- **TypeScript** compiled and bundled with **Vite**.
- HTML5 Canvas 2D rendering. No runtime dependencies (jQuery was removed).
- The game renders at a fixed internal resolution of 350×400 and the canvas is
  scaled with CSS to fill the browser window (letterboxed, pixel-perfect), so
  it is effectively full screen at any window size.

## Project layout

```
index.html            host page (single full-window canvas)
src/                  TypeScript source
  main.ts             entry point: canvas, input, render loop
  ui.ts               DOM helpers for the title/subtitle overlays
  style.css           full-screen layout
  engine/             scenemgr, room, inventory, audio, preload, constants, types
  objects/            game-object, door, object-database
  rendering/          layer, particle
  rooms/              begin + room0..room34 + index.ts (registry)
public/               static assets copied verbatim to the build
  img/  audio/  anewsky.png
```

## Local development

Requires Node.js 20.19+ or 22.12+.

```bash
npm install      # install dev dependencies (Vite + TypeScript)
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check and produce a production build in dist/
npm run preview  # serve the production build locally
npm run typecheck # type-check only (tsc --noEmit)
```

## Deployment (GitHub Pages)

Pushes to `master` trigger `.github/workflows/deploy.yml`, which builds the site
and publishes `dist/` to GitHub Pages.

One-time setup: in the repository, go to **Settings → Pages** and set
**Source: GitHub Actions**.

The Vite build uses a relative base (`base: "./"`), so the site works when
served from the project subpath (`/www.anewsky.com/`) without any extra
configuration.
