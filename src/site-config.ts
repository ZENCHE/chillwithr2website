export const SITE_URL = 'https://chill-with-r2.daring-pine-5405.chatgpt.site';
export const SITE_DESCRIPTION = 'Independent media on crypto, finance and tech. Home of Chill with R2, a live podcast covering Robinhood Chain.';
export const SOCIAL_IMAGE = `${SITE_URL}/assets/cr2-studio-social.png`;
export const SOCIAL_IMAGE_ALT = 'Chill with R2 neon sign glowing violet, green and pink against a brick wall.';

// Set the receiving inbox, complete FormSubmit's email activation, then set activated.
// Do not enable a form with an unverified or placeholder destination.
export const guestBooking = { recipient: '', activated: false };
export const bookingEndpoint = guestBooking.activated && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestBooking.recipient)
  ? `https://formsubmit.co/ajax/${encodeURIComponent(guestBooking.recipient)}` : '';

// Change only when the corresponding page's content materially changes.
export const pageDates = { home: '2026-11-10', about: '2026-11-10' };
