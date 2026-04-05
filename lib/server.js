const http = require("http");
const fs = require("fs");
const path = require("path");
const { renderHTML } = require("./renderer");

function serve(filePath, options = {}) {
  const port = options.port || 3333;
  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    console.error(`File not found: ${absolutePath}`);
    process.exit(1);
  }

  const server = http.createServer((req, res) => {
    if (req.url === "/" || req.url === "/index.html" || req.url === "/reload") {
      const md = fs.readFileSync(absolutePath, "utf-8");
      const html = renderHTML(md, path.basename(absolutePath));
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(html);
    } else {
      res.writeHead(404);
      res.end("Not found");
    }
  });

  server.listen(port, async () => {
    const url = `http://localhost:${port}`;
    console.log(`\n  mdpretty`);
    console.log(`  ────────`);
    console.log(`  File:   ${absolutePath}`);
    console.log(`  Server: ${url}\n`);

    if (!options.noBrowser) {
      const { default: open } = await import("open");
      await open(url);
    }
  });

  process.on("SIGINT", () => {
    console.log("\n  Server stopped.");
    server.close();
    process.exit(0);
  });

  return server;
}

module.exports = { serve };
