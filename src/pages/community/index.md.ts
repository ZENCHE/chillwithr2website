import { communityMarkdown, textResponse } from '../../lib/discovery';
export function GET(){return textResponse(communityMarkdown(),'text/markdown');}
