import { episodes } from '../data';
import { SITE_URL, SITE_DESCRIPTION } from '../site-config';
import { xml } from '../lib/discovery';
import { episodePage } from '../lib/episode-pages';
// Every episode from src/data.ts, newest first. Links point to the X replay until episode pages exist.
const pubDate=(d:string)=>new Date(d+'T15:00:00Z').toUTCString();
export function GET(){return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>
  <title>Chill with R2: every episode</title><link>${SITE_URL}/</link>
  <description>${xml(SITE_DESCRIPTION)}</description><language>en</language>
  <lastBuildDate>${pubDate(episodes[0].dateTime)}</lastBuildDate>
  <image><url>${SITE_URL}/apple-touch-icon.png</url><title>Chill with R2: every episode</title><link>${SITE_URL}/</link></image>
  <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${episodes.map(e=>{const p=episodePage(e.number);const link=p?SITE_URL+p.path:e.url;return `  <item><title>${xml(`Episode ${e.number}: ${e.title}`)}</title><link>${xml(link)}</link><guid isPermaLink="false">${xml(e.url)}</guid><description>${xml(p?`${p.description} Watch the full replay on X: ${e.url}`:`Chill with R2 episode ${e.number}, live on X. ${e.guests.startsWith('Hosts only')?'Hosts only: Chill Pill and R2D2.':'Guests: '+e.guests.replace(/ · /g,', ')+'.'} Watch the full replay on X.`)}</description><pubDate>${pubDate(e.dateTime)}</pubDate></item>`;}).join('\n')}
</channel></rss>`,{headers:{'Content-Type':'application/rss+xml; charset=utf-8'}});}
