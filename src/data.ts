export type Channel = 'builders' | 'markets' | 'culture';

export interface Episode {
  number: string;
  title: string;
  guests: string;
  date: string;
  channels: Channel[];
  dek: string;
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
    channels: ['builders', 'markets'],
    dek: 'A tour through the projects, people, and ideas taking shape across the ecosystem.',
    url: 'https://x.com/i/broadcasts/2gqvWQyvOWanQy',
    accent: 'green'
  },
  {
    number: '08',
    title: 'What even is alpha anymore?',
    guests: '@CrypSaf · @AvgJoesCrypto',
    date: '03 NOV 2026',
    channels: ['markets', 'culture'],
    dek: 'Trading instinct, community, and what an edge looks like when everything is visible.',
    url: 'https://x.com/i/broadcasts/2onABPznmqOgpZ',
    accent: 'violet'
  },
  {
    number: '06',
    title: 'Follow the money',
    guests: '@tomwanhh · @zjbrenner',
    date: '27 OCT 2026',
    channels: ['markets', 'builders'],
    dek: 'A closer look at onchain activity, market behavior, and where products go next.',
    url: 'https://x.com/i/broadcasts/1DxleVAXgpdKL',
    accent: 'pink'
  }
];

export const hosts = [
  { name: 'Chill Pill', handle: '@ripchillpill', url: 'https://x.com/ripchillpill', initials: 'CP', description: 'Co-host. The instinct for the story behind the market.' },
  { name: 'R2D2', handle: '@R2D2zen', url: 'https://x.com/R2D2zen', initials: 'R2', description: 'Co-host. A markets lens on what is happening onchain.' }
];
