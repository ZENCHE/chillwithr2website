# Chill with R2

A static, single-page site for the independent Chill with R2 show. Built with Astro and TypeScript. There is no database, CMS, account system, or server process in production.

## Run locally

```sh
npm ci
npm run dev
```

Open `http://localhost:4321/`. Check types with `npm run check` and produce the static site with `npm run build` (`dist/`).

## Update the show

1. Add the broadcast to `src/data.ts`, newest first. Use the canonical X replay URL. Keep the title, date, guests, description, and topic tags grounded in the broadcast announcement or recording.
2. The first array entry is the featured episode. Update the editorial text in the `#latest` section of `src/pages/index.astro` to match it. The feature artwork's edition number is currently written as `009`; change it when the feature changes.
3. If the show schedule or partner changes, update the hero's schedule line and footer partner credit in `src/pages/index.astro`.
4. Run the checks, preview at phone and desktop widths, and publish a new static version.

The three episode categories are `builders`, `markets`, and `culture`. Multiple tags may be used per episode. The filter UI reads those tags from rendered cards.

## Editorial and asset notes

- Show identity, logo variants, brand colors, and the eight-second audio bumper were supplied by the project owner in `C:\Users\Ethan\Downloads\r2-export`.
- The host handles, twice-weekly live format, Mosh credit, and episode announcements are published by [@chillwithr2](https://x.com/chillwithr2).
- Replay destinations used on the site: [episode 09](https://x.com/i/broadcasts/2gqvWQyvOWanQy), [episode 08](https://x.com/i/broadcasts/2onABPznmqOgpZ), [episode 06](https://x.com/i/broadcasts/1DxleVAXgpdKL).
- Robinhood Chain facts and external-facing naming should be checked against the [official documentation](https://docs.robinhood.com/chain/) and [brand guidelines](https://docs.robinhood.com/chain/brand-guidelines/) before future copy changes.
- A literal “#1” claim is deliberately omitted until the team has a documented basis for it. The site presents CR2 as an independent show and does not use Robinhood's logo.
- Contact or guest pitch actions are omitted until the team provides an updated destination.

## Design and performance

The brick is a small repeatable vector pattern; the neon sign uses the supplied SVG. The hero has no video. X replays open directly instead of loading third-party embeds into the page. Motion honors `prefers-reduced-motion`. The studio bumper begins only after an explicit click and pauses when the tab is hidden.
