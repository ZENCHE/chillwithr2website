import { SITE_URL } from '../site-config';
import { textResponse } from '../lib/discovery';
export function GET(){return textResponse(`# CR2 welcomes search engines and AI crawlers on its public pages.
User-agent: *
Allow: /

User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: GPTBot
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: ClaudeBot
User-agent: PerplexityBot
User-agent: Google-Extended
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`);}
