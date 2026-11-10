import { SITE_URL, SITE_DESCRIPTION } from '../site-config';
import { textResponse } from '../lib/discovery';
export function GET(){return textResponse(`# CR2

> ${SITE_DESCRIPTION}

The show is hosted by Chill Pill (@ripchillpill) and R2D2 (@R2D2zen). CR2 is independent and is not affiliated with Robinhood Markets, Inc. Audience and follower numbers on the About page are attributed historical snapshots, not live analytics.

CR2 welcomes automated crawling of its public pages for search, retrieval, summaries and citation. Crawler access is allowed in robots.txt. Guest requests are private communications and are not part of the public content.

## Pages

- [CR2 homepage](${SITE_URL}/index.md): Show, hosts, latest broadcasts and guest-booking availability.
- [About CR2](${SITE_URL}/about/index.md): Audience, distribution, guests and measurement notes.

## Optional

- [Complete text](${SITE_URL}/llms-full.txt): Both pages in one file.
- [Sitemap](${SITE_URL}/sitemap.xml): Canonical pages and images.
- [Broadcast feed](${SITE_URL}/feed.xml): Latest episode titles, dates, guests and replay links.
- [CR2 on X](https://x.com/chillwithr2): Official show account and broadcasts.
`);}
