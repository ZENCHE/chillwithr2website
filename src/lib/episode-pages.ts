import { z } from 'astro/zod';
import { episodes, guests, hosts, type Episode } from '../data';

// Episode pages are generated from src/content/episodes/ep-XX.json (synced by
// scripts/sync-episodes.mjs). Every file is validated here at build time; any bad
// field throws and stops the build with the file name and the failing path.
const raw=import.meta.glob<unknown>('../content/episodes/ep-*.json',{eager:true,import:'default'});
const transcripts=import.meta.glob<string>('../content/episodes/transcripts/*.txt',{eager:true,query:'?raw',import:'default'});

const noEmDash=(s:string)=>!s.includes('—');
const text=(max:number)=>z.string().trim().min(1).max(max).refine(noEmDash,'contains an em-dash');
const handle=z.string().trim().regex(/^@?[A-Za-z0-9_]{1,15}$/,'must be an X handle');
const time=z.union([z.string().trim().regex(/^(\d{1,2}:)?\d{1,2}:\d{2}$/,'must be HH:MM:SS or MM:SS'),z.number().nonnegative()]);
const chapter=z.object({time:time.optional(),start:time.optional(),timestamp:time.optional(),title:text(140)}).refine(c=>c.time??c.start??c.timestamp,'needs time');
const guest=z.union([handle,z.object({handle,name:text(80).optional(),role:text(160).optional()})]);
export const episodePageSchema=z.object({
  slug:z.string().trim().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/,'must be lowercase-kebab-case'),
  seo_title:text(90),
  meta_description:text(320),
  summary:text(600),
  takeaways:z.array(text(400)).length(5,'needs exactly 5 takeaways'),
  chapters:z.array(chapter).min(1),
  guests:z.array(guest),
  topics:z.array(text(60)).min(1),
  community_line:text(400),
  transcript_path:z.string().trim().min(1),
  youtube_id:z.string().regex(/^[A-Za-z0-9_-]{11}$/).nullable().optional(),
  episode:z.union([z.string(),z.number()]).optional(),
  number:z.union([z.string(),z.number()]).optional()
});

// Guard: names that must never appear on the site are checked by hash, so the
// names themselves are not stored in this public repo.
const blocked=new Set(['e05bf0c','b71f3f74','e1dc3f2']);
const fnv=(w:string)=>{let h=0x811c9dc5;for(const c of w){h^=c.charCodeAt(0);h=Math.imul(h,0x01000193)>>>0;}return h.toString(16);};
const blockedWord=(s:string)=>(s.toLowerCase().match(/[a-z]+/g)??[]).find(w=>blocked.has(fnv(w)));

const toSeconds=(t:string|number)=>typeof t==='number'?Math.floor(t):t.split(':').map(Number).reduce((a,n)=>a*60+n,0);
export const clock=(sec:number)=>{const h=Math.floor(sec/3600),m=Math.floor(sec%3600/60),s=sec%60;return (h?`${h}:${String(m).padStart(2,'0')}`:`${m}`)+`:${String(s).padStart(2,'0')}`;};
const bare=(h:string)=>h.replace(/^@/,'');

export interface TranscriptBlock { start:number; text:string; }
function parseTranscript(src:string){
  const blocks:TranscriptBlock[]=[]; let cur:TranscriptBlock|null=null;
  for(const line of src.split('\n')){
    const m=line.match(/^\[(\d{1,2}:\d{2}:\d{2})\]\s*(.*)$/); if(!m) continue;
    const sec=toSeconds(m[1]);
    if(!cur||sec-cur.start>=60){cur={start:sec,text:m[2]};blocks.push(cur);} else cur.text+=' '+m[2];
  }
  return blocks;
}

export interface EpisodePage {
  number:string; episode:Episode; path:string; title:string; description:string; summary:string;
  takeaways:string[]; chapters:{seconds:number;label:string;title:string}[];
  guests:{handle:string;name:string;role?:string;url:string}[]; topics:string[]; communityLine:string;
  transcript:TranscriptBlock[]; youtubeId?:string;
}
function build():EpisodePage[]{
  const pages=Object.entries(raw).map(([file,data])=>{
    const name=file.split('/').pop()!; const number=name.match(/^ep-(\d{2})\.json$/)?.[1];
    const fail=(msg:string)=>{throw new Error(`[episode-pages] ${name}: ${msg}`);};
    if(!number) fail('file name must be ep-XX.json');
    const parsed=episodePageSchema.safeParse(data);
    if(!parsed.success) fail('invalid data\n'+parsed.error.issues.map(i=>`  - ${i.path.join('.')||'(root)'}: ${i.message}`).join('\n'));
    const d=parsed.data!;
    const declared=d.episode??d.number; if(declared!==undefined&&String(declared).padStart(2,'0')!==number) fail(`episode field ${declared} does not match file name`);
    const episode=episodes.find(e=>e.number===number) ?? fail(`episode ${number} is not in src/data.ts`) as never;
    const tKey=`../content/episodes/transcripts/${d.transcript_path.split('/').pop()}`;
    const tSrc=transcripts[tKey] ?? fail(`transcript not found at src/content/episodes/${d.transcript_path} (run npm run sync:episodes)`) as never;
    const transcript=parseTranscript(tSrc); if(!transcript.length) fail('transcript has no [HH:MM:SS] lines');
    const people=d.guests.map(g=>{
      const h=bare(typeof g==='string'?g:g.handle);
      const known=guests.find(x=>x.handle.toLowerCase()===h.toLowerCase()) ?? hosts.find(x=>bare(x.handle).toLowerCase()===h.toLowerCase());
      if(!known) fail(`guest @${h} is not in src/data.ts guests (add them with a photo first)`);
      const k=known as {name:string;handle:string;role?:string;bio?:string};
      return {handle:bare(k.handle),name:k.name,role:k.role?.replace(/[¹²]/g,'')??k.bio,url:`https://x.com/${bare(k.handle)}`};
    });
    const slug=d.slug.startsWith(`ep-${number}-`)?d.slug.slice(6):d.slug;
    const page:EpisodePage={number:number!,episode,path:`/episodes/ep-${number}-${slug}/`,title:d.seo_title,description:d.meta_description,summary:d.summary,takeaways:d.takeaways,
      chapters:d.chapters.map(c=>{const s=toSeconds((c.time??c.start??c.timestamp)!);return {seconds:s,label:clock(s),title:c.title};}).sort((a,b)=>a.seconds-b.seconds),
      guests:people,topics:d.topics,communityLine:d.community_line,transcript,youtubeId:d.youtube_id??undefined};
    const hit=blockedWord(JSON.stringify(d)+' '+tSrc); if(hit!==undefined) fail('contains a name that must not appear on the site (run npm run sync:episodes to apply redactions)');
    return page;
  });
  return pages.sort((a,b)=>Number(b.number)-Number(a.number));
}
export const episodePages=build();
export const episodePage=(number:string)=>episodePages.find(p=>p.number===number);
export const episodeHref=(e:Episode)=>episodePage(e.number)?.path;

// Up to 3 related episodes: shared guests first, then the nearest episodes by number.
export function relatedEpisodes(number:string){
  const self=episodes.find(e=>e.number===number)!;
  const handles=(e:Episode)=>(e.guests.toLowerCase().match(/@[a-z0-9_]+/g)??[]);
  const mine=new Set(handles(self));
  return episodes.filter(e=>e.number!==number).map(e=>({e,shared:handles(e).filter(h=>mine.has(h)).length,dist:Math.abs(Number(e.number)-Number(number))}))
    .sort((a,b)=>b.shared-a.shared||a.dist-b.dist).slice(0,3).map(x=>x.e);
}
