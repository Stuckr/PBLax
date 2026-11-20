const http = require('http');
const fs = require('fs');
const path = require('path');
const ROOT = 'Z:/PBInput/LAX Scorekeeper';
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css' };
http.createServer((req, res) => {
  const name = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'lacrosse-scorekeeper.html';
  const file = path.join(ROOT, name);
  if (!file.startsWith(path.resolve(ROOT))) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404); return res.end('not found'); }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(buf);
  });
}).listen(8765, '127.0.0.1', () => console.log('serving ' + ROOT + ' on http://127.0.0.1:8765'));
