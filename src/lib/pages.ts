import { episodes } from '../data';
import { SITE_URL, SITE_DESCRIPTION, pageDates } from '../site-config';
import { homeMarkdown, partnersMarkdown, communityMarkdown, episodeMarkdown } from './discovery';
import { episodePages } from './episode-pages';

// One registry for every indexable page. The sitemap, llms.txt and llms-full.txt are
// generated from it at build time. Any .astro route that is missing here is still
// picked up by `discoveredRoutes()` so a new page never silently drops out of the sitemap.
export interface SitePage { path:string; name:string; summary:string; title:string; description:string; markdown:string; lastmod:string; text:()=>string; }
const latest=(...dates:string[])=>dates.sort().at(-1)!;
export const homeTitle='Chill with R2: crypto livestream on Robinhood Chain and tokenized stocks | CR2';
export const partnersTitle='Partner with CR2 | Chill with R2 crypto livestream';
export const partnersDescription='Partner with CR2 and Chill with R2: live Tuesday and Thursday shows on X, posts five days a week, live product testing, 600k+ X views on CR2 posts (Sep to Nov 2026) and an audience of founders, investors and builders.';
export const communityTitle='Join the CR2 community | Chill with R2';
export const communityDescription='Join the CR2 community: watch Chill with R2 live on X every Tuesday and Thursday at 15:00 UTC, and stay with the show on GreenFeed, YouTube, TikTok, Mosh Pit and Gypsy Traders.';
export const sitePages:SitePage[]=[
  {path:'/',name:'CR2 homepage',summary:'The show, latest broadcasts, every episode with its X replay, hosts and guest booking.',title:homeTitle,description:SITE_DESCRIPTION,markdown:'/index.md',lastmod:latest(pageDates.home,episodes[0].dateTime),text:homeMarkdown},
  {path:'/community/',name:'CR2 community',summary:'How to join: the weekly schedule, GreenFeed, YouTube, TikTok, Mosh Pit, Gypsy Traders, the guest wall and how to be a guest or partner.',title:communityTitle,description:communityDescription,markdown:'/community/index.md',lastmod:pageDates.community,text:communityMarkdown},
  {path:'/partners/',name:'Partner with CR2',summary:'Partnerships: audience, reach, formats, guests and measurement notes.',title:partnersTitle,description:partnersDescription,markdown:'/partners/index.md',lastmod:pageDates.partners,text:partnersMarkdown}
];
// Episode pages (one per synced src/content/episodes/ep-XX.json), newest first.
sitePages.push(...episodePages.map(p=>({path:p.path,name:`Episode ${p.number}: ${p.episode.title}`,summary:p.description,title:p.title,description:p.description,markdown:p.path+'index.md',lastmod:p.episode.dateTime,text:()=>episodeMarkdown(p)})));
export const pageByPath=(path:string)=>sitePages.find(p=>p.path===path)!;

// Every static .astro route in src/pages, excluding the 404 page and dynamic routes.
// /about/ and /sponsors/ are noindex redirects to /partners/, so they are excluded too.
const routeFiles=Object.keys(import.meta.glob('../pages/**/*.astro'));
export function discoveredRoutes(){
  return routeFiles.filter(f=>!/\/404\.astro$|\/(about|sponsors)\/index\.astro$|\[/.test(f)).map(f=>{
    const route=f.replace(/^\.\.\/pages/,'').replace(/\.astro$/,'').replace(/\/index$/,'');
    return route===''?'/':route+'/';
  });
}
export function indexablePages(){
  const extra=discoveredRoutes().filter(r=>!sitePages.some(p=>p.path===r));
  return [...sitePages.map(p=>({path:p.path,lastmod:p.lastmod as string|undefined})),...extra.map(path=>({path,lastmod:undefined}))];
}
export const pageUrl=(path:string)=>new URL(path,SITE_URL).href;
