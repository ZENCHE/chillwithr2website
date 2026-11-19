import { episodesMarkdown, textResponse } from '../../lib/discovery';
export function GET(){return textResponse(episodesMarkdown(),'text/markdown');}
