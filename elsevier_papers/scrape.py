import pandas as pd
from construct_doi_corpus import get_elsevier_api_key
import requests
import time
from pathlib import Path
from itertools import islice
from xml.etree import ElementTree
from requests.exceptions import RequestException
from tqdm import tqdm

BASE_URL = "https://api.elsevier.com/content/article/doi/"
SCRIPT_DIR = Path(__file__).resolve().parent
INPUT_CSV = SCRIPT_DIR / "doi_elsevier.csv"
OUTPUT_DIR = SCRIPT_DIR / "Elsevier ALD Papers"
OUTPUT_FILE = OUTPUT_DIR / "elsevier_full_text.txt"
STATUS_FILE = OUTPUT_DIR / "scrape_status.csv"
REQUEST_TIMEOUT = 60
SLEEP_BETWEEN_REQUESTS = 7
MAX_RETRIES = 3
OVERWRITE_EXISTING = True


def get_api_error(response):
    try:
        root = ElementTree.fromstring(response.content)
    except ElementTree.ParseError:
        return response.text.strip()

    status_code = ""
    status_text = ""
    for element in root.iter():
        tag = element.tag.split("}")[-1]
        if tag == "statusCode" and element.text:
            status_code = element.text.strip()
        if tag == "statusText" and element.text:
            status_text = element.text.strip()

    return " - ".join(part for part in (status_code, status_text) if part)


def get_full_text(doi, max_retries=MAX_RETRIES):
    doi = str(doi).strip()
    if not doi or doi.lower() == "nan":
        return None, "missing DOI"

    api_key = get_elsevier_api_key()
    url = f"{BASE_URL}{doi}?APIKey={api_key}&httpAccept=text/plain"
    headers = {
        "X-ELS-APIKey": api_key,
        "Accept": "text/xml",
    }

    for attempt in range(1, max_retries + 1):
        try:
            response = requests.get(
                url,
                headers=headers,
                timeout=REQUEST_TIMEOUT,
            )

            if response.status_code == 404:
                return None, "404 not found"
            if response.status_code == 401:
                return None, "401 unauthorized - check API key"
            if response.status_code == 403:
                return None, "403 forbidden - no access to full text"
            if response.status_code == 400:
                api_error = get_api_error(response)
                return None, f"400 bad request: {api_error}"
            if response.status_code == 429:
                retry_after = response.headers.get("Retry-After", SLEEP_BETWEEN_REQUESTS)
                try:
                    wait_seconds = int(retry_after)
                except (TypeError, ValueError):
                    wait_seconds = SLEEP_BETWEEN_REQUESTS
                print(f"Rate limited for DOI {doi}; waiting {wait_seconds}s.")
                time.sleep(wait_seconds)
                continue

            response.raise_for_status()
            text = response.text.strip()
            if not text:
                return None, "empty response"

            return text, "ok"
        except RequestException as exc:
            print(f"Request failed for DOI {doi} (attempt {attempt}/{max_retries}): {exc}")
            if attempt < max_retries:
                time.sleep(SLEEP_BETWEEN_REQUESTS)

    return None, f"failed after {max_retries} attempts"


def scrape_all():
    df = pd.read_csv(INPUT_CSV)
    OUTPUT_DIR.mkdir(exist_ok=True)

    downloaded_texts = []
    statuses = []

    for index, row in tqdm(islice(df.iterrows(),2182)):
        doi = row.get("DOI", "")
        title = row.get("Title", "")
        publication = row.get("Publication", "")
        date = row.get("Date", "")
        output_file = OUTPUT_DIR / f"paper_{index + 1}.txt"

        if output_file.exists() and not OVERWRITE_EXISTING:
            print(f"[{index}] Already downloaded: {doi}")
            text = output_file.read_text(encoding="utf-8")
            downloaded_texts.append((index, title, publication, date, doi, text))
            statuses.append((index, doi, "already exists", str(output_file)))
            continue

        print(f"[{index}] Fetching: {doi}")
        text, status = get_full_text(doi)

        if text:
            output_file.write_text(text, encoding="utf-8")
            downloaded_texts.append((index, title, publication, date, doi, text))
            statuses.append((index, doi, status, str(output_file)))
        else:
            print(f"[{index}] Skipped {doi}: {status}")
            output_file.write_text(
                (
                    "Full text was not available from the Elsevier Article Retrieval API.\n\n"
                    f"Title: {title}\n"
                    f"Publication: {publication}\n"
                    f"Date: {date}\n"
                    f"DOI: {doi}\n"
                    f"Status: {status}\n"
                ),
                encoding="utf-8",
            )
            statuses.append((index, doi, status, ""))

        time.sleep(SLEEP_BETWEEN_REQUESTS)

    with OUTPUT_FILE.open("w", encoding="utf-8") as output:
        for index, title, publication, date, doi, text in downloaded_texts:
            output.write("=" * 80 + "\n")
            output.write(f"Index: {index}\n")
            output.write(f"Title: {title}\n")
            output.write(f"Publication: {publication}\n")
            output.write(f"Date: {date}\n")
            output.write(f"DOI: {doi}\n")
            output.write("=" * 80 + "\n\n")
            output.write(text)
            output.write("\n\n")

    pd.DataFrame(
        [
            {
                "file": f"paper_{index + 1}.txt",
                "doi": doi,
                "status": status,
                "path": file_path,
            }
            for index, doi, status, file_path in statuses
        ]
    ).to_csv(STATUS_FILE, index=False)

    print(f"Saved final text output to {OUTPUT_FILE}")
    print(f"Saved scrape status to {STATUS_FILE}")


if __name__ == "__main__":
    scrape_all()
