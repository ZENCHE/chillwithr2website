import { homeMarkdown, sponsorsMarkdown, textResponse } from '../lib/discovery';
export function GET(){return textResponse(homeMarkdown()+'\n---\n\n'+sponsorsMarkdown());}
