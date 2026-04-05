# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

mdpretty is a CLI tool and Node.js library that renders Markdown files in a styled browser UI with a sidebar TOC, dark/light theme toggle, and scroll spy. It uses `marked` for Markdown parsing and `open` to launch the browser.

## Commands

- `npm start` — runs `node bin/cli.js` (requires a .md file argument)
- `node bin/cli.js <file.md>` — open markdown file in browser (default port 3333)
- `node bin/cli.js <file.md> --html` — output rendered HTML to stdout
- `node bin/cli.js <file.md> --out=output.html` — export to HTML file
- No test suite exists yet (`npm test` is a placeholder)

## Architecture

Three-layer design, all CommonJS:

- **`bin/cli.js`** — CLI entry point. Parses flags manually (no arg-parsing library), then either renders HTML to stdout/file or starts the server.
- **`lib/renderer.js`** — `renderHTML(mdContent, fileName)` returns a complete standalone HTML page (CSS, JS, and rendered content all inlined). The HTML includes a TOC sidebar built client-side from headings, scroll spy, and a dark/light theme toggle.
- **`lib/server.js`** — `serve(filePath, options)` spins up an HTTP server that re-reads the markdown file on each request (live reload on browser refresh). Uses dynamic `import("open")` since `open` is ESM-only.
- **`index.js`** — public API, re-exports `renderHTML` and `serve`.

Key detail: the renderer produces a **single self-contained HTML string** with all styles and scripts inlined (no external assets beyond Google Fonts). The TOC and scroll spy are built client-side via an inline `<script>` block.
