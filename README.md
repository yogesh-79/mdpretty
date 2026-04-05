# mdpretty

Beautiful markdown viewer — render `.md` files in a styled browser UI with TOC, dark/light themes, and scroll spy.

## Install

```bash
npm install -g mdpretty
```

## CLI Usage

```bash
# Open in browser (default port 3333)
mdpretty README.md

# Output rendered HTML to stdout
mdpretty README.md --html

# Export to an HTML file
mdpretty README.md --out=output.html
```

## Programmatic Usage

```js
const { renderHTML, serve } = require("mdpretty");

// Get a self-contained HTML string
const html = renderHTML("# Hello\n\nWorld", "example.md");

// Start a live-reload server
serve("./README.md", { port: 3333 });
```

## Features

- Sidebar table of contents generated from headings
- Dark / light theme toggle
- Scroll spy highlights current section
- Single self-contained HTML output (no external assets)
- Live reload on browser refresh in server mode

## License

MIT
