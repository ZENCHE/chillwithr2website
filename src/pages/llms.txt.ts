import { SITE_URL, SITE_DESCRIPTION } from '../site-config';
import { episodes } from '../data';
import { textResponse } from '../lib/discovery';
import { sitePages, indexablePages, pageUrl } from '../lib/pages';
import { episodePage } from '../lib/episode-pages';
// Generated at build: pages come from the registry (plus any unregistered route), episodes from src/data.ts.
export function GET(){
  const extra=indexablePages().filter(p=>!sitePages.some(s=>s.path===p.path));
  return textResponse(`# CR2

> ${SITE_DESCRIPTION}

CR2 is independent media for crypto, finance and tech. The show is hosted by Chill Pill (@ripchillpill) and R2D2 (@R2D2zen). CR2 is not affiliated with Robinhood Markets, Inc. Chill with R2 livestreams are a paid partnership with Mosh. Audience and follower numbers on the Partners page are attributed snapshots (November 2026), not live analytics.

CR2 welcomes automated crawling of its public pages for search, retrieval, summaries and citation. Crawler access is allowed in robots.txt. Guest requests are private communications and are not part of the public content.

## Pages

${sitePages.map(p=>`- [${p.name}](${pageUrl(p.markdown)}): ${p.summary}`).join('\n')}
${extra.map(p=>`- [${pageUrl(p.path)}](${pageUrl(p.path)})`).join('\n')}
## Episodes

${episodes.map(e=>{const p=episodePage(e.number);return p?`- [Episode ${e.number}: ${e.title}](${pageUrl(p.path)}): ${e.dateTime}, live on X. ${e.guests}. Page with summary, takeaways and chapters; [X replay](${e.url}).`:`- [Episode ${e.number}: ${e.title}](${e.url}): ${e.dateTime}, live on X. ${e.guests}.`;}).join('\n')}

## Optional

- [Complete text](${SITE_URL}/llms-full.txt): Every page above in one file.
- [Sitemap](${SITE_URL}/sitemap.xml): Canonical pages and images.
- [Episode feed](${SITE_URL}/feed.xml): Every episode with title, date, guests and replay link.
- [CR2 on X](https://x.com/chillwithr2): Official show account and broadcasts.
`);}
