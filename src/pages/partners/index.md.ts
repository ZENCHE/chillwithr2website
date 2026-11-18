import { partnersMarkdown, textResponse } from '../../lib/discovery';
export function GET(){return textResponse(partnersMarkdown(),'text/markdown');}
