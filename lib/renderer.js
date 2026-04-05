const { marked } = require("marked");

marked.setOptions({
  gfm: true,
  breaks: true,
});

function renderHTML(mdContent, fileName) {
  const rendered = marked.parse(mdContent);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${fileName}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #0d1117;
    --surface: #161b22;
    --surface-2: #1c2129;
    --border: #30363d;
    --border-light: #3d444d;
    --text: #e6edf3;
    --text-muted: #8b949e;
    --text-subtle: #6e7681;
    --accent: #58a6ff;
    --accent-soft: #1f6feb33;
    --green: #3fb950;
    --green-soft: #23863633;
    --purple: #bc8cff;
    --orange: #f0883e;
    --red: #f85149;
    --yellow: #d29922;
    --code-bg: #0d1117;
    --inline-code-bg: #262c36;
    --scrollbar: #30363d;
    --scrollbar-hover: #484f58;
    --gradient-1: #58a6ff;
    --gradient-2: #bc8cff;
    --gradient-3: #3fb950;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
  }

  ::-webkit-scrollbar { width: 8px; height: 8px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--scrollbar); border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--scrollbar-hover); }

  /* --- Top bar --- */
  .topbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 48px;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    padding: 0 24px;
    z-index: 100;
    backdrop-filter: blur(12px);
    background: rgba(22, 27, 34, 0.85);
  }

  .topbar-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 8px;
  }

  .topbar-dot.red { background: #f85149; }
  .topbar-dot.yellow { background: #d29922; }
  .topbar-dot.green { background: #3fb950; }

  .topbar-title {
    margin-left: 16px;
    font-size: 13px;
    color: var(--text-muted);
    font-weight: 500;
    letter-spacing: 0.3px;
    font-family: 'JetBrains Mono', monospace;
  }

  .topbar-actions {
    margin-left: auto;
    display: flex;
    gap: 8px;
  }

  .topbar-btn {
    background: var(--surface-2);
    border: 1px solid var(--border);
    color: var(--text-muted);
    padding: 4px 12px;
    border-radius: 6px;
    font-size: 12px;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    transition: all 0.15s ease;
  }

  .topbar-btn:hover {
    background: var(--border);
    color: var(--text);
  }

  /* --- Sidebar TOC --- */
  .layout {
    display: flex;
    padding-top: 48px;
  }

  .sidebar {
    position: fixed;
    top: 48px;
    left: 0;
    width: 280px;
    height: calc(100vh - 48px);
    background: var(--surface);
    border-right: 1px solid var(--border);
    overflow-y: auto;
    padding: 20px 0;
    transition: transform 0.25s ease;
  }

  .sidebar-header {
    padding: 0 20px 16px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    color: var(--text-subtle);
  }

  .toc-item {
    display: block;
    padding: 6px 20px;
    color: var(--text-muted);
    text-decoration: none;
    font-size: 13px;
    transition: all 0.15s ease;
    border-left: 2px solid transparent;
  }

  .toc-item:hover {
    color: var(--text);
    background: var(--surface-2);
  }

  .toc-item.active {
    color: var(--accent);
    border-left-color: var(--accent);
    background: var(--accent-soft);
  }

  .toc-item.depth-2 { padding-left: 20px; }
  .toc-item.depth-3 { padding-left: 36px; font-size: 12px; }

  /* --- Main content --- */
  .content {
    margin-left: 280px;
    max-width: 860px;
    padding: 48px 56px 120px;
    width: 100%;
  }

  /* --- Typography --- */
  .markdown-body h1 {
    font-size: 2em;
    font-weight: 700;
    margin: 48px 0 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border);
    background: linear-gradient(135deg, var(--gradient-1), var(--gradient-2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.5px;
  }

  .markdown-body h1:first-child {
    margin-top: 0;
    font-size: 2.4em;
  }

  .markdown-body h2 {
    font-size: 1.5em;
    font-weight: 600;
    margin: 40px 0 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border);
    color: var(--text);
    letter-spacing: -0.3px;
  }

  .markdown-body h3 {
    font-size: 1.2em;
    font-weight: 600;
    margin: 32px 0 12px;
    color: var(--accent);
  }

  .markdown-body h4 {
    font-size: 1em;
    font-weight: 600;
    margin: 24px 0 8px;
    color: var(--purple);
  }

  .markdown-body p {
    margin: 0 0 16px;
    color: var(--text-muted);
  }

  .markdown-body strong {
    color: var(--text);
    font-weight: 600;
  }

  .markdown-body a {
    color: var(--accent);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.15s ease;
  }

  .markdown-body a:hover {
    border-bottom-color: var(--accent);
  }

  /* --- Lists --- */
  .markdown-body ul,
  .markdown-body ol {
    padding-left: 24px;
    margin: 0 0 16px;
  }

  .markdown-body li {
    margin: 4px 0;
    color: var(--text-muted);
  }

  .markdown-body li::marker {
    color: var(--border-light);
  }

  /* --- Blockquotes --- */
  .markdown-body blockquote {
    margin: 0 0 16px;
    padding: 12px 20px;
    border-left: 3px solid var(--accent);
    background: var(--accent-soft);
    border-radius: 0 8px 8px 0;
  }

  .markdown-body blockquote p {
    margin: 0;
    color: var(--text);
    font-size: 14px;
  }

  /* --- Code blocks --- */
  .markdown-body pre {
    background: var(--code-bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 16px 20px;
    margin: 0 0 16px;
    overflow-x: auto;
    position: relative;
  }

  .markdown-body pre code {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 13px;
    line-height: 1.6;
    color: var(--text);
    background: none;
    padding: 0;
    border: none;
    border-radius: 0;
  }

  .markdown-body code {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 0.875em;
    background: var(--inline-code-bg);
    color: var(--orange);
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid var(--border);
  }

  /* --- Tables --- */
  .markdown-body table {
    width: 100%;
    border-collapse: collapse;
    margin: 0 0 16px;
    font-size: 14px;
  }

  .markdown-body thead th {
    background: var(--surface);
    color: var(--text);
    font-weight: 600;
    text-align: left;
    padding: 10px 16px;
    border: 1px solid var(--border);
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .markdown-body tbody td {
    padding: 10px 16px;
    border: 1px solid var(--border);
    color: var(--text-muted);
  }

  .markdown-body tbody tr:nth-child(even) {
    background: var(--surface);
  }

  .markdown-body tbody tr:hover {
    background: var(--surface-2);
  }

  /* --- Horizontal rules --- */
  .markdown-body hr {
    border: none;
    height: 1px;
    background: var(--border);
    margin: 32px 0;
  }

  /* --- Images --- */
  .markdown-body img {
    max-width: 100%;
    border-radius: 8px;
    border: 1px solid var(--border);
  }

  /* --- Scroll spy active heading --- */
  .heading-anchor {
    scroll-margin-top: 72px;
  }

  /* --- Responsive --- */
  @media (max-width: 1024px) {
    .sidebar { transform: translateX(-100%); }
    .sidebar.open { transform: translateX(0); }
    .content { margin-left: 0; padding: 32px 24px 80px; }
  }

  /* --- Print --- */
  @media print {
    .topbar, .sidebar { display: none; }
    .content { margin-left: 0; max-width: 100%; }
    body { background: white; color: #1a1a1a; }
  }

  /* --- Syntax-like coloring for code (basic) --- */
  .markdown-body pre code .keyword { color: var(--purple); }
  .markdown-body pre code .string { color: var(--green); }
  .markdown-body pre code .comment { color: var(--text-subtle); }

  /* --- Fade-in animation --- */
  .markdown-body > * {
    animation: fadeUp 0.4s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .markdown-body > *:nth-child(1)  { animation-delay: 0.02s; }
  .markdown-body > *:nth-child(2)  { animation-delay: 0.04s; }
  .markdown-body > *:nth-child(3)  { animation-delay: 0.06s; }
  .markdown-body > *:nth-child(4)  { animation-delay: 0.08s; }
  .markdown-body > *:nth-child(5)  { animation-delay: 0.10s; }
  .markdown-body > *:nth-child(6)  { animation-delay: 0.12s; }
  .markdown-body > *:nth-child(7)  { animation-delay: 0.14s; }
  .markdown-body > *:nth-child(8)  { animation-delay: 0.16s; }
  .markdown-body > *:nth-child(9)  { animation-delay: 0.18s; }
  .markdown-body > *:nth-child(10) { animation-delay: 0.20s; }
</style>
</head>
<body>

<!-- Top Bar -->
<div class="topbar">
  <span class="topbar-dot red"></span>
  <span class="topbar-dot yellow"></span>
  <span class="topbar-dot green"></span>
  <span class="topbar-title">${fileName}</span>
  <div class="topbar-actions">
    <button class="topbar-btn" onclick="toggleSidebar()">TOC</button>
    <button class="topbar-btn" onclick="toggleTheme()">Light</button>
    <button class="topbar-btn" onclick="scrollToTop()">Top</button>
  </div>
</div>

<div class="layout">
  <!-- Sidebar (generated by JS) -->
  <nav class="sidebar" id="sidebar"></nav>

  <!-- Content -->
  <main class="content">
    <article class="markdown-body" id="content">
      ${rendered}
    </article>
  </main>
</div>

<script>
(function() {
  // --- Build TOC from headings ---
  const content = document.getElementById('content');
  const sidebar = document.getElementById('sidebar');
  const headings = content.querySelectorAll('h1, h2, h3');
  let tocHTML = '<div class="sidebar-header">On this page</div>';

  headings.forEach((h, i) => {
    const id = 'heading-' + i;
    h.id = id;
    h.classList.add('heading-anchor');
    const depth = parseInt(h.tagName[1]);
    tocHTML += '<a class="toc-item depth-' + depth + '" href="#' + id + '">' + h.textContent + '</a>';
  });

  sidebar.innerHTML = tocHTML;

  // --- Scroll spy ---
  const tocLinks = sidebar.querySelectorAll('.toc-item');

  function updateActive() {
    let current = 0;
    headings.forEach((h, i) => {
      if (h.getBoundingClientRect().top <= 100) current = i;
    });
    tocLinks.forEach(l => l.classList.remove('active'));
    if (tocLinks[current]) tocLinks[current].classList.add('active');
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();

  // --- Sidebar toggle (mobile) ---
  window.toggleSidebar = function() {
    sidebar.classList.toggle('open');
  };

  // --- Scroll to top ---
  window.scrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Light/Dark toggle ---
  const lightVars = {
    '--bg': '#ffffff',
    '--surface': '#f6f8fa',
    '--surface-2': '#eef1f5',
    '--border': '#d0d7de',
    '--border-light': '#c5ccd3',
    '--text': '#1f2328',
    '--text-muted': '#57606a',
    '--text-subtle': '#8b949e',
    '--accent': '#0969da',
    '--accent-soft': '#0969da1a',
    '--green': '#1a7f37',
    '--green-soft': '#1a7f371a',
    '--purple': '#8250df',
    '--orange': '#bc4c00',
    '--red': '#cf222e',
    '--yellow': '#9a6700',
    '--code-bg': '#f6f8fa',
    '--inline-code-bg': '#eff1f3',
    '--scrollbar': '#d0d7de',
    '--scrollbar-hover': '#afb8c1',
  };

  const darkVars = {};
  for (const key in lightVars) {
    darkVars[key] = getComputedStyle(document.documentElement).getPropertyValue(key).trim();
  }

  let isDark = true;
  window.toggleTheme = function() {
    isDark = !isDark;
    const vars = isDark ? darkVars : lightVars;
    for (const [k, v] of Object.entries(vars)) {
      document.documentElement.style.setProperty(k, v);
    }
    document.querySelector('.topbar-btn:nth-child(2)').textContent = isDark ? 'Light' : 'Dark';
  };
})();
</script>

</body>
</html>`;
}

module.exports = { renderHTML };
