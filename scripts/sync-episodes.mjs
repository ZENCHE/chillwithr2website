#!/usr/bin/env node
// Copy episode page drafts into the repo: node scripts/sync-episodes.mjs [srcDir]
// Defaults: drafts from /workspace/cr2/episodes/pages (or $EPISODES_SRC), redactions from
// /workspace/cr2/episodes/redactions.json (or $EPISODES_REDACTIONS), kept outside this public repo.
// The redaction file is a JSON array of {"find": "word", "replace": "text"}, matched as whole words.
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname, isAbsolute, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const src=process.argv[2]??process.env.EPISODES_SRC??'/workspace/cr2/episodes/pages';
const redactPath=process.env.EPISODES_REDACTIONS??'/workspace/cr2/episodes/redactions.json';
const out=join(root,'src/content/episodes'); const outT=join(out,'transcripts'); mkdirSync(outT,{recursive:true});
const rules=existsSync(redactPath)?JSON.parse(readFileSync(redactPath,'utf8')):(console.warn(`! no redaction file at ${redactPath}; the build guard will still block known names`),[]);
const esc=x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const edge=(c,b)=>/\w/.test(c)?b:'';
// Whole-word match when the phrase starts or ends with a word character; longer phrases first.
const redact=s=>[...rules].sort((a,b)=>b.find.length-a.find.length).reduce((t,r)=>t.replace(new RegExp(`${edge(r.find[0],'\\b')}${esc(r.find)}${edge(r.find.at(-1),'\\b')}`,'gi'),r.replace),s);
const deep=v=>typeof v==='string'?redact(v):Array.isArray(v)?v.map(deep):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).map(([k,x])=>[k,deep(x)])):v;
// Only page fields are copied; editorial notes such as needs_check stay out of this public repo.
const KEEP=['episode','slug','seo_title','meta_description','summary','takeaways','chapters','guests','topics','community_line','transcript_path','youtube_id'];
const pick=o=>Object.fromEntries(KEEP.filter(k=>k in o).map(k=>[k,o[k]]));
const files=existsSync(src)?readdirSync(src).filter(f=>/^ep-\d{2}\.json$/.test(f)).sort():[];
if(!files.length){console.log(`No ep-XX.json files in ${src}. Nothing synced.`);process.exit(0);}
for(const f of files){
  const data=JSON.parse(readFileSync(join(src,f),'utf8'));
  const num=f.slice(3,5); const tp=data.transcript_path;
  if(!tp) throw new Error(`${f}: missing transcript_path`);
  const cands=[isAbsolute(tp)?tp:join(src,tp),join(src,'..','transcripts',basename(tp)),`/workspace/cr2/episodes/transcripts/ep-${num}.txt`];
  const tFile=cands.find(existsSync); if(!tFile) throw new Error(`${f}: transcript not found (${tp})`);
  writeFileSync(join(outT,`ep-${num}.txt`),redact(readFileSync(tFile,'utf8')));
  writeFileSync(join(out,f),JSON.stringify({...deep(pick(data)),transcript_path:`transcripts/ep-${num}.txt`},null,2)+'\n');
  console.log(`synced ${f} + transcripts/ep-${num}.txt (from ${tFile})`);
}
