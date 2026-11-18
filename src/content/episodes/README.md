# Episode page data

One `ep-XX.json` per episode (no transcripts; they stay on the box). Only episodes with a JSON here get a page at `/episodes/ep-XX-<slug>/`; the rest keep their X replay link.

Do not edit by hand. Run `npm run sync:episodes` to copy the drafts from `/workspace/cr2/episodes/pages/` (override with `EPISODES_SRC=/path`). The sync applies the private redaction list (outside the repo) and `scripts/episode-overrides.json`, and drops the transcript path field and internal notes. Only this sanitised output is committed; raw drafts, the redaction list and transcripts stay on the box. The build validates every file with zod (`src/lib/episode-pages.ts`) and fails on bad data.
