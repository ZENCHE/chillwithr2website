import { episodes, hosts, guests, communities } from '../data';
import { SITE_URL, SITE_DESCRIPTION, bookingEndpoint, sponsorEndpoint } from '../site-config';
export const xml=(value:string)=>value.replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]!));
export const xmlResponse=(content:string)=>new Response('<?xml version="1.0" encoding="UTF-8"?>\n'+content,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
export const textResponse=(content:string,type='text/plain')=>new Response(content,{headers:{'Content-Type':`${type}; charset=utf-8`}});
export const homeMarkdown=()=>`# CR2 — Crypto, finance & tech

> ${SITE_DESCRIPTION}

Canonical page: ${SITE_URL}/

CR2 is independent media. Its flagship show, Chill with R2, features live conversations on Robinhood Chain. CR2 is not affiliated with Robinhood Markets, Inc.

## Latest broadcasts

${episodes.slice(0,3).map(e=>`- [Episode ${e.number}: ${e.title}](${e.url}) — ${e.dateTime}. Guests: ${e.guests}.`).join('\n')}

## Episode archive

${episodes.map(e=>`- [Episode ${e.number}: ${e.title}](${e.url}) — ${e.dateTime}. ${e.guests}.`).join('\n')}

## Hosts

${hosts.map(h=>`- [${h.name}](${h.url}) — ${h.handle}. ${h.bio}`).join('\n')}

## Guest appearances

${bookingEndpoint ? `Guest requests are open through the [booking form](${SITE_URL}/#guest-spot). The form asks for name, X handle, email, project and message. A request is not a confirmed booking.` : 'Guest bookings are opening soon. The request form is currently closed and does not collect submissions.'}

## Sponsorship

Put your brand in front of founders, investors and builders. [See the Sponsors page](${SITE_URL}/sponsors/) or use the [sponsorship form](${SITE_URL}/sponsors/#sponsor). ${sponsorEndpoint ? "Sponsorship inquiries are open." : "Sponsorship inquiries are opening soon; the form is currently closed and collects no details."}

## More from CR2

- [Sponsor CR2: audience, reach and formats](${SITE_URL}/sponsors/)
- [CR2 on X](https://x.com/chillwithr2)
- [Broadcast feed](${SITE_URL}/feed.xml)
`;
export const sponsorsMarkdown=()=>`# Sponsor CR2 — Put your brand in the front row

> Independent media for crypto, finance and tech, with Chill with R2 at the center. This page is for sponsors and partners.

Canonical page: ${SITE_URL}/sponsors/

Chill with R2 goes live on X every Tuesday and Thursday with the founders and builders shaping Robinhood Chain. The audience includes founders, high-net-worth investors, technologists and finance professionals. Chill with R2 is currently powered by Mosh.

## November 2026 snapshot

- 600k+ X views on CR2 posts across @chillwithr2, @R2D2zen and @ripchillpill, September–November 2026 (supplied by CR2; a 16 November pull counted 512,863 excluding reposts and 646,527 including them). Views, not unique viewers.
- 20k+ livestream views: X replay totals for Episodes 01–11 as of 16 November (20,198), live and replay views combined.
- ${episodes.length} live episodes since 6 October 2026 and ${guests.length} guests on air.
- Chill Pill: approximately 100k X followers. R2D2: 15k X followers. Public X counts checked 17 November 2026.
- United States: 28%; United Kingdom: 8%; rest of the world: 64%.
- 6,000+ community memberships across the three communities with published sizes. Memberships may overlap; MHH Colony is additional.

${communities.map(c=>`- ${c.name}: ${c.count} ${c.label}.`).join('\n')}

## Formats

- Chill with R2 livestream: Tuesday and Thursday, 15:00 UTC, live on X, about 90 minutes, with a replay. Recurring segments: The Golden Ratio and In the Hood.
- X Spaces: Monday and Wednesday.
- Clips and posts across @chillwithr2, @R2D2zen and @ripchillpill.

## Guests who have appeared on CR2

${guests.map(g=>`- [${g.name}](https://x.com/${g.handle}) — ${g.role.replace(/[¹²]/g,'')}.`).join('\n')}

Zona won the Open Category at the Arbitrum × Robinhood Chain Open House buildathon, which drew 1,200+ builders. Guest appearances do not imply endorsements.

## How to partner

1. Send an enquiry through the [sponsorship form](${SITE_URL}/sponsors/#sponsor). It asks for name, email, company or project, an optional X handle, and a message.
2. Shape the fit: formats, segments, timing and posts.
3. Go live on X in front of the CR2 audience.

${sponsorEndpoint ? "Sponsorship inquiries are open." : "Sponsorship inquiries are opening soon; the form is currently closed and collects no details."} No rates, packages or audience guarantees are published. CR2 is not affiliated with Robinhood Markets, Inc.

- [CR2 homepage](${SITE_URL}/)
- [CR2 on X](https://x.com/chillwithr2)
`;
