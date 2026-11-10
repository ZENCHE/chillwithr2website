import { episodes, hosts, guests, communities } from '../data';
import { SITE_URL, SITE_DESCRIPTION, bookingEndpoint } from '../site-config';
export const xml=(value:string)=>value.replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]!));
export const xmlResponse=(content:string)=>new Response('<?xml version="1.0" encoding="UTF-8"?>\n'+content,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
export const textResponse=(content:string,type='text/plain')=>new Response(content,{headers:{'Content-Type':`${type}; charset=utf-8`}});
export const homeMarkdown=()=>`# CR2 — Crypto, finance & tech

> ${SITE_DESCRIPTION}

Canonical page: ${SITE_URL}/

CR2 is independent media. Its flagship show, Chill with R2, features live conversations on Robinhood Chain. CR2 is not affiliated with Robinhood Markets, Inc.

## Latest broadcasts

${episodes.slice(0,3).map(e=>`- [Episode ${e.number}: ${e.title}](${e.url}) — ${e.dateTime}. Guests: ${e.guests}.`).join('\n')}

## Hosts

${hosts.map(h=>`- [${h.name}](${h.url}) — ${h.handle}.`).join('\n')}

## Guest appearances

${bookingEndpoint ? `Guest requests are open through the [booking form](${SITE_URL}/#guest-spot). The form asks for name, X handle, email, project and message. A request is not a confirmed booking.` : 'Guest bookings are opening soon. The request form is currently closed and does not collect submissions.'}

## More from CR2

- [About CR2 and its audience](${SITE_URL}/about/)
- [CR2 on X](https://x.com/chillwithr2)
- [Broadcast feed](${SITE_URL}/feed.xml)
`;
export const aboutMarkdown=()=>`# About CR2 — Meet your next audience

> Independent media for crypto, finance and tech, with Chill with R2 at the center.

Canonical page: ${SITE_URL}/about/

The flagship podcast covers Robinhood Chain with the people building on it. The audience includes founders, high-net-worth investors, technologists and finance professionals.

## Audience and distribution

- 150k+ cumulative views on October 2026 CR2-related X posts across @chillwithr2, @R2D2zen and @ripchillpill. Public X metrics as of 22 October; these are not unique viewers.
- 757+ viewer hours per month, reported by CR2.
- United States: 28%; United Kingdom: 8%; rest of the world: 64%.
- Chill Pill: approximately 100k X followers. R2D2: approximately 14.6k X followers. These are October 2026 snapshots supplied by CR2, not live counts.
- 6,000+ community memberships across the three communities with published sizes. Memberships may overlap; MHH Colony is additional.

${communities.map(c=>`- ${c.name}: ${c.count} ${c.label}.`).join('\n')}

## Guests who have appeared on CR2

${guests.map(g=>`- [${g.name}](https://x.com/${g.handle}) — ${g.role.replace(/[¹²]/g,'')}.`).join('\n')}

Zona won the Open Category at the Arbitrum × Robinhood Chain Open House buildathon, which drew 1,200+ builders. Guest roles reflect the supplied guest list. Guest follower figures are approximate October 2026 snapshots, not live counts. Guest appearances do not imply endorsements.

## About the numbers

Figures and audience profile were supplied by CR2. Community sizes are reported memberships and subscriptions, not deduplicated people. Examples from the 22 October snapshot: launch post, 10,100 views; Episode 3 with @that1618guy, 8,258; Episode 3 clip, 8,167. CR2 is not affiliated with Robinhood Markets, Inc.

- [Watch the latest episode](${episodes[0].url})
- [CR2 homepage](${SITE_URL}/)
- [CR2 on X](https://x.com/chillwithr2)
`;
