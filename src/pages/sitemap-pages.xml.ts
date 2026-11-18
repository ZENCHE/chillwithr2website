import { xml, xmlResponse } from '../lib/discovery';
import { indexablePages, pageUrl } from '../lib/pages';
export function GET(){return xmlResponse(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexablePages().map(p=>`  <url><loc>${xml(pageUrl(p.path))}</loc>${p.lastmod?`<lastmod>${p.lastmod}</lastmod>`:''}</url>`).join('\n')}
</urlset>`);}
