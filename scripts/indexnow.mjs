// Ping IndexNow for live chillwithr2.com URLs.
// Usage: node scripts/indexnow.mjs <url> [url...]   or   node scripts/indexnow.mjs --all
// --all walks the live sitemap index and every child map except image sitemaps, so /episodes/ (in sitemap-pages) and video locs (in sitemap-videos) are included.
const KEY = '3e4c5db17dff8b188f44eefc396f3658';
const HOST = 'chillwithr2.com';
let urls = process.argv.slice(2);
if (urls[0] === '--all') {
  const idx = await (await fetch('https://' + HOST + '/sitemap.xml?v=' + Date.now())).text();
  const maps = [...idx.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  urls = [];
  for (const m of maps) {
    if (!m.endsWith('.xml')) { urls.push(m); continue; }
    if (m.includes('image')) continue;
    const x = await (await fetch(m)).text();
    urls.push(...[...x.matchAll(/<loc>([^<]+)<\/loc>/g)].map(r => r[1]));
  }
}
urls = [...new Set(urls)].filter(u => u.startsWith('https://' + HOST));
if (!urls.length) { console.error('no urls'); process.exit(1); }
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: 'https://' + HOST + '/' + KEY + '.txt', urlList: urls }),
});
console.log('IndexNow', res.status, urls.length, 'urls');
if (res.status >= 300) process.exit(1);
