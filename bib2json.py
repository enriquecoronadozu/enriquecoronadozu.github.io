import json
from pybtex.database import parse_file

def bib_to_json(bib_path, json_path):
    bib_data = parse_file(bib_path)

    entries = []

    for key, entry in bib_data.entries.items():
        fields = entry.fields
        persons = entry.persons

        authors = []
        if "author" in persons:
            authors = [" ".join(p.last_names + p.first_names) for p in persons["author"]]

        entries.append({
            "id": key,
            "type": entry.type,
            "title": fields.get("title"),
            "year": fields.get("year"),
            "journal": fields.get("journal"),
            "booktitle": fields.get("booktitle"),
            "publisher": fields.get("publisher"),
            "author": authors
        })

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(entries, f, indent=2, ensure_ascii=False)

bib_to_json("papers.bib", "publications.json")