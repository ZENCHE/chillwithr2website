export interface Episode {
  number: string;
  title: string;
  guests: string;
  date: string;
  dateTime: string;
  url: string;
  accent: 'violet' | 'green' | 'pink';
}

// Editorial data is intentionally local: update this file when a broadcast ships.
// Each entry is grounded in an announcement or replay on @chillwithr2.
export const episodes: Episode[] = [
  {
    number: '12',
    title: 'Breaking point?',
    guests: '@honey8bb · @horkays · @Elizacreatez · @marcellovtv · @that1618guy',
    date: '17 NOV 2026',
    dateTime: '2026-11-17',
    url: 'https://x.com/i/broadcasts/2LPYYObyqVOdkp',
    accent: 'green'
  },
  {
    number: '11',
    title: 'Who’s protecting the trenches?',
    guests: '@Deebs_DeFi · @justinbebis',
    date: '12 NOV 2026',
    dateTime: '2026-11-12',
    url: 'https://x.com/i/broadcasts/2EmPzpMqNOdLgN',
    accent: 'violet'
  },
  {
    number: '10',
    title: 'Is onchain dead?',
    guests: '@phtevenstrong · @that1618guy',
    date: '10 NOV 2026',
    dateTime: '2026-11-10',
    url: 'https://x.com/i/broadcasts/2mdrpdpAborrYP',
    accent: 'pink'
  },
  {
    number: '09',
    title: "What’s on Robinhood Chain?",
    guests: '@mil_itia · @nftboi_ · @justinbebis',
    date: '05 NOV 2026',
    dateTime: '2026-11-05',
    url: 'https://x.com/i/broadcasts/2gqvWQyvOWanQy',
    accent: 'green'
  },
  {
    number: '08',
    title: 'What even is alpha anymore?',
    guests: '@CrypSaf · @AvgJoesCrypto',
    date: '03 NOV 2026',
    dateTime: '2026-11-03',
    url: 'https://x.com/i/broadcasts/2onABPznmqOgpZ',
    accent: 'violet'
  },
  {
    number: '07',
    title: 'You just don’t see growth like this',
    guests: '@AndrewAsksHow · @justinbebis',
    date: '29 OCT 2026',
    dateTime: '2026-10-29',
    url: 'https://x.com/i/broadcasts/1lJQRWOgaqzxE',
    accent: 'pink'
  },
  {
    number: '06',
    title: 'Follow the money',
    guests: '@tomwanhh · @zjbrenner',
    date: '27 OCT 2026',
    dateTime: '2026-10-27',
    url: 'https://x.com/i/broadcasts/1DxleVAXgpdKL',
    accent: 'green'
  },
  {
    number: '05',
    title: 'State of the Hood',
    guests: '@berdyn · @banditxbt · @justinbebis',
    date: '22 OCT 2026',
    dateTime: '2026-10-22',
    url: 'https://x.com/i/broadcasts/1rGmqpMeeQkGy',
    accent: 'violet'
  },
  {
    number: '04',
    title: 'Onchain Experiments Building the Next Financial Rails',
    guests: '@OxSimpleFarmer · @DataLust_xyz',
    date: '20 OCT 2026',
    dateTime: '2026-10-20',
    url: 'https://x.com/i/broadcasts/1lJQRWDMBoDxE',
    accent: 'pink'
  },
  {
    number: '03',
    title: '100 days of Robinhood',
    guests: '@that1618guy',
    date: '15 OCT 2026',
    dateTime: '2026-10-15',
    url: 'https://x.com/i/broadcasts/1mGPaZkPoqyJN',
    accent: 'green'
  },
  {
    number: '02',
    title: 'Dialing in from Token 2049',
    guests: '@Elizacreatez · @BigNillCollect · @srinigoes',
    date: '08 OCT 2026',
    dateTime: '2026-10-08',
    url: 'https://x.com/i/broadcasts/1AxRnZrakzDxl',
    accent: 'violet'
  },
  {
    number: '01',
    title: 'Robinhood: Where We Are',
    guests: 'Hosts only · @ripchillpill · @R2D2zen',
    date: '06 OCT 2026',
    dateTime: '2026-10-06',
    url: 'https://x.com/i/broadcasts/1nxeLMQwBVbJX',
    accent: 'pink'
  }
];

export const hosts = [
  { name: 'Chill Pill', handle: '@ripchillpill', url: 'https://x.com/ripchillpill', avatar: '/assets/chill-pill-avatar.png', avatarAlt: 'Chill Pill’s avatar: a purple-hooded character with glowing cyan eyes', bio: 'Crypto veteran and a degen at heart.' },
  { name: 'R2D2', handle: '@R2D2zen', url: 'https://x.com/R2D2zen', avatar: '/assets/r2d2-avatar.png', avatarAlt: 'R2D2’s avatar: a geometric green character on a mint background', bio: '10y TradFi, now a crypto bag holder.' }
];

export const guests = [
  { name: 'Justin Bebis', handle: 'justinbebis', role: 'Co-founder, Mosh · CEO, UV' },
  { name: 'Tom Wan', handle: 'tomwanhh', role: 'Head of Data, Entropy Advisors · ex-21Shares' },
  { name: 'Zack Brenner', handle: 'zjbrenner', role: 'Product Marketing, OpenSea · ex-Rally' },
  { name: 'SimpleFarmer', handle: 'OxSimpleFarmer', role: 'Founder, Clutch Markets · StonkBrokers' },
  { name: 'DataLust', handle: 'DataLust_xyz', role: 'Builds Zona · Open House buildathon winner¹' },
  { name: 'that1618guy', handle: 'that1618guy', role: 'Founder, Stateofblocks · ex-Delphi Digital' },
  { name: 'banditxbt', handle: 'banditxbt', role: 'VP, PonderCorp · Robinhood Chain data' },
  { name: 'Berdyn', handle: 'berdyn', role: 'Founder, PonderCorp · daily Robinhood Spaces' },
  { name: 'Nill', handle: 'BigNillCollect', role: 'Blockworks · ex-Polygon & Magic Eden' },
  { name: 'Eliza', handle: 'Elizacreatez', role: 'Video creatoor · Crypto x AI 👽' },
  { name: 'Srini', handle: 'srinigoes', role: 'Crypto & NFT investor' },
  { name: 'Average Joes Crypto', handle: 'AvgJoesCrypto', role: 'Top FOMO trader / EX Blockworks Research' },
  { name: 'Andrew Forte', handle: 'AndrewAsksHow', role: 'Business & Growth, Claynosaurz & Heeboo · podcast host' },
  { name: 'SafZ', handle: 'CrypSaf', role: 'Founder, AlphaGEMs · AI startup co-founder' },
  { name: 'Drew', handle: 'mil_itia', role: 'CEO, SlopCash · Co-founder, Toon Protocol' },
  { name: 'NFTboi', handle: 'nftboi_', role: 'Launching liquid ventures at Umia Finance' },
  { name: 'Stephen', handle: 'phtevenstrong', role: 'Co-founder, Mezzanine · Founder, DeFi Dojo' },
  { name: 'Deebs', handle: 'Deebs_DeFi', role: 'Lead Detective, Bubblemaps · onchain investigations' },
  { name: 'Honey8', handle: 'honey8bb', role: 'Crypto content & marketing, Ajla Capital · CS engineer' },
  { name: 'OKES', handle: 'horkays', role: 'Video & AI content creator · AI × Web3' },
  { name: 'Marcello', handle: 'marcellovtv', role: 'Co-founder, Nova Gaming Guild · Host, M3LEE Live' }
];
export const communities = [
  { name: 'Mosh Pit', count: '5,000+', label: 'members' },
  { name: 'GreenFeed', count: '800+', label: 'subscribers' },
  { name: 'Gypsy Traders', count: '440+', label: 'subscribers' },
  { name: 'MHH Colony - Private Crypto Network group', count: 'Private', label: 'network' }
];

// Permanent guests: shown on the homepage under the hosts, in the markdown/llms copies
// and as Person entities in JSON-LD. Portraits come from src/assets/guests/<handle>.jpg.
// that1618guy appears by X handle only.
const guestRole = (handle: string) => guests.find(g => g.handle === handle)!.role;
export const permanentGuests = [
  { name: 'that1618guy', handle: 'that1618guy', role: guestRole('that1618guy'), slot: 'Every Tuesday · 16:15 UTC', topics: 'Macro, Crypto Markets, Charts and Robinhood Coverage' },
  { name: 'Justin', handle: 'justinbebis', role: guestRole('justinbebis'), slot: 'Every Thursday · 16:00 UTC', topics: 'Agentic AI, Markets and Robinhood Chain Coverage' }
];
export const regulars = permanentGuests.map(g => g.handle);

// Show facts used by the About page, metadata and structured data.
export const show = {
  name: 'Chill with R2',
  firstEpisode: '2026-10-06',
  schedule: 'Tuesday and Thursday, 15:00 UTC, live on X',
  length: 'about 90 minutes',
  segments: ['The Golden Ratio', 'In the Hood'],
  topics: ['Robinhood Chain', 'tokenized stocks', 'onchain finance', 'macro', 'TradFi to crypto']
};
