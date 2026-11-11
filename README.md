# CR2

Static media-company website built with Astro and TypeScript. No database.

## Run and publish

Run npm ci, npm run dev, npm run check, and npm run build. Production output is dist/. The existing Sites identity is in .openai/hosting.json. Preserve its ID and current audience (public as of November 9, 2026).

## Design and content

The opening scene is a neon broadcast studio built with a photographed brick material, layered SVG sign, colored lighting, and bounded parallax. The landing page contains the studio, broadcasts, hosts, guest booking with a portrait collage, and a compact sponsorship row. All navigation and text are HTML. Effects stop when inactive, offscreen, or hidden. Reduced-motion preferences disable decorative movement. The schedule, intro player, audio analyser and motion-toggle row were removed at the owner’s request.

The CSS/SVG treatment was selected after comparing it with a Three.js normal-mapped wall and selective bloom. It preserves sharper, more saturated logo artwork and avoids the experimental renderer's additional 136 KB gzip JavaScript. The production site has no WebGL dependency, so graphics-context failure cannot hide its content.

Edit src/data.ts to update episodes, newest first. Supply real titles, guest handles, display/ISO dates, and canonical replay URLs. The first entry drives the hero replay action, and Latest broadcasts previews only the first three entries. Company introduction lives in src/pages/index.astro. Styles are in src/styles/global.css; the interaction controller is src/scripts/site.ts. Development builds expose bounded frame statistics in the hero's data-motion-profile attribute; this instrumentation is removed from production.

Keep copy concrete and concise. No repeated mission sections, invented biographies, audience claims, unsupported rankings, or slogans about signals and the next era. Guest booking was requested on November 10, 2026. It remains visibly closed until a receiving inbox is supplied and activated.

## Sources and assets

The advertiser-facing /about/ page uses the audience and guest information supplied by the owner on November 9, 2026. Counts are historical October snapshots, not live analytics. It distinguishes cumulative post views, monthly viewer hours, individual host followers and combined community memberships. It does not aggregate guest follower counts: the supplied 315k total does not reconcile with the list, and Zona's followers belong to an organization. The supplied top-1% streaming claim is omitted pending a defined ranking source. Only two countries were supplied, so the geography shows US 28%, UK 8%, and the calculated 64% remainder. No sponsorship packages, rates, contact address, audience guarantees or guest endorsements are invented. No advertiser contact destination has been supplied; the sponsorship form remains visibly closed until one is activated. Native details contains measurement notes and examples.

The original logos, palette and eight-second audio were supplied in C:\Users\Ethan\Downloads\r2-export. Original exports remain in public/assets. studio-sign.svg preserves the supplied logo paths while separating glow from geometry and refining edge colors; studio-mark.svg is the small flat header derivative. Space Grotesk supplies editorial type, Fredoka retains brand character in episode art, and IBM Plex Mono handles metadata. Font licenses ship in public/licenses.

studio-brick.webp is an optimized copy of Poly Haven's Brick Wall 13 diffuse material by Rob Tuytel, licensed CC0: https://polyhaven.com/a/brick_wall_13 and https://polyhaven.com/license . The normal map was evaluated in the renderer study and is not shipped. studio-grain.webp is a prebaked procedural SVG noise tile. No third-party demo JavaScript is shipped.

Show details come from https://x.com/chillwithr2 . Verified replays: https://x.com/i/broadcasts/2gqvWQyvOWanQy (09), https://x.com/i/broadcasts/2onABPznmqOgpZ (08), https://x.com/i/broadcasts/1lJQRWOgaqzxE (07), https://x.com/i/broadcasts/1DxleVAXgpdKL (06). Episode 07 aired October 29, 2026 with @AndrewAsksHow and @justinbebis; its title and date were corroborated by indexed CR2 posts and the Green Feed relay at https://t.me/s/GreenFeedTG . The original https://t.co/QSLsbZrgZt resolves to the canonical replay URL. Keep the full Robinhood Chain name. CR2 is independent; no official Robinhood logo, endorsement, or unsupported #1 claim appears.

chill-pill-avatar.png and r2d2-avatar.png are the unmodified 400px avatars supplied by the owner on November 9, 2026, in that order. Informative avatars have descriptive alt text; decorative neon-glow copies remain hidden from assistive technology.

Guest avatars in src/assets/guests are public X profile images retrieved on November 9, 2026. Each returned profile handle and description was matched to the existing guest list through the FxEmbed profile API, and the original image was downloaded from X's pbs.twimg.com CDN. sources.json records each canonical profile and image URL. Astro emits local 256px WebP copies, loaded lazily; visitors do not depend on an avatar API or X image server. The artwork is preserved, with descriptive profile-avatar alt text. Each card has a concise accessible link name.


## Guest booking

The landing-page section pairs the booking action with a staggered collage of all twelve guest avatars. Bios open on hover, keyboard focus or tap; Escape, another tap or an outside click dismisses them. The local portraits are shared with About and included in both pages' image sitemap entries. Bio copy uses owner-supplied roles; follower-only entries retain their October 2026 date. Reduced motion removes portrait transitions.

The booking action opens a native dialog with name, X handle, email, project and message. Escape, the close button and backdrop clicks close it; focus returns to the opener. Mobile layouts scroll within the dialog. No visitor data is saved to the site, local storage or a database.

The owner selected FormSubmit but has no receiving email yet. `src/site-config.ts` therefore has an empty `guestBooking.recipient` and `activated: false`. The deployed form displays **Bookings opening soon**, disables its fields and submit button, and sends no requests. This is not a working email inbox or a confirmed booking system.

To activate: supply the intended receiving inbox; submit a clearly labeled setup request through FormSubmit for this site; have the inbox owner follow FormSubmit's activation email; then set the real recipient and `activated: true`, rebuild and publish. Test receipt with the owner. The public form endpoint includes the inbox address; after activation, FormSubmit can supply an opaque endpoint if desired. No API secret is required. Never put a placeholder email into production.

Once enabled, the form posts directly to FormSubmit, using its named email field for reply-to, a fixed subject, a honeypot and the provider's spam controls. Only explicit provider success displays confirmation; activation errors, false/string-false results, rate limits, non-JSON responses and network failures preserve the fields and show retry guidance. A request is not a confirmed guest slot. FormSubmit's provider-side retention and processing are governed by https://formsubmit.co/privacy.pdf. Reference: https://formsubmit.co/documentation and https://formsubmit.co/ajax-documentation.

Check the delivery adapter without sending email: `node --experimental-strip-types --test tests/booking-request.test.mjs`. All responses are mocked. Real delivery cannot be verified until the recipient activates it.

## Discovery

Shared SEO metadata lives in `src/components/Seo.astro` and `src/lib/seo.ts`: canonical URLs, social preview descriptions and dimensions, permissive search-preview directives, Organization, WebSite, WebPage/AboutPage, hosts/guests, PodcastSeries, the three visible PodcastEpisodes, and breadcrumbs. No invented transcripts, video media URLs, ratings, endorsements or rankings are added.

Build-generated files: `/sitemap.xml` indexes `/sitemap-pages.xml` (both canonical pages) and `/sitemap-images.xml` (real local image URLs); `/robots.txt` allows search and AI crawlers, including OpenAI, Anthropic, Perplexity and Google-Extended; `/llms.txt` links the plain-text versions at `/index.md` and `/about/index.md`, with `/llms-full.txt` as a combined reference. `/feed.xml` is a broadcast-link RSS feed, not an audio-enclosure podcast feed. Episode and guest data are shared with the page to avoid separate lists drifting. Keep audience text in the Markdown summary aligned with About if those figures change. Update `pageDates` only after substantive content changes, not on every build.

Crawler permission does not promise indexing, ranking, or citations. `llms.txt` is supplementary, not an indexing requirement. Robots access is not a copyright transfer for third-party avatars. Submit `/sitemap.xml` through the owner's verified Google Search Console and Bing Webmaster Tools properties when available; none are connected here. Do not use obsolete search-engine sitemap ping endpoints. On a future domain change, update `SITE_URL` and Astro's `site` setting together, then rebuild.

References: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap , https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps , https://developers.google.com/search/docs/appearance/google-images , https://developers.openai.com/api/docs/bots , https://privacy.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler , https://llmstxt.org/ .


## Sponsorship

Added November 11, 2026. The homepage's understated Sponsor CR2 row sits below guest booking, opens its own contact modal and links Learn more to `/about/`. The About page ends with the same sponsor form inline at `/about/#sponsor`, replacing the Watch the latest episode closing action. It asks for name, email, company/project, message and an optional X handle. No rates, packages or audience guarantees are invented.

`ContactForm.astro` shares markup and response handling between guest and sponsor forms. Each form has distinct IDs, its own state, and a separate subject: `CR2 — Sponsorship inquiry` versus `CR2 — Guest spot request`. `sponsorshipContact` in `src/site-config.ts` remains empty with `activated: false`. Supply and activate its FormSubmit inbox before enabling it. Guest and sponsor delivery can use the same verified inbox or separate addresses. The existing guest-booking activation instructions apply. No inquiry is sent or retained while either form is closed.
