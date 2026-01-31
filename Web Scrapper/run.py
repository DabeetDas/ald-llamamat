from scrape import get_responses
from doi2pdf import save2pdf,check_availability
from tqdm import tqdm
import time
import requests
import pandas as pd
import random

references,processes = get_responses()

process_map = {
    process["process_id"]: process
    for process in processes
}

successful = []
failed = []

for reference in tqdm(references):
    doi = reference.get("reference_doi")
    process_id = reference.get("process_id")
    process = process_map.get(process_id, {})

    try:
        file_name = save2pdf(doi)
        status = "downloaded"
        error = None
    except Exception as e:
        file_name = None
        status = "exception"
        error = str(e)

    if not file_name:
        failed.append({
            "reference_doi": doi,
            "process_id": process_id,
            "status": status,
            "error": error
        })
        time.sleep(random.uniform(1.6, 2.2))
        continue

    successful.append({
        "file_name": file_name,
        "process_id": process_id,
        "reference_doi": doi,
        "process_material": process.get("process_material"),
        "reactantA": process.get("process_reactantA"),
        "reactantB": process.get("process_reactantB"),
        "reactantC": process.get("process_reactantC"),
        "reactantD": process.get("process_reactantD"),
    })

    time.sleep(random.uniform(1.6, 2.2))



pd.DataFrame(successful).to_csv("metadata_success.csv", index=False)
pd.DataFrame(failed).to_csv("metadata_failed.csv", index=False)


'''
---------
22 papers available on elsevier from first 100
TO SELF: CHECK UNPAYWALL API
https://unpaywall.org/products/api
1276 papers are available on elsevier api
---------
'''