import { xml, xmlResponse } from '../lib/discovery';
import { episodePages, youtubeEmbed, youtubeThumb, durationSeconds } from '../lib/episode-pages';
import { pageUrl } from '../lib/pages';
// Google video sitemap: one URL per episode that has a public YouTube ID.
// publication_date is the original show date at 15:00 UTC, same as the RSS pubDate.
const videos=episodePages.filter(p=>p.youtubeId);
export function GET(){
  return xmlResponse(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${videos.map(p=>{
    const id=p.youtubeId!;
    const secs=p.durationIso?durationSeconds(p.durationIso):undefined;
    const duration=Number.isFinite(secs)&&secs!>0?`      <video:duration>${secs}</video:duration>\n`:'';
    return `  <url>
    <loc>${xml(pageUrl(p.path))}</loc>
    <video:video>
      <video:thumbnail_loc>${xml(youtubeThumb(id))}</video:thumbnail_loc>
      <video:title>${xml(`Episode ${p.number}: ${p.episode.title}`)}</video:title>
      <video:description>${xml(p.description)}</video:description>
      <video:player_loc>${xml(youtubeEmbed(id))}</video:player_loc>
${duration}      <video:publication_date>${p.episode.dateTime}T15:00:00+00:00</video:publication_date>
    </video:video>
  </url>`;
  }).join('\n')}
</urlset>`);
}
