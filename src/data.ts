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
    number: '06',
    title: 'Follow the money',
    guests: '@tomwanhh · @zjbrenner',
    date: '27 OCT 2026',
    dateTime: '2026-10-27',
    url: 'https://x.com/i/broadcasts/1DxleVAXgpdKL',
    accent: 'pink'
  }
];

export const hosts = [
  { name: 'Chill Pill', handle: '@ripchillpill', url: 'https://x.com/ripchillpill', initials: 'CP' },
  { name: 'R2D2', handle: '@R2D2zen', url: 'https://x.com/R2D2zen', initials: 'R2' }
];
