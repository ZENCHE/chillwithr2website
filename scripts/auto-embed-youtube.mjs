#!/usr/bin/env node
// Hourly (and workflow_dispatch) helper: read the public @chillwithr2official
// feed and fill youtube_id only on episode pages that do not already have one.
//
// Matching is the same as the manual flow: the video title must start with
// "Ep NN:", the ID is stored in scripts/episode-overrides.json, and the same
// ID is written into the already-synced src/content/episodes/ep-NN.json so the
// player can ship. This script does not run sync-episodes.mjs: that command
// needs the local episode drafts and redaction list, which are not in this
// repo, and re-applying overrides on already-synced pages would fail.
//
// Rules: never invent or overwrite an ID. If a number is missing from the
// feed, the title does not match, two videos share a number, an override and
// the page disagree, or the feed disagrees with an ID already on file, skip
// that number. Episode pages are not created here. If nothing changed, exit 0
// without writing files.
import { readFileSync, writeFileSync, existsSync, appendFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const FEED = 'https://www.youtube.com/feeds/videos.xml?channel_id=UC1VT4PB26zdQKBABUG6DdWw';
const HOST = 'https://chillwithr2.com';
const TITLE = /^Ep\s+(\d{1,2}):/;
const YT_ID = /^[A-Za-z0-9_-]{11}$/;
const UA = 'chillwithr2-auto-embed/1.0 (+https://chillwithr2.com)';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const overridesPath = join(root, 'scripts/episode-overrides.json');
const contentDir = join(root, 'src/content/episodes');

const xmlUnescape = (s) => s
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&apos;/g, "'")
  .replace(/&amp;/g, '&');

const pad = (n) => String(n).padStart(2, '0');

const existingId = (obj) => {
  const id = obj?.youtube_id ?? obj?.youtubeId;
  if (id == null || id === '') return undefined;
  return String(id);
};

const episodeUrl = (num, slug) => {
  const rest = slug.startsWith(`ep-${num}-`) ? slug.slice(`ep-${num}-`.length) : slug;
  return `${HOST}/episodes/ep-${num}-${rest}/`;
};

const writeJson = (path, data) => writeFileSync(path, JSON.stringify(data, null, 2) + '\n');

const res = await fetch(FEED, { headers: { 'user-agent': UA, accept: 'application/atom+xml, application/xml, text/xml' } });
if (!res.ok) {
  console.error(`YouTube feed failed: HTTP ${res.status}`);
  process.exit(1);
}
const xml = await res.text();
if (!xml.includes('<entry>')) {
  console.error('YouTube feed did not contain any entries.');
  process.exit(1);
}

const byEpisode = new Map();
for (const match of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
  const entry = match[1];
  const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1]?.trim();
  const rawTitle = entry.match(/<media:title>([^<]*)<\/media:title>/)?.[1]
    ?? entry.match(/<title>([^<]*)<\/title>/)?.[1];
  if (!id || !rawTitle) continue;
  if (!YT_ID.test(id)) {
    console.warn(`! skipped a feed entry whose video id is not 11 characters: ${id}`);
    continue;
  }
  const title = xmlUnescape(rawTitle).trim();
  const numMatch = title.match(TITLE);
  if (!numMatch) continue;
  const num = pad(numMatch[1]);
  const list = byEpisode.get(num) ?? [];
  if (!list.some((v) => v.id === id)) list.push({ id, title });
  byEpisode.set(num, list);
}

const overrides = JSON.parse(readFileSync(overridesPath, 'utf8'));
overrides.episodes ??= {};
const added = [];
const skipped = [];

for (const [num, videos] of [...byEpisode.entries()].sort((a, b) => Number(a[0]) - Number(b[0]))) {
  const contentPath = join(contentDir, `ep-${num}.json`);
  if (!existsSync(contentPath)) {
    skipped.push(`Ep ${num}: no episode page in the repo yet, left the feed ID unused`);
    continue;
  }
  const content = JSON.parse(readFileSync(contentPath, 'utf8'));
  const pageId = existingId(content);
  const overrideId = existingId(overrides.episodes[num]);
  const feedIds = [...new Set(videos.map((v) => v.id))];

  if (feedIds.length > 1) {
    skipped.push(`Ep ${num}: ambiguous feed titles (${feedIds.join(', ')}), did not guess`);
    continue;
  }
  if (pageId && overrideId && pageId !== overrideId) {
    skipped.push(`Ep ${num}: override ${overrideId} and page ${pageId} disagree, left both alone`);
    continue;
  }
  if (pageId) {
    const feedId = feedIds[0];
    if (feedId && feedId !== pageId) {
      skipped.push(`Ep ${num}: page already has ${pageId}, feed has ${feedId}, did not overwrite`);
    }
    continue;
  }

  const feedId = feedIds[0];
  if (overrideId && feedId && overrideId !== feedId) {
    skipped.push(`Ep ${num}: override ${overrideId} and feed ${feedId} disagree, did not guess`);
    continue;
  }
  const id = overrideId ?? feedId;
  if (!id || !YT_ID.test(id)) continue;

  overrides.episodes[num] ??= {};
  overrides.episodes[num].youtube_id = id;
  delete overrides.episodes[num].youtubeId;
  content.youtube_id = id;
  delete content.youtubeId;
  writeJson(contentPath, content);
  if (!content.slug) {
    skipped.push(`Ep ${num}: wrote ${id} but the page has no slug, IndexNow URL omitted`);
  }
  added.push({ num, id, url: content.slug ? episodeUrl(num, content.slug) : undefined });
}

if (added.length) writeJson(overridesPath, overrides);

for (const line of skipped) console.warn(`! ${line}`);
if (!added.length) {
  console.log('No new YouTube IDs. Nothing changed.');
} else {
  for (const a of added) console.log(`Added YouTube player for Ep ${a.num}: ${a.id}${a.url ? ` -> ${a.url}` : ''}`);
}

const changed = added.length > 0;
const message = added.length
  ? `Add YouTube player for ${added.map((a) => `Ep ${a.num}`).join(', ')}`
  : 'No new YouTube IDs';
const urls = added.map((a) => a.url).filter(Boolean);

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `changed=${changed}\n`);
  appendFileSync(process.env.GITHUB_OUTPUT, `message=${message}\n`);
  if (urls.length) {
    appendFileSync(process.env.GITHUB_OUTPUT, `urls<<EOF\n${urls.join('\n')}\nEOF\n`);
  }
}

process.exit(0);
