import { SITE_URL } from '../site-config';
import { xmlResponse } from '../lib/discovery';
export function GET(){return xmlResponse(`<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${SITE_URL}/sitemap-pages.xml</loc></sitemap>
  <sitemap><loc>${SITE_URL}/sitemap-images.xml</loc></sitemap>
</sitemapindex>`);}
