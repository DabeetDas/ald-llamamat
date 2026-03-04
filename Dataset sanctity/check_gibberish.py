"""
Script to detect papers with gibberish text (malformed PDF extraction).

The gibberish pattern is /CXX-style Unicode escape sequences, e.g.:
  /C70/C117/C108/C108 /C80/C97/C112/C101/C114

This script checks every content.txt in the Data directory and reports
how many contain this pattern.
"""

import os
import re
import sys

DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "Data"))

# Pattern: sequences of /C followed by 2-3 hex digits appearing repeatedly
GIBBERISH_PATTERN = re.compile(r'(/C[0-9a-fA-F]{2,3}){3,}')

def check_paper(content_path: str) -> bool:
    """Returns True if the file contains gibberish text."""
    try:
        with open(content_path, 'r', encoding='utf-8', errors='ignore') as f:
            # Only read first 2000 chars — gibberish appears from the very start
            sample = f.read(2000)
        
        if not sample.strip():
            return False  # Empty file, different issue
        
        matches = GIBBERISH_PATTERN.findall(sample)
        # If more than 10% of lines start with /C patterns, it's gibberish
        lines = [l for l in sample.split('\n') if l.strip()]
        if not lines:
            return False
        gibberish_lines = sum(1 for l in lines if l.strip().startswith('/C'))
        ratio = gibberish_lines / len(lines)
        
        return ratio > 0.3  # If 30%+ of lines are gibberish
    except Exception as e:
        print(f"Error reading {content_path}: {e}")
        return False

def main():
    if not os.path.exists(DATA_DIR):
        print(f"Data directory not found: {DATA_DIR}")
        sys.exit(1)

    papers = sorted([d for d in os.listdir(DATA_DIR) 
                     if os.path.isdir(os.path.join(DATA_DIR, d))])
    
    total = len(papers)
    gibberish_papers = []
    empty_papers = []
    clean_papers = []
    
    for paper in papers:
        content_path = os.path.join(DATA_DIR, paper, "content.txt")
        if not os.path.exists(content_path):
            empty_papers.append(paper)
            continue
        
        # Check file size
        size = os.path.getsize(content_path)
        if size == 0:
            empty_papers.append(paper)
            continue
            
        if check_paper(content_path):
            gibberish_papers.append(paper)
        else:
            clean_papers.append(paper)
    
    print("=" * 60)
    print("GIBBERISH TEXT DETECTION REPORT")
    print("=" * 60)
    print(f"Total papers scanned:     {total}")
    print(f"Clean papers:             {len(clean_papers)}")
    print(f"Gibberish papers:         {len(gibberish_papers)}")
    print(f"Empty/missing content:    {len(empty_papers)}")
    print(f"Gibberish percentage:     {len(gibberish_papers)/total*100:.1f}%")
    print("=" * 60)
    
    # Save lists to files for reference
    with open("gibberish_papers.txt", "w") as f:
        f.write("\n".join(gibberish_papers))
    with open("clean_papers.txt", "w") as f:
        f.write("\n".join(clean_papers))
    
    print(f"\nSaved list of gibberish papers to: gibberish_papers.txt")
    print(f"Saved list of clean papers to:     clean_papers.txt")

if __name__ == "__main__":
    main()
