import { episodes } from '../data';
import { SITE_URL, SITE_DESCRIPTION } from '../site-config';
import { xml } from '../lib/discovery';
export function GET(){return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>
  <title>Chill with R2 — Latest broadcasts</title><link>${SITE_URL}/</link>
  <description>${xml(SITE_DESCRIPTION)}</description><language>en</language>
  <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
  ${episodes.slice(0,3).map(e=>`<item><title>${xml(`Episode ${e.number}: ${e.title}`)}</title><link>${xml(e.url)}</link><guid isPermaLink="true">${xml(e.url)}</guid><description>${xml(`Guests: ${e.guests}. Watch the full replay on X.`)}</description><pubDate>${new Date(e.dateTime+'T00:00:00Z').toUTCString()}</pubDate></item>`).join('\n')}
</channel></rss>`,{headers:{'Content-Type':'application/rss+xml; charset=utf-8'}});}
