import { sponsorsMarkdown, textResponse } from '../../lib/discovery';
export function GET(){return textResponse(sponsorsMarkdown(),'text/markdown');}
