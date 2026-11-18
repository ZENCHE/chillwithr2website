# Episode page data

One `ep-XX.json` per episode plus its transcript in `transcripts/ep-XX.txt`. Only episodes with a JSON here get a page at `/episodes/ep-XX-<slug>/`; the rest keep their X replay link.

Do not edit by hand. Run `npm run sync:episodes` to copy the drafts from `/workspace/cr2/episodes/pages/` (override with `EPISODES_SRC=/path`). The sync applies the private redaction list (outside the repo) to the JSON and the transcript, and rewrites `transcript_path` to the repo copy. The build validates every file with zod (`src/lib/episode-pages.ts`) and fails on bad data.
