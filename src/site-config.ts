export const SITE_URL = 'https://chillwithr2.com';
export const SITE_DESCRIPTION = 'Independent media on crypto, finance and tech. Home of Chill with R2, a live podcast covering Robinhood Chain.';
export const SOCIAL_IMAGE = `${SITE_URL}/assets/cr2-studio-social.png`;
export const SOCIAL_IMAGE_ALT = 'Chill with R2 neon sign glowing violet, green and pink against a brick wall.';

// Set the receiving inbox, complete FormSubmit's email activation, then set activated.
// Do not enable a form with an unverified or placeholder destination.
export const guestBooking = { recipient: 'michael@ajlaweb3.com', activated: true };
export const bookingEndpoint = guestBooking.activated && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestBooking.recipient)
  ? `https://formsubmit.co/ajax/${encodeURIComponent(guestBooking.recipient)}` : '';
export const sponsorshipContact = { recipient: '', activated: false };
export const sponsorEndpoint = sponsorshipContact.activated && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sponsorshipContact.recipient)
  ? `https://formsubmit.co/ajax/${encodeURIComponent(sponsorshipContact.recipient)}` : '';

// Change only when the corresponding page's content materially changes.
export const pageDates = { home: '2026-11-17', about: '2026-11-17' };
