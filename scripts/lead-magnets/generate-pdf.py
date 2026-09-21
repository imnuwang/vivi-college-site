#!/usr/bin/env python3
"""Generate single-page long PDF with optimal height via binary search."""

import re
from pathlib import Path
from weasyprint import HTML

SRC = Path(__file__).parent / "home-energy-guide.html"
OUT = Path(__file__).parent / "home-energy-guide.pdf"

html_text = SRC.read_text(encoding="utf-8")

def render_with_height(height_mm: int) -> int:
    """Render PDF with given page height, return number of pages."""
    patched = re.sub(
        r"size:\s*210mm\s+\d+mm",
        f"size: 210mm {height_mm}mm",
        html_text,
    )
    doc = HTML(string=patched, base_url=str(SRC.parent)).render()
    return len(doc.pages), doc

lo, hi = 500, 5000
best_doc = None
best_h = hi

while lo <= hi:
    mid = (lo + hi) // 2
    pages, doc = render_with_height(mid)
    if pages == 1:
        best_doc = doc
        best_h = mid
        hi = mid - 1
    else:
        lo = mid + 1

padding = 20
final_h = best_h + padding
pages, final_doc = render_with_height(final_h)
final_doc.write_pdf(OUT)
print(f"PDF generated: {OUT}")
print(f"Optimal height: {final_h}mm ({pages} page(s))")
