#!/usr/bin/env python3
"""
generate.py — static page generator for the site.

WHAT IT DOES
  For every JSON file it finds, it creates (or refreshes) an HTML page
  with the same name, copied from the folder's template:

    news/<name>.json      -> news/<name>.html      (from news/news-template.html)
    projects/<name>.json  -> projects/<name>.html  (from projects/project-template.html)
    research/<name>.json  -> research/<name>.html  (from research/research-template.html)

  It also (re)builds projects/index.html and research/index.html — listing
  pages of all projects / research topics, generated from the JSON files'
  title / subtitle / heroImage / accent.

  It also (re)builds news/index.json — a manifest of every news item
  (id, date, category, byline, title, img), SORTED newest-first by date.
  index.html reads this manifest to render the News section, so the news
  JSON files are the single source of truth (no more hand-editing a
  SITE_NEWS array, and the home page orders itself by date automatically).

  research/featured.json is NOT a page: it is the ordered list of slugs
  shown in the index.html "01 Research" carousel (fetched at runtime).

USAGE
    python3 generate.py            # generate everything
    python3 generate.py --check    # report what would change, write nothing

WORKFLOW FOR A NEW ARTICLE OR PROJECT
    1. Create news/my-new-article.json  (copy an existing one)
    2. Run:  python3 generate.py
    That's it — the home page picks up the new item from news/index.json,
    already sorted by its "date" field.

Because every page is a fresh copy of the template, redesigning the
template and re-running this script restyles ALL pages at once.

PREVIEW
    The pages fetch their JSON at runtime, which requires HTTP:
        python3 -m http.server     ->  http://localhost:8000
"""

import json
import sys
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).parent

SECTIONS = [
    # (folder, template filename)
    ("news", "news-template.html"),
    ("projects", "project-template.html"),
    ("research", "research-template.html"),
]

ACCENT_TEXT = {"plum": "text-plum-via", "blue": "text-blue", "teal": "text-teal"}

# JSON files that are data, not pages — never turned into HTML.
NON_PAGE_JSON = {"featured.json", "index.json"}

LISTINGS = [
    # (folder, page <h1>/title, intro paragraph)
    ("projects", "Research &amp; Projects",
     "Explore the research areas and active projects of the lab."),
    ("research", "Research",
     "All research lines, frameworks, and visions of the lab — every topic, not only the featured ones."),
]

LISTING_PAGE = """<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>__TITLE__ — Enrique Coronado</title>
  <!-- GENERATED FILE — do not edit. Run `python3 generate.py` to rebuild. -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">
  <script>
    tailwind.config = { theme: { extend: {
      colors: {
        ink: '#16233F', body: '#4B5568', faint: '#8B93A3', line: '#DDE2EC',
        sky: '#4E9FD9', lime: '#DCF34B',
        blue: { DEFAULT: '#1173BC', deep: '#0A5697', text: '#1B6FB5' },
        cyan: '#A9EAFB', cyanfill: '#BFF0FC',
        plum: { from: '#8A4B9B', via: '#7A3D8C', to: '#5F2D74' },
        mint: { DEFAULT: '#AEE8D4', text: '#BDEFE1', ink: '#123B33' },
        teal: { DEFAULT: '#14555A', dark: '#0E4347' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { site: '80rem' },
    }}}
  </script>
  <style>
    body {
      font-family: 'Inter', system-ui, sans-serif;
      font-feature-settings: 'cv11', 'ss01';
      background: linear-gradient(180deg, #F4F6FB 0%, #EAEFF8 55%, #F1F4FA 100%);
    }
    .display { letter-spacing: -0.025em; }
    .meta { font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 0.75rem;
            font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; }
    a:focus-visible { outline: 2px solid #1173BC; outline-offset: 3px; border-radius: 4px; }
  </style>
</head>
<body class="text-ink antialiased">
  <nav aria-label="Main">
    <div class="max-w-site mx-auto px-5 h-16 flex items-center justify-between gap-6">
      <a href="../index.html" class="leading-tight shrink-0">
        <span class="block font-bold text-[17px] display">Enrique Coronado</span>
        <span class="block text-[10px] text-faint font-medium tracking-wide">AIST · INTEGRATED RESEARCH CENTER FOR WELLBEING</span>
      </a>
      <div class="hidden lg:flex items-center gap-9 text-[15px] font-medium">
        <a href="../about.html" class="hover:text-blue transition-colors">About</a>
        <a href="../index.html#research" class="hover:text-blue transition-colors">Research</a>
        <a href="../index.html#projects" class="hover:text-blue transition-colors">Projects</a>
        <a href="../research.html" class="hover:text-blue transition-colors">Publications</a>
        <a href="../index.html#news" class="hover:text-blue transition-colors">News</a>
        <a href="../interships.html" class="hover:text-blue transition-colors">Internships</a>
      </div>
    </div>
  </nav>
  <header class="max-w-site mx-auto px-5 pt-10 pb-12">
    <h1 class="display font-semibold text-4xl md:text-6xl mb-5">__TITLE__</h1>
    <p class="text-xl text-body max-w-2xl">__INTRO__</p>
  </header>
  <section class="max-w-site mx-auto px-5 pb-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
__CARDS__
  </section>
  <footer>
    <div class="max-w-site mx-auto px-5 py-10 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
      <p class="font-semibold display">Enrique Coronado</p>
      <p class="meta text-faint">&copy; 2026 · AIST — HEART</p>
    </div>
  </footer>
</body>
</html>
"""

# Glass-effect card — same look as the projects grid on index.html.
CARD = """    <a href="{slug}.html" class="group rounded-3xl bg-white/20 overflow-hidden flex flex-col backdrop-blur-[2px] shadow-sm border border-white/20 hover:bg-white/50 hover:shadow-lg transition-all duration-300">
      <div class="h-52 overflow-hidden">
        <img src="{img}" alt="" loading="lazy"
          class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500">
      </div>
      <div class="p-7 flex flex-col gap-2.5 flex-1">
        <p class="meta {accent_cls}">{type} · {eyebrow}</p>
        <h3 class="display font-semibold text-2xl">{title}</h3>
        <p class="text-body text-[15px] leading-relaxed">{subtitle}</p>
      </div>
    </a>
"""


def generate_pages(check_only: bool) -> int:
    changed = 0
    for folder, template_name in SECTIONS:
        directory = ROOT / folder
        template_path = directory / template_name
        if not template_path.exists():
            print(f"!! missing template: {template_path} — skipping {folder}/")
            continue
        template = template_path.read_text(encoding="utf-8")

        for json_path in sorted(directory.glob("*.json")):
            if json_path.name in NON_PAGE_JSON:
                continue
            html_path = json_path.with_suffix(".html")
            try:
                json.loads(json_path.read_text(encoding="utf-8"))
            except json.JSONDecodeError as e:
                print(f"!! invalid JSON, skipped: {json_path.name} ({e})")
                continue

            up_to_date = html_path.exists() and html_path.read_text(encoding="utf-8") == template
            status = "ok      " if up_to_date else ("would   " if check_only else "written ")
            if not up_to_date:
                changed += 1
                if not check_only:
                    html_path.write_text(template, encoding="utf-8")
            print(f"  {status} {folder}/{html_path.name}")
    return changed


def generate_listing(folder: str, title: str, intro: str, check_only: bool) -> None:
    directory = ROOT / folder
    cards = []
    for json_path in sorted(directory.glob("*.json")):
        if json_path.name in NON_PAGE_JSON:
            continue
        try:
            p = json.loads(json_path.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            continue
        cards.append(CARD.format(
            slug=json_path.stem,
            img=p.get("heroImage", ""),
            accent_cls=ACCENT_TEXT.get(p.get("accent", "blue"), "text-blue"),
            type=p.get("type", "Project"),
            eyebrow=p.get("eyebrow", ""),
            title=p.get("title", json_path.stem),
            subtitle=p.get("subtitle", ""),
        ))
    if not cards:
        return
    out = (LISTING_PAGE
           .replace("__TITLE__", title)
           .replace("__INTRO__", intro)
           .replace("__CARDS__", "".join(cards)))
    index_path = directory / "index.html"
    if check_only:
        print(f"  would   {folder}/index.html ({len(cards)} cards)")
    else:
        index_path.write_text(out, encoding="utf-8")
        print(f"  written {folder}/index.html ({len(cards)} cards)")


# Date formats accepted in a news JSON "date" field (first match wins).
NEWS_DATE_FORMATS = ["%B %d, %Y", "%b %d, %Y", "%Y-%m-%d"]


def parse_news_date(value: str):
    for fmt in NEWS_DATE_FORMATS:
        try:
            return datetime.strptime(value.strip(), fmt)
        except (ValueError, AttributeError):
            continue
    return None


def generate_news_manifest(check_only: bool) -> None:
    """Build news/index.json — card data for every news item, newest first.

    This is the single source of truth for the index.html News section:
    the id comes from the file name, the rest from the JSON. Items are
    sorted by their "date" field so the home page orders itself.
    """
    directory = ROOT / "news"
    items = []
    for json_path in sorted(directory.glob("*.json")):
        if json_path.name in NON_PAGE_JSON:
            continue
        try:
            p = json.loads(json_path.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            continue
        dt = parse_news_date(p.get("date", ""))
        if dt is None:
            print(f"!! unparseable date in {json_path.name}: {p.get('date')!r} — sorted last")
        items.append({
            "sort": (dt or datetime.min).strftime("%Y-%m-%d"),
            "id": json_path.stem,  # file name is the id (survives a missing "id" field)
            "date": p.get("date", ""),
            "category": p.get("category", "News"),
            "byline": p.get("byline", ""),
            "title": p.get("title", json_path.stem),
            # rebase "../img/..." (relative to news/) to "img/..." (site root);
            # leave absolute URLs untouched.
            "img": p.get("img", "").replace("../", "", 1) if p.get("img", "").startswith("../") else p.get("img", ""),
        })

    items.sort(key=lambda x: x["sort"], reverse=True)
    for it in items:
        del it["sort"]

    out = json.dumps(items, ensure_ascii=False, indent=2) + "\n"
    manifest = directory / "index.json"
    up_to_date = manifest.exists() and manifest.read_text(encoding="utf-8") == out
    if check_only:
        print(f"  {'ok      ' if up_to_date else 'would   '} news/index.json ({len(items)} items)")
    else:
        manifest.write_text(out, encoding="utf-8")
        print(f"  written news/index.json ({len(items)} items)")


if __name__ == "__main__":
    check = "--check" in sys.argv
    print("Generating pages from JSON files...\n")
    n = generate_pages(check)
    for folder, title, intro in LISTINGS:
        generate_listing(folder, title, intro, check)
    generate_news_manifest(check)
    print(f"\nDone. {n} page(s) {'need updating' if check else 'updated'}.")
    if not check:
        print("Preview with:  python3 -m http.server   ->  http://localhost:8000")