import { guestPortraits } from '../lib/guest-portraits';
import { hosts } from '../data';
import { absolute } from '../lib/seo';
import { xml, xmlResponse } from '../lib/discovery';
export async function GET(){
  const portraits=await guestPortraits();
  const images=(paths:string[])=>paths.map(path=>`<image:image><image:loc>${xml(absolute(path))}</image:loc></image:image>`).join('\n');
  return xmlResponse(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url><loc>${absolute('/')}</loc>${images(['/assets/studio-sign.svg',...hosts.map(h=>h.avatar),...portraits.map(g=>g.portrait.src)])}</url>
  <url><loc>${absolute('/partners/')}</loc>${images(['/assets/streamyard-nov-2026.webp',...portraits.map(g=>g.portrait.src)])}</url>
</urlset>`);
}
