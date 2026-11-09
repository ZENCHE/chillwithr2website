# CR2

Static media-company website built with Astro and TypeScript. No database.

## Run and publish

Run npm ci, npm run dev, npm run check, and npm run build. Production output is dist/. The existing Sites identity is in .openai/hosting.json. Preserve its ID and current private audience.

## Design and content

The opening scene is a neon broadcast studio built with a photographed brick material, layered SVG sign, colored lighting, and bounded parallax. The three content sections are the studio, broadcasts, and hosts. All navigation and text are HTML. Effects stop when inactive, offscreen, or hidden. Reduced-motion preferences disable decorative movement. The schedule, intro player, audio analyser and motion-toggle row were removed at the owner’s request.

The CSS/SVG treatment was selected after comparing it with a Three.js normal-mapped wall and selective bloom. It preserves sharper, more saturated logo artwork and avoids the experimental renderer's additional 136 KB gzip JavaScript. The production site has no WebGL dependency, so graphics-context failure cannot hide its content.

Edit src/data.ts to update episodes, newest first. Supply real titles, guest handles, display/ISO dates, and canonical replay URLs. The first entry drives the hero replay action. Company introduction lives in src/pages/index.astro. Styles are in src/styles/global.css; the interaction controller is src/scripts/site.ts. Development builds expose bounded frame statistics in the hero's data-motion-profile attribute; this instrumentation is removed from production.

Keep copy concrete and concise. No repeated mission sections, invented biographies, audience claims, unsupported rankings, or slogans about signals and the next era. The owner requested no contact action until a destination is supplied.

## Sources and assets

The original logos, palette and eight-second audio were supplied in C:\Users\Ethan\Downloads\r2-export. Original exports remain in public/assets. studio-sign.svg preserves the supplied logo paths while separating glow from geometry and refining edge colors; studio-mark.svg is the small flat header derivative. Space Grotesk supplies editorial type, Fredoka retains brand character in episode art, and IBM Plex Mono handles metadata. Font licenses ship in public/licenses.

studio-brick.webp is an optimized copy of Poly Haven's Brick Wall 13 diffuse material by Rob Tuytel, licensed CC0: https://polyhaven.com/a/brick_wall_13 and https://polyhaven.com/license . The normal map was evaluated in the renderer study and is not shipped. studio-grain.webp is a prebaked procedural SVG noise tile. No third-party demo JavaScript is shipped.

Show details come from https://x.com/chillwithr2 . Verified replays: https://x.com/i/broadcasts/2gqvWQyvOWanQy (09), https://x.com/i/broadcasts/2onABPznmqOgpZ (08), https://x.com/i/broadcasts/1lJQRWOgaqzxE (07), https://x.com/i/broadcasts/1DxleVAXgpdKL (06). Episode 07 aired October 29, 2026 with @AndrewAsksHow and @justinbebis; its title and date were corroborated by indexed CR2 posts and the Green Feed relay at https://t.me/s/GreenFeedTG . The original https://t.co/QSLsbZrgZt resolves to the canonical replay URL. Keep the full Robinhood Chain name. CR2 is independent; no official Robinhood logo, endorsement, or unsupported #1 claim appears.

chill-pill-avatar.png and r2d2-avatar.png are the unmodified 400px avatars supplied by the owner on November 9, 2026, in that order. Host names provide the accessible link labels; adjacent avatar images use empty alt text to avoid repetition.
