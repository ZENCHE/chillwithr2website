import { homeMarkdown, textResponse } from '../lib/discovery';
export function GET(){return textResponse(homeMarkdown(),'text/markdown');}
