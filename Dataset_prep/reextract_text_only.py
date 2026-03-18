"""
Re-extract ONLY text from PDFs using the updated regex_functions.
Skips image extraction entirely (images already exist).
Overwrites existing content.txt files with cleaned text.
"""

import os
from pypdf import PdfReader
from tqdm import tqdm
from regex_functions import regex_preclean

pdf_dir = "/home/dabeet/Desktop/ald-llamamat/Web Scrapper/ald_papers_naming"
output_dir = "/home/dabeet/Desktop/ald-llamamat/Data"


def extract_pdf_text(reader):
    """Extract and clean text from all pages."""
    all_text = []
    for page_idx, page in enumerate(reader.pages):
        try:
            raw_text = page.extract_text()
            if raw_text:
                cleaned = regex_preclean(raw_text)
                if cleaned:
                    all_text.append(cleaned)
        except Exception as e:
            print(f"  Warning: Page {page_idx + 1} text extraction failed: {e}")
    return "\n\n".join(all_text)


pdf_files = [f for f in os.listdir(pdf_dir) if f.lower().endswith('.pdf')]
print(f"Found {len(pdf_files)} PDFs to re-extract text from\n")

updated = 0
failed = 0

for pdf_file in tqdm(pdf_files, desc="Re-extracting text"):
    file_name = os.path.splitext(pdf_file)[0]
    folder_path = os.path.join(output_dir, file_name)
    text_path = os.path.join(folder_path, "content.txt")

    # Only re-extract for papers that already have a folder
    if not os.path.isdir(folder_path):
        continue

    pdf_path = os.path.join(pdf_dir, pdf_file)

    try:
        reader = PdfReader(pdf_path)
    except Exception as e:
        print(f"  [FAILED] {pdf_file}: {e}")
        failed += 1
        continue

    full_text = extract_pdf_text(reader)

    with open(text_path, "w", encoding="utf-8") as f:
        f.write(full_text)
    updated += 1

print(f"\nDone! Updated {updated} content.txt files ({failed} failed)")
