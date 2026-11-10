import { homeMarkdown, aboutMarkdown, textResponse } from '../lib/discovery';
export function GET(){return textResponse(homeMarkdown()+'\n---\n\n'+aboutMarkdown());}
