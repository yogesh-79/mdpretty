#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const flags = {};
const positional = [];

for (const arg of args) {
  if (arg === "--help" || arg === "-h") {
    flags.help = true;
  } else if (arg === "--version" || arg === "-v") {
    flags.version = true;
  } else if (arg === "--no-browser") {
    flags.noBrowser = true;
  } else if (arg.startsWith("--port=")) {
    flags.port = parseInt(arg.split("=")[1], 10);
  } else if (arg === "--html") {
    flags.html = true;
  } else if (arg.startsWith("--out=")) {
    flags.out = arg.split("=")[1];
  } else {
    positional.push(arg);
  }
}

if (flags.version) {
  const pkg = require("../package.json");
  console.log(pkg.version);
  process.exit(0);
}

if (flags.help || positional.length === 0) {
  console.log(`
  mdpretty - Beautiful markdown viewer

  Usage:
    mdpretty <file.md>              Open in browser
    mdpretty <file.md> --html       Output rendered HTML to stdout
    mdpretty <file.md> --out=f.html Export to HTML file

  Options:
    --port=<n>       Server port (default: 3333)
    --no-browser     Start server without opening browser
    --html           Print rendered HTML to stdout (no server)
    --out=<file>     Write rendered HTML to file (no server)
    -v, --version    Show version
    -h, --help       Show this help
`);
  process.exit(0);
}

const filePath = path.resolve(positional[0]);

if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

// --- HTML output mode (no server) ---
if (flags.html || flags.out) {
  const { renderHTML } = require("../lib/renderer");
  const md = fs.readFileSync(filePath, "utf-8");
  const html = renderHTML(md, path.basename(filePath));

  if (flags.out) {
    fs.writeFileSync(flags.out, html, "utf-8");
    console.log(`Written to ${flags.out}`);
  } else {
    process.stdout.write(html);
  }
  process.exit(0);
}

// --- Server mode (default) ---
const { serve } = require("../lib/server");
serve(filePath, {
  port: flags.port,
  noBrowser: flags.noBrowser,
});
