import { episodes, hosts, guests, permanentGuests, show } from '../data';
import { SITE_URL, ORG_DESCRIPTION, SOCIAL_IMAGE } from '../site-config';

// All structured data is generated from src/data.ts, so a new episode, host or
// regular appears in JSON-LD on the next build without touching this file.
export const absolute=(path:string)=>new URL(path,SITE_URL).href;
const xUrl=(handle:string)=>`https://x.com/${handle.replace(/^@/,'')}`;
const slug=(handle:string)=>handle.replace(/^@/,'').toLowerCase();
export const personId=(handle:string)=>absolute(`/#person-${slug(handle)}`);
export const episodeId=(number:string)=>absolute(`/#episode-${number}`);
const ORG_ID=absolute('/#organization');
const WEBSITE_ID=absolute('/#website');
const SERIES_ID=absolute('/#show');

const organization={'@type':'Organization','@id':ORG_ID,name:'CR2',alternateName:['Chill with R2','ChillwithR2'],url:absolute('/'),description:ORG_DESCRIPTION,logo:{'@type':'ImageObject',url:absolute('/apple-touch-icon.png'),width:180,height:180},image:SOCIAL_IMAGE,foundingDate:show.firstEpisode,founder:hosts.map(h=>({'@id':personId(h.handle)})),sameAs:['https://x.com/chillwithr2']};
const website={'@type':'WebSite','@id':WEBSITE_ID,url:absolute('/'),name:'CR2',alternateName:'Chill with R2',description:ORG_DESCRIPTION,inLanguage:'en',publisher:{'@id':ORG_ID}};

const hostPeople=hosts.map(h=>({'@type':'Person','@id':personId(h.handle),name:h.name,alternateName:h.handle,url:xUrl(h.handle),sameAs:[xUrl(h.handle)],image:absolute(h.avatar),description:h.bio,jobTitle:'Co-host, Chill with R2',worksFor:{'@id':ORG_ID}}));
const regularPeople=permanentGuests.map(g=>({'@type':'Person','@id':personId(g.handle),name:g.name,alternateName:'@'+g.handle,url:xUrl(g.handle),sameAs:[xUrl(g.handle)],description:`${g.role}. Permanent guest on Chill with R2: ${g.slot}. ${g.topics}.`}));
const knownIds=new Set([...hosts.map(h=>slug(h.handle)),...permanentGuests.map(g=>slug(g.handle))]);

// Guests are parsed from the episode's handle list. Hosts and permanent guests link to
// their Person node; other guests get a light inline Person with their X profile.
const episodeGuests=(list:string)=>(list.match(/@[A-Za-z0-9_]+/g)??[]).filter(h=>!hosts.some(host=>slug(host.handle)===slug(h))).map(h=>{
  if(knownIds.has(slug(h))) return {'@id':personId(h)};
  const g=guests.find(x=>slug(x.handle)===slug(h));
  return {'@type':'Person',name:g?.name??h.slice(1),url:xUrl(h),sameAs:[xUrl(h)]};
});
const episodeNodes=episodes.map(e=>{
  const people=episodeGuests(e.guests);
  return {'@type':'PodcastEpisode','@id':episodeId(e.number),name:`Episode ${e.number}: ${e.title}`,episodeNumber:Number(e.number),datePublished:e.dateTime,url:e.url,inLanguage:'en',description:people.length?`Chill with R2 episode ${e.number}, live on X with ${e.guests.replace(/ · /g,', ')}.`:`Chill with R2 episode ${e.number}, live on X with hosts Chill Pill and R2D2.`,partOfSeries:{'@id':SERIES_ID},publisher:{'@id':ORG_ID},...(people.length?{contributor:people}:{})};
});
const series={'@type':'PodcastSeries','@id':SERIES_ID,name:show.name,alternateName:'CR2',url:absolute('/'),description:`A live crypto show on X, ${show.schedule.replace(', live on X','')}. Robinhood Chain, tokenized stocks, macro and onchain finance from a TradFi to crypto angle.`,inLanguage:'en',image:SOCIAL_IMAGE,startDate:show.firstEpisode,genre:['Crypto','Finance','Technology'],keywords:show.topics.join(', '),publisher:{'@id':ORG_ID},author:hosts.map(h=>({'@id':personId(h.handle)})),sameAs:['https://x.com/chillwithr2'],hasPart:episodeNodes};

type Crumb={name:string;path:string};
const breadcrumb=(path:string,crumbs:Crumb[])=>({'@type':'BreadcrumbList','@id':absolute(path+'#breadcrumbs'),itemListElement:crumbs.map((c,i)=>({'@type':'ListItem',position:i+1,name:c.name,item:absolute(c.path)}))});
const webPage=(type:string,path:string,title:string,description:string,extra:Record<string,unknown>={})=>({'@type':type,'@id':absolute(path+'#webpage'),url:absolute(path),name:title,description,inLanguage:'en',isPartOf:{'@id':WEBSITE_ID},about:{'@id':ORG_ID},primaryImageOfPage:{'@type':'ImageObject',url:SOCIAL_IMAGE},breadcrumb:{'@id':absolute(path+'#breadcrumbs')},...extra});
const graph=(nodes:unknown[])=>({'@context':'https://schema.org','@graph':[organization,website,...hostPeople,...regularPeople,series,...nodes]});

export function homeSchema(title:string,description:string){const crumbs=[{name:'CR2',path:'/'}];return graph([webPage('WebPage','/',title,description,{mainEntity:{'@id':SERIES_ID}}),breadcrumb('/',crumbs)]);}
export function partnersSchema(title:string,description:string,people:Array<{name:string;handle:string;role:string;image:string}>){
  const crumbs=[{name:'CR2',path:'/'},{name:'Partners',path:'/partners/'}];
  const guestNodes=people.filter(g=>!knownIds.has(slug(g.handle))).map(g=>({'@type':'Person','@id':personId(g.handle),name:g.name,url:xUrl(g.handle),sameAs:[xUrl(g.handle)],image:absolute(g.image),description:g.role.replace(/[¹²]/g,'')}));
  return graph([...guestNodes,webPage('WebPage','/partners/',title,description,{mentions:people.map(g=>({'@id':personId(g.handle)}))}),breadcrumb('/partners/',crumbs)]);
}
export function notFoundSchema(){return {'@context':'https://schema.org','@graph':[organization,website]};}
