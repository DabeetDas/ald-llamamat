from scrape import get_responses
from doi2pdf import save2pdf,check_availability
from tqdm import tqdm
import time


references,processes = get_responses()


for reference in tqdm(references[:100]):
    doi = reference["reference_doi"]
    save2pdf(doi)

'''
---------
22 papers available on elsevier from first 100
TO SELF: CHECK UNPAYWALL API
https://unpaywall.org/products/api
1276 papers are available on elsevier api
---------
'''