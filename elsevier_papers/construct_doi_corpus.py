import os
import time
import pandas as pd
import requests
from tqdm import tqdm
from requests.exceptions import RequestException

try:
    from dotenv import load_dotenv
except ImportError:
    load_dotenv = None

if load_dotenv:
    load_dotenv()

API_KEY_ENV_NAMES = ("ELSEVIER_API_KEY", "ELS_API_KEY", "SCOPUS_API_KEY", "X_ELS_APIKEY")
BASE_URL = "https://api.elsevier.com/content/search/scopus"
RESULTS_PER_PAGE = 25 
SLEEP_BETWEEN_REQUESTS = 5
REQUEST_TIMEOUT = 30
MAX_RETRIES = 3


def get_elsevier_api_key():
    for env_name in API_KEY_ENV_NAMES:
        api_key = os.getenv(env_name)
        if api_key:
            return api_key
    raise RuntimeError(
        "Set your Elsevier/Scopus API key in one of these environment variables: "
        + ", ".join(API_KEY_ENV_NAMES)
    )


def search_ald_papers(start=0, count=5, max_retries=MAX_RETRIES):
    query = (
        'TITLE-ABS-KEY("atomic layer deposition") '
        'AND TITLE-ABS-KEY("thin film" OR "growth" OR "coating" OR "deposition") '
        'AND TITLE-ABS-KEY("precursor" OR "cycle" OR "self-limiting" OR "pulse") '
        'AND NOT TITLE-ABS-KEY("review" OR "overview" OR "perspective" OR "survey") '
        'AND DOCTYPE(ar) '
        'AND SUBJAREA(MATE OR CHEM OR PHYS)'
    )

    params = {
        "query": query,
        "field": "dc:identifier,prism:doi,dc:title,prism:publicationName,prism:coverDate",
        "count": count,
        "start": start,
        "sort": "coverDate",
        "date": "2022-2025"
    }

    headers = {
        "X-ELS-APIKey": get_elsevier_api_key(),
        "Accept": "application/json"
    }

    for attempt in range(1, max_retries + 1):
        try:
            r = requests.get(
                BASE_URL,
                headers=headers,
                params=params,
                timeout=REQUEST_TIMEOUT,
            )
            r.raise_for_status()
            return r.json()
        except ValueError as exc:
            print(f"Bad JSON response for start={start}: {exc}")
            return None
        except RequestException as exc:
            print(f"API request failed for start={start} (attempt {attempt}/{max_retries}): {exc}")
            if attempt < max_retries:
                time.sleep(SLEEP_BETWEEN_REQUESTS)

    print(f"Skipping start={start} after {max_retries} failed attempts.")
    return None


def get_search_results(data):
    if not isinstance(data, dict):
        return None

    search_results = data.get("search-results")
    if not isinstance(search_results, dict):
        print("Bad API response: missing 'search-results'.")
        return None

    return search_results


def fetch_all_papers(max_papers=2500):
    collected_papers = []
    start = 0 

    data = search_ald_papers(start=0, count=RESULTS_PER_PAGE)
    search_results = get_search_results(data)
    if not search_results:
        print("No valid API response received. Returning 0 papers.")
        return collected_papers

    try:
        total = int(search_results.get("opensearch:totalResults", 0))
    except (TypeError, ValueError):
        print("Bad API response: invalid total result count. Returning 0 papers.")
        return collected_papers

    total = min(total,max_papers)
    print(f"Total papers: {total}")

    entries = search_results.get("entry", [])
    if not isinstance(entries, list):
        print("Bad API response: 'entry' is not a list. Returning 0 papers.")
        return collected_papers

    collected_papers.extend(entries)
    start += len(entries)

    with tqdm(total=total, initial=min(start, total), desc="Fetching papers", unit="paper") as pbar:
        while start < total:
            time.sleep(SLEEP_BETWEEN_REQUESTS)

            data = search_ald_papers(start=start, count=RESULTS_PER_PAGE)
            search_results = get_search_results(data)
            if not search_results:
                break

            entries = search_results.get("entry", [])
            if not isinstance(entries, list):
                print(f"Bad API response for start={start}: 'entry' is not a list.")
                break

            if not entries:
                break

            collected_papers.extend(entries)
            fetched = len(entries)
            start += fetched
            pbar.update(fetched)   # ← move bar forward by actual count
    
    return collected_papers


if __name__ == "__main__":
    papers = fetch_all_papers(max_papers=2500)
    dataframe = []

    for entry in papers:
        if not isinstance(entry, dict):
            print(f"Skipping bad paper entry: {entry}")
            continue

        title = entry.get('dc:title', '')
        publication = entry.get('prism:publicationName', '')
        date = entry.get('prism:coverDate', '')
        doi = entry.get('prism:doi', '')
        dataframe.append([title,publication,date,doi])
    

    df = pd.DataFrame(data=dataframe,columns=["Title","Publication","Date","DOI"])
    df.to_csv("doi_elsevier.csv")
    print("Converted to csv!")
