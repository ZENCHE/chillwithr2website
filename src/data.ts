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
  }
];

export const hosts = [
  { name: 'Chill Pill', handle: '@ripchillpill', url: 'https://x.com/ripchillpill', avatar: '/assets/chill-pill-avatar.png', avatarAlt: 'Chill Pill’s avatar: a purple-hooded character with glowing cyan eyes' },
  { name: 'R2D2', handle: '@R2D2zen', url: 'https://x.com/R2D2zen', avatar: '/assets/r2d2-avatar.png', avatarAlt: 'R2D2’s avatar: a geometric green character on a mint background' }
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
  { name: 'Eliza', handle: 'Elizacreatez', role: '88.5k X followers²' },
  { name: 'Srini', handle: 'srinigoes', role: 'Token2049 special · live from Singapore' },
  { name: 'Average Joes Crypto', handle: 'AvgJoesCrypto', role: '33k X followers²' }
];
export const communities = [
  { name: 'Mosh Pit', count: '5,000+', label: 'members' },
  { name: 'GreenFeed', count: '800+', label: 'subscribers' },
  { name: 'Gypsy Traders', count: '440+', label: 'subscribers' },
  { name: 'MHH Colony', count: 'Private', label: 'investor group' }
];
