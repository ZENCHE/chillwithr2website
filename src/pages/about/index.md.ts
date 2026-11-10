import { aboutMarkdown, textResponse } from '../../lib/discovery';
export function GET(){return textResponse(aboutMarkdown(),'text/markdown');}
