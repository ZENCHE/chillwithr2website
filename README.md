# CR2

Single-page media company website. Astro + TypeScript, static hosting, local content, no database.

## Run and publish

Run npm ci, then npm run dev. Use npm run check and npm run build before publication. Static output is in dist/. The existing Sites project is recorded in .openai/hosting.json; preserve its ID and private audience.

## Update episodes

Edit src/data.ts, newest first. The first episode fills the feature automatically; the rest appear in the archive. Supply the real title, guest handles, display date, ISO date, and canonical X replay URL. The page contains each episode once.

The schedule, partner, and short company introduction are in src/pages/index.astro. Styles are in src/styles/global.css. The optional eight-second intro is controlled by src/scripts/site.ts; it stops when the tab is hidden and resets after playback.

## Copy standard

Keep the page focused on what CR2 covers, what to watch, when it airs, and who hosts it. Name the subject directly. Use episode titles and guest names instead of generic summaries.

Avoid repeated introductions, mission sections, decorative labels, invented host biographies, unsupported rankings, and slogans about “signals,” “the next era,” or “shaping the future.” Add a section only when there is distinct, useful content for it.

The current page has three sections: introduction with latest replay, earlier episodes, and hosts. No contact destination is published, per the owner's request.

## Sources and assets

The logo variants, colors, brick reference, and audio bumper were supplied in C:\Users\Ethan\Downloads\r2-export. Fonts are bundled locally.

Show schedule, host handles, Mosh credit, and episodes come from [@chillwithr2](https://x.com/chillwithr2). Replays: [09](https://x.com/i/broadcasts/2gqvWQyvOWanQy), [08](https://x.com/i/broadcasts/2onABPznmqOgpZ), [06](https://x.com/i/broadcasts/1DxleVAXgpdKL).

Use the full Robinhood Chain name and consult the [official brand guidelines](https://docs.robinhood.com/chain/brand-guidelines/) for future changes. CR2 is independent; no Robinhood logo or unverified “#1” claim is used.

