# Resume Engine

A powerful, highly-customizable resume generator. Generate tailored resumes for different roles from a single Master CV data source using advanced tag-based filtering.

**Repository:** [mvvk-space/curriculum-vitae-to-resume-generator](https://github.com/mvvk-space/curriculum-vitae-to-resume-generator)

## Features

- **Multi-Profile Generation** — create specific CV versions (Teaching, Technical, Business, etc.) from one `master-cv.json`.
- **Multilingual Support** — seamlessly switch between English and Thai resume versions, including localized date formats and headers.
- **Dynamic Themes** — switch between multiple professional styles in real time.
- **Identity Gallery** — drag-and-drop profile pictures and select them from a visual gallery.
- **PDF Ready** — optimized for "Print to PDF" with letter-size formatting and high-fidelity layouts.
- **Built with Astro** — deployed to Cloudflare (see `wrangler.json`).

## What's here

- `src/` — the Astro app
- `dist/` — a pre-built version, ready to serve
- `public/` — static assets
- `wrangler.json` — Cloudflare Workers config

## Running it

```sh
bun install
bun run dev
```

Or serve the pre-built `dist/` directory with any static file server.