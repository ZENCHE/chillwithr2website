import { episodes, guests, hosts, regulars, show } from '../data';

// About page copy, shared by /about/ and /about/index.md so the two never drift.
const firstEpisode=episodes[episodes.length-1];
const appearances=(handle:string)=>episodes.filter(e=>e.guests.toLowerCase().includes('@'+handle.toLowerCase()));
export const aboutTitle='About CR2: the independent crypto livestream Chill with R2';
export const aboutDescription='Who makes Chill with R2, the live crypto show on X: hosts R2D2 and Chill Pill, regular guests, how the show works, our independence and disclosure policy, and how to reach us.';
export const aboutLead=`CR2 is independent media for crypto, finance and tech. Our flagship show, ${show.name}, is a crypto livestream on X every Tuesday and Thursday at 15:00 UTC, with founders, builders and investors from across the space.`;
export const aboutWhat=[
  `${show.name} goes live on X every Tuesday and Thursday at 15:00 UTC. Each show runs ${show.length} and stays up as a replay. Between shows, CR2 posts five days a week across @chillwithr2, @R2D2zen and @ripchillpill.`,
  'We cover Robinhood Chain, tokenized stocks, onchain finance and the macro picture behind them, from a TradFi to crypto angle. Recurring segments include The Golden Ratio and In the Hood.'
];
export const aboutSince=`The first episode, “${firstEpisode.title}”, went live on 6 October 2026. Since then CR2 has aired ${episodes.length} episodes with ${guests.length} guests.`;
export const aboutHosts=hosts;
export const aboutRegulars=regulars.map(handle=>guests.find(g=>g.handle===handle)).filter((g):g is typeof guests[number]=>Boolean(g)).map(g=>({...g,role:g.role.replace(/[¹²]/g,''),appearances:appearances(g.handle)}));
export const aboutIndependence=[
  'CR2 is independent. It is not affiliated with, endorsed by or sponsored by Robinhood Markets, Inc. or any of its affiliates. Robinhood Chain is a topic we cover, not a partner.',
  'Guest appearances do not imply endorsement by CR2, and CR2 appearing alongside a project does not imply endorsement by that project.'
];
export const aboutPolicy=[
  'Chill with R2 livestreams are a paid partnership with Mosh. We disclose it on air when Mosh comes up. Justin Bebis (@justinbebis), a regular guest, is a co-founder of Mosh.',
  'Paid posts and sponsored segments are disclosed on air.',
  'Hosts and guests disclose relevant holdings when a specific token or project is discussed.',
  'Nothing on CR2 is financial advice. Shows and posts are research and conversation, not recommendations to buy or sell.'
];
