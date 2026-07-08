# enriquecoronadozu.github.io

Personal webpage of Enrique Coronado. Static site (GitHub Pages) styled with
Tailwind (CDN). Content for **news**, **projects**, and **research** lives in
JSON files; `generate.py` turns them into HTML pages.

## How content works

Each content folder holds one JSON file per item plus a template:

| Folder      | Template                        | Page URL                | Listing page          |
|-------------|---------------------------------|-------------------------|-----------------------|
| `news/`     | `news/news-template.html`       | `news/<name>.html`      | — (index.html #news)  |
| `projects/` | `projects/project-template.html`| `projects/<name>.html`  | `projects/index.html` |
| `research/` | `research/research-template.html`| `research/<name>.html` | `research/index.html` |

`generate.py` copies the template to `<name>.html` for every `<name>.json` it
finds. The page then **fetches its own JSON at runtime** (the HTML file and the
JSON file must share the same name). Redesign a template + re-run the script =
all pages restyled at once.

The listing pages (`projects/index.html`, `research/index.html`) are fully
generated — **never edit them by hand**. They use the same glass-effect cards
as the projects grid on index.html.

Master copies of the templates are mirrored in `templates/` — if you edit a
template, keep both copies in sync.

## Generating the static HTML

```bash
python3 generate.py            # generate/refresh everything
python3 generate.py --check    # dry run: report what would change
```

Preview locally (fetch does NOT work from file://):

```bash
python3 -m http.server         # then open http://localhost:8000
```

## Adding a NEWS item

1. Copy an existing JSON, e.g. `news/paper-digital-twins-feb-13-2024.json`,
   to `news/my-article-<date>.json` and edit it. Fields:
   `id`, `date`, `category` ("Paper" | "Award"), `title`, `summary`, `img`,
   `subtitle1..3` / `description1..3`, `highlight`, `url`.
   Image paths are relative to `news/`, so use `../img/...`.
2. Run `python3 generate.py` → creates `news/my-article-<date>.html`.
3. **Show it on the home page:** add an entry to the `SITE_NEWS` array in
   `index.html` (id = the file name without extension, plus date, category,
   title, byline, img — here img paths are relative to the root: `img/...`).
   The news section on index.html renders only from `SITE_NEWS`.

## Adding a PROJECT

1. Copy an existing JSON, e.g. `projects/agentic-physical-ai.json`, to
   `projects/my-project.json` and edit it. Fields:
   `type`, `accent` ("plum" | "blue" | "teal"), `eyebrow`, `title`,
   `subtitle`, `heroImage`, `intro`, and optional `stats`, `vision`,
   `mission`, `activities`, `publications`, `cta`
   (see the template header comment for the exact shapes).
   Image paths are relative to `projects/`, so use `../img/...`.
2. Run `python3 generate.py` → creates `projects/my-project.html` and
   rebuilds `projects/index.html` (the "all projects" listing) automatically.
3. **Show it on the home page:** add an entry to the `SITE_PROJECTS` array in
   `index.html` (02 Projects grid). Only projects listed there appear on the
   home page; all projects always appear on `projects/index.html`.

## Adding a RESEARCH topic

Research pages are lighter than projects — they explain a paper, framework,
or vision (e.g. Mythra, NEP+, HCF).

1. Copy an existing JSON, e.g. `research/nep-plus.json`, to
   `research/my-topic.json` and edit it. Fields:
   `type`, `accent` ("plum" | "blue" | "teal"), `eyebrow`, `title`,
   `subtitle`, `heroImage`, `intro`, and optional `sections`
   (`[{title, text, image?}]`), `highlights` (chips), `publications`,
   `links`. Optional card-only fields: `teaser` (short text for the home-page
   carousel card, falls back to `subtitle`) and `cardImage` (falls back to
   `heroImage`). Image paths are relative to `research/`: `../img/...`.
2. Run `python3 generate.py` → creates `research/my-topic.html` and rebuilds
   `research/index.html` (the "all research" listing) automatically.
3. **Show it in the home-page carousel (01 Research):** add the slug to
   `research/featured.json`:

   ```json
   { "featured": ["mythra", "nep-plus", "hcf"] }
   ```

   Order in this list = order in the carousel (most relevant first,
   3–5 recommended). `index.html` fetches this file at runtime, so no
   regeneration and no HTML editing is needed. Topics not listed here are
   still reachable from `research/index.html` ("More on Research" button).

   `featured.json` is data, not a page — `generate.py` skips it.

## Selecting what appears on index.html — summary

| Section          | Controlled by                          | Needs regenerate? |
|------------------|----------------------------------------|-------------------|
| News             | `SITE_NEWS` array in `index.html`      | no                |
| 01 Research      | `research/featured.json`               | no                |
| 02 Projects      | `SITE_PROJECTS` array in `index.html`  | no                |
| Listing pages    | all JSON files in the folder           | yes (`generate.py`) |

## Heart animation (home page background)

The breathing heart on index.html is configured by **`heart-config.json`**
(site root). Design it visually with **`animation.html`** — open it in a
browser, tune the sliders (inner density, edge nodes, outliers, link reach,
edge scatter, jitter, breath amplitude, animation mode), then press
**💾 Save design**: it downloads a new `heart-config.json`. Move that file to
the site root (replacing the old one) and index.html picks it up on the next
load. If the file is missing, index.html falls back to built-in defaults.

The guided-breathing phase durations (inhale/hold/exhale/rest) are saved in
the JSON too and can be hand-edited there.

## Design notes

- Design tokens (colors, fonts, `max-w-site`) are defined in the
  `tailwind.config` block of `index.html` and duplicated in every template
  and standalone page — keep them in sync when changing the palette.
- Fonts: Inter (sans) + IBM Plex Mono (`.meta` labels).
- Background: shared gradient `#F4F6FB → #EAEFF8 → #F1F4FA`
  (index.html draws it on the animated heart canvas instead).
- Standalone pages (`about.html`, `interships.html`, `join.html`, ...) follow
  the same shell: nav bar, gradient, footer, mobile-menu script.
