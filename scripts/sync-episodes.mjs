#!/usr/bin/env node
// Weekly flow: drop ep-XX.json into /workspace/cr2/episodes/pages, then run
//   npm run sync:episodes && npm run build
// Optional: node scripts/sync-episodes.mjs [srcDir], or EPISODES_SRC=/path.
// - Copies only page fields (editorial notes such as needs_check, and transcript_path, are dropped).
// - Applies scripts/episode-overrides.json (spelling fixes, community line rules, per-episode decisions).
// - Applies the private redaction list (EPISODES_REDACTIONS, default /workspace/cr2/episodes/redactions.json).
// - Normalises chapter times to HH:MM:SS and handles to @handle.
// - Fails with a clear message if an episode is not in src/data.ts yet.
// Transcripts are never copied into this repo.
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const src=process.argv[2]??process.env.EPISODES_SRC??'/workspace/cr2/episodes/pages';
const redactPath=process.env.EPISODES_REDACTIONS??'/workspace/cr2/episodes/redactions.json';
const out=join(root,'src/content/episodes'); mkdirSync(out,{recursive:true});
const overrides=JSON.parse(readFileSync(join(root,'scripts/episode-overrides.json'),'utf8'));
const rules=existsSync(redactPath)?JSON.parse(readFileSync(redactPath,'utf8')):(console.warn(`! no redaction file at ${redactPath}; the build guard still blocks known names`),[]);
const esc=x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const edge=(c,b)=>/\w/.test(c)?b:'';
// Whole-word match when the phrase starts or ends with a word character; longer phrases first.
const replacer=(list,flags)=>s=>[...list].sort((a,b)=>b.find.length-a.find.length).reduce((t,r)=>t.replace(new RegExp(`${edge(r.find[0],'\\b')}${esc(r.find)}${edge(r.find.at(-1),'\\b')}`,flags),r.replace),s);
const redact=replacer(rules,'gi'); const spell=replacer(overrides.spelling??[],'g');
const KEEP=['episode','slug','seo_title','meta_description','summary','takeaways','chapters','guests','topics','community_line','community_url','community_cta','youtube_id'];
const pick=o=>Object.fromEntries(KEEP.filter(k=>k in o).map(k=>[k,o[k]]));
const deep=(v,f)=>typeof v==='string'?f(v):Array.isArray(v)?v.map(x=>deep(x,f)):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).map(([k,x])=>[k,deep(x,f)])):v;
const hms=t=>{if(typeof t==='number'){t=Math.floor(t);return [t/3600|0,(t%3600)/60|0,t%60].map(n=>String(n).padStart(2,'0')).join(':');}const p=String(t).trim().split(':').map(Number);while(p.length<3)p.unshift(0);return p.map(n=>String(n).padStart(2,'0')).join(':');};
const known=new Set([...readFileSync(join(root,'src/data.ts'),'utf8').matchAll(/number:\s*'(\d{2})'/g)].map(m=>m[1]));
const files=existsSync(src)?readdirSync(src).filter(f=>/^ep-\d{2}\.json$/.test(f)).sort():[];
if(!files.length){console.log(`No ep-XX.json files in ${src}. Nothing synced.`);process.exit(0);}
const errors=[]; const log=[];
for(const f of files){
  const num=f.slice(3,5);
  if(!known.has(num)){errors.push(`${f}: episode ${num} is not in src/data.ts yet. Add it to the episodes list there (number, title, guests, date, dateTime, url, accent), then run the sync again.`);continue;}
  let d; try{d=JSON.parse(readFileSync(join(src,f),'utf8'));}catch(e){errors.push(`${f}: not valid JSON (${e.message})`);continue;}
  const before=JSON.stringify(pick(d));
  d=deep(deep(pick(d),redact),spell);
  const notes=[];
  if(JSON.stringify(d)!==before) notes.push('text fixes');
  if(Array.isArray(d.chapters)) d.chapters=d.chapters.map(c=>{const t=c.time??c.start??c.timestamp;const n=t===undefined?t:hms(t);if(n!==t)notes.push(`time ${t} -> ${n}`);const {start,timestamp,...rest}=c;return {...rest,time:n};});
  if(Array.isArray(d.guests)) d.guests=d.guests.map(g=>typeof g==='string'?'@'+g.trim().replace(/^@/,''):{...g,handle:'@'+String(g.handle).trim().replace(/^@/,'')});
  for(const rule of overrides.community??[]) if(new RegExp(rule.when,'i').test(d.community_line??'')){Object.assign(d,rule.set);notes.push('community line override');}
  const ep=overrides.episodes?.[num];
  if(ep?.drop_guests&&Array.isArray(d.guests)){const drop=ep.drop_guests.map(h=>h.toLowerCase());const n=d.guests.length;d.guests=d.guests.filter(g=>!drop.includes((typeof g==='string'?g:g.handle).replace(/^@/,'').toLowerCase()));if(d.guests.length!==n)notes.push(`dropped guest ${ep.drop_guests.join(', ')}`);}
  if(ep?.set) Object.assign(d,ep.set);
  writeFileSync(join(out,f),JSON.stringify(d,null,2)+'\n');
  log.push(`synced ${f}${notes.length?` (${[...new Set(notes)].join('; ')})`:''}`);
}
log.forEach(l=>console.log(l));
if(errors.length){console.error('\nSync failed:\n- '+errors.join('\n- '));process.exit(1);}
