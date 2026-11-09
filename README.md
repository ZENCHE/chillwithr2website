# CR2

A static, single-page site for CR2, an independent media brand covering crypto, finance, and technology. Chill with R2 is its flagship live show. Built with Astro and TypeScript. There is no database, CMS, account system, or server process in production.

## Run locally

From this directory, run npm ci, then npm run dev. Open http://localhost:4321/. Use npm run check for Astro diagnostics and npm run build to generate the static site in dist/.

## Content architecture

- The dark masthead introduces CR2 and its broader editorial position.
- The lens sets out three areas of coverage. It describes the direction of the brand; it does not imply separate news products or feeds already exist.
- The brick studio gives Chill with R2 its own flagship stage. Its optional neon and eight-second bumper start only after a click.
- The latest replay and episode archive use verified show announcements and direct X replay links.
- The manifesto, hosts, and closing invitation complete the company story. No contact form or guest pitch destination is published.

## Update the show

1. Add the broadcast to src/data.ts, newest first. Use the canonical X replay URL. Keep the title, date, guests, description, and topic tags grounded in the broadcast announcement or recording.
2. The first array entry is the featured episode. Its number, title, date, topic labels, and replay link flow into the feature automatically. Update the editorial summary in the #latest section of src/pages/index.astro to match the new recording.
3. If the show schedule or partner changes, update the #show schedule and partner credit in src/pages/index.astro.
4. Run the checks, preview at phone and desktop widths, and publish a new static version.

The three episode categories are builders, markets, and culture. Multiple tags may be used per episode. The filter UI reads those tags from rendered cards.

## Editorial and asset notes

- Show identity, logo variants, brand colors, and the eight-second audio bumper were supplied by the project owner in C:\Users\Ethan\Downloads\r2-export.
- The host handles, twice-weekly live format, Mosh credit, and episode announcements are published by [@chillwithr2](https://x.com/chillwithr2).
- Replay destinations used on the site: [episode 09](https://x.com/i/broadcasts/2gqvWQyvOWanQy), [episode 08](https://x.com/i/broadcasts/2onABPznmqOgpZ), [episode 06](https://x.com/i/broadcasts/1DxleVAXgpdKL).
- Robinhood Chain facts and external-facing naming should be checked against the [official documentation](https://docs.robinhood.com/chain/) and [brand guidelines](https://docs.robinhood.com/chain/brand-guidelines/) before future copy changes.
- A literal “#1” claim is omitted until the team has a documented basis for it. CR2 is presented as independent media and does not use Robinhood's logo.
- Contact or guest pitch actions are omitted until the team provides an updated destination.

## Design and performance

The brick is a small repeatable vector pattern; the CR2 mark and show sign use supplied SVGs. The site has no background video or third-party X embed. Fredoka and Yellowtail are bundled locally. Motion honors reduced-motion preferences. The studio bumper begins only after an explicit click and pauses when the tab is hidden.
