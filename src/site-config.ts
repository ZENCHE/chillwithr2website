export const SITE_URL = 'https://chillwithr2.com';
export const SITE_DESCRIPTION = 'Chill with R2 is a live crypto show on X every Tuesday and Thursday at 15:00 UTC. A TradFi to crypto take on Robinhood Chain, Agentic AI, tokenized stocks and macro, with the founders and builders behind them.';
export const ORG_DESCRIPTION = 'CR2 is independent media for crypto, finance and tech, and the home of Chill with R2, a live crypto show on X.';
export const SOCIAL_IMAGE = `${SITE_URL}/assets/cr2-studio-social.png`;
// YouTube channel for Organization sameAs. One-line switch: set YOUTUBE_LIVE to true once the channel is live.
export const YOUTUBE_URL = 'https://www.youtube.com/@chillwithr2official';
export const YOUTUBE_SUBSCRIBE = `${YOUTUBE_URL}?sub_confirmation=1`;
export const YOUTUBE_LIVE = true;
export const SOCIAL_IMAGE_ALT = 'Chill with R2 neon sign glowing violet, green and pink against a brick wall.';

// Set the receiving inbox, complete FormSubmit's email activation, then set activated.
// Do not enable a form with an unverified or placeholder destination.
export const guestBooking = { recipient: 'michael@ajlaweb3.com', activated: true };
export const bookingEndpoint = guestBooking.activated && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestBooking.recipient)
  ? `https://formsubmit.co/ajax/${encodeURIComponent(guestBooking.recipient)}` : '';
export const sponsorshipContact = { recipient: 'michael@ajlaweb3.com', activated: true };
export const sponsorEndpoint = sponsorshipContact.activated && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sponsorshipContact.recipient)
  ? `https://formsubmit.co/ajax/${encodeURIComponent(sponsorshipContact.recipient)}` : '';

// Change only when the corresponding page's content materially changes.
export const pageDates = { home: '2026-11-19', partners: '2026-11-18', community: '2026-11-18', episodes: '2026-11-19' };
