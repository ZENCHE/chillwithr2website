import { episodePages } from '../../../lib/episode-pages';
import { episodeMarkdown, textResponse } from '../../../lib/discovery';
export function getStaticPaths(){return episodePages.map(page=>({params:{slug:page.path.split('/')[2]},props:{page}}));}
export function GET({props}:{props:{page:(typeof episodePages)[number]}}){return textResponse(episodeMarkdown(props.page,true),'text/markdown');}
