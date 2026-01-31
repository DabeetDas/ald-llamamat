# file logic to upload the dataset to kaggle
# inability to process dois as pdf names : rename sequentially and then create a mapping csv to maintain doi data, pair with earlier metadata for complete use.

import os
from tqdm import tqdm
import pandas as pd

root_dir = "Web Scrapper/ald_papers_naming"

meta_data = []

i = 1
for filename in tqdm(sorted(os.listdir(root_dir))):
    if not filename.lower().endswith(".pdf"):
        continue

    old_path = os.path.join(root_dir, filename)    
    new_name = f"paper{i}.pdf"
    new_path = os.path.join(root_dir, new_name)

    os.rename(old_path, new_path)
    i += 1
    meta_data.append({filename,new_name})

print("Name conversion done")

df = pd.DataFrame(meta_data)
df.to_csv("mappings.csv")
print("Saved CSV with correct mapping")
