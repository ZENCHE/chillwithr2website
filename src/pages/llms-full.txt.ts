import { textResponse } from '../lib/discovery';
import { sitePages } from '../lib/pages';
// Every registered page's plain-text version, in registry order, regenerated on each build.
export function GET(){return textResponse(sitePages.map(p=>p.text()).join('\n---\n\n'));}
