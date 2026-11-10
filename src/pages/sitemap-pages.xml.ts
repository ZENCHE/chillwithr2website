import { SITE_URL, pageDates } from '../site-config';
import { xmlResponse } from '../lib/discovery';
export function GET(){return xmlResponse(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}/</loc><lastmod>${pageDates.home}</lastmod></url>
  <url><loc>${SITE_URL}/about/</loc><lastmod>${pageDates.about}</lastmod></url>
</urlset>`);}
