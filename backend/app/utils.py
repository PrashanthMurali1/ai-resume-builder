import re
from typing import Iterable, List

def slugify(name: str, default="resume"):
    s = name.strip().lower()
    s = re.sub(r"[^a-z0-9]+","_", s).strip("_")
    return s or default

def contains_phrase(text: str, phrase: str) -> bool:
    # case-insensitive phrase search with word boundaries when reasonable
    t = text.lower()
    p = phrase.lower().strip()
    if len(p.split()) == 1:
        return re.search(rf"\b{re.escape(p)}\b", t) is not None
    return p in t

def missing_keywords(resume_text: str, keywords: Iterable[str]) -> List[str]:
    return [k for k in keywords if k and not contains_phrase(resume_text, k)]
