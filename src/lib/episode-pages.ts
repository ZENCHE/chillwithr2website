import { z } from 'astro/zod';
import { episodes, guests, hosts, type Episode } from '../data';
// ISO 8601 runtimes from the trimmed YouTube files, copied here so the GitHub Pages build can read them.
import durations from './youtube-durations.json';

// Episode pages are generated from src/content/episodes/ep-XX.json (synced by
// scripts/sync-episodes.mjs). No transcripts are published. Every file is validated here at build time; any bad
// field throws and stops the build with the file name and the failing path.
const raw=import.meta.glob<unknown>('../content/episodes/ep-*.json',{eager:true,import:'default'});

const noEmDash=(s:string)=>!/[—–]/.test(s);
const text=(max:number)=>z.string().trim().min(1).max(max).refine(noEmDash,'contains an em-dash or en-dash');
const handle=z.string().trim().regex(/^@?[A-Za-z0-9_]{1,15}$/,'must be an X handle');
const time=z.union([z.string().trim().regex(/^(\d{1,2}:)?\d{1,2}:\d{2}$/,'must be HH:MM:SS or MM:SS'),z.number().nonnegative()]);
const chapter=z.object({time:time.optional(),start:time.optional(),timestamp:time.optional(),title:text(140)}).refine(c=>c.time??c.start??c.timestamp,'needs time');
// A YouTube video ID is exactly 11 characters from A-Z, a-z, 0-9, '_' and '-' (not a URL).
const youtubeIdField=z.string().trim().regex(/^[A-Za-z0-9_-]{11}$/,'must be an 11-character YouTube video ID (the part after watch?v=), not a URL');
const guest=z.union([handle,z.object({handle,name:text(80).optional(),role:text(160).optional()})]);
export const episodePageSchema=z.object({
  slug:z.string().trim().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/,'must be lowercase-kebab-case'),
  seo_title:text(90),
  meta_description:text(320),
  summary:text(600),
  takeaways:z.array(text(400)).min(4,'needs 4 or 5 takeaways').max(5,'needs 4 or 5 takeaways'),
  chapters:z.array(chapter).min(1),
  guests:z.array(guest).optional(),
  topics:z.array(text(60)).min(1),
  community_line:text(400),
  community_url:z.string().regex(/^https:\/\/\S+$/,'must be an https URL').optional(),
  community_cta:text(60).optional(),
  youtube_id:youtubeIdField.nullable().optional(),
  youtubeId:youtubeIdField.nullable().optional(),
  episode:z.union([z.string(),z.number()]).optional(),
  number:z.union([z.string(),z.number()]).optional()
}).refine(d=>!(d.youtube_id&&d.youtubeId&&d.youtube_id!==d.youtubeId),{message:'youtube_id and youtubeId disagree; keep one',path:['youtubeId']});

// Guard: names that must never appear on the site are checked by hash, so the
// names themselves are not stored in this public repo.
const blocked=new Set(['e05bf0c','b71f3f74','e1dc3f2']);
const fnv=(w:string)=>{let h=0x811c9dc5;for(const c of w){h^=c.charCodeAt(0);h=Math.imul(h,0x01000193)>>>0;}return h.toString(16);};
const blockedWord=(s:string)=>(s.toLowerCase().match(/[a-z]+/g)??[]).find(w=>blocked.has(fnv(w)));

const toSeconds=(t:string|number)=>typeof t==='number'?Math.floor(t):t.split(':').map(Number).reduce((a,n)=>a*60+n,0);
export const clock=(sec:number)=>{const h=Math.floor(sec/3600),m=Math.floor(sec%3600/60),s=sec%60;return (h?`${h}:${String(m).padStart(2,'0')}`:`${m}`)+`:${String(s).padStart(2,'0')}`;};

export const youtubeWatch=(id:string)=>`https://www.youtube.com/watch?v=${id}`;
export const youtubeEmbed=(id:string)=>`https://www.youtube-nocookie.com/embed/${id}`;
export const youtubeThumb=(id:string)=>`https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const durationIso=(number:string)=>{const iso=(durations as Record<string,string>)[number];return typeof iso==='string'&&/^PT(?:\d+H)?(?:\d+M)?(?:\d+S)?$/.test(iso)?iso:undefined;};
export const durationSeconds=(iso:string)=>{const m=iso.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);return m?(Number(m[1]||0)*3600+Number(m[2]||0)*60+Number(m[3]||0)):undefined;};
export function replayLink(e:Episode){const id=episodePage(e.number)?.youtubeId;return id?{url:youtubeWatch(id),label:'Watch on YouTube',youtube:true as const}:{url:e.url,label:'Watch the replay on X',youtube:false as const};}

const bare=(h:string)=>h.replace(/^@/,'');

export interface EpisodePage {
  number:string; episode:Episode; path:string; title:string; description:string; summary:string;
  takeaways:string[]; chapters:{seconds:number;label:string;title:string}[];
  guests:{handle:string;name:string;role?:string;url:string}[]; topics:string[]; communityLine:string; communityUrl?:string; communityCta?:string;
  youtubeId?:string; durationIso?:string;
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
    const episode=episodes.find(e=>e.number===number) ?? fail(`Episode ${number} is not in src/data.ts yet. Add it to the episodes list there (number, title, guests, date, dateTime, url, accent) first; the date, replay URL and guests come from there.`) as never;
    // Guests come from src/data.ts (the episode's handle list). If the JSON lists guests too, they must match.
    const fromData=(episode.guests.match(/@[A-Za-z0-9_]+/g)??[]).map(bare).filter(h=>!hosts.some(x=>bare(x.handle).toLowerCase()===h.toLowerCase()));
    if(d.guests){
      const listed=d.guests.map(g=>bare(typeof g==='string'?g:g.handle).toLowerCase()); const want=fromData.map(h=>h.toLowerCase());
      const extra=listed.filter(h=>!want.includes(h)), missing=want.filter(h=>!listed.includes(h));
      if(extra.length||missing.length) fail(`guests do not match episode ${number} in src/data.ts`+(extra.length?`; not in data.ts: @${extra.join(', @')}`:'')+(missing.length?`; missing from JSON: @${missing.join(', @')}`:''));
    }
    const people=fromData.map(h=>{
      const known=guests.find(x=>x.handle.toLowerCase()===h.toLowerCase());
      if(!known) fail(`guest @${h} (episode ${number} in src/data.ts) has no entry in the guests list there; add name, role and a photo in src/assets/guests first`);
      const k=known!;
      return {handle:k.handle,name:k.name,role:k.role.replace(/[¹²]/g,''),url:`https://x.com/${k.handle}`};
    });
    const slug=d.slug.startsWith(`ep-${number}-`)?d.slug.slice(6):d.slug;
    const page:EpisodePage={number:number!,episode,path:`/episodes/ep-${number}-${slug}/`,title:d.seo_title,description:d.meta_description,summary:d.summary,takeaways:d.takeaways,
      chapters:d.chapters.map(c=>{const s=toSeconds((c.time??c.start??c.timestamp)!);return {seconds:s,label:clock(s),title:c.title};}).sort((a,b)=>a.seconds-b.seconds),
      guests:people,topics:d.topics,communityLine:d.community_line,communityUrl:d.community_url,communityCta:d.community_cta,youtubeId:d.youtubeId??d.youtube_id??undefined};
    page.durationIso=page.youtubeId?durationIso(number!):undefined;
    const hit=blockedWord(JSON.stringify(d)); if(hit!==undefined) fail('contains a name that must not appear on the site. Replace it with the X handle (that1618guy) in the draft, or add it to the redaction list, and sync again.');
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
