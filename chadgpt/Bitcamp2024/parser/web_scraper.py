import requests
from bs4 import BeautifulSoup

def scrape(url: str) -> str:
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")

    contracts = []
    contract_date = soup.find("h1", class_="maintitle").get_text(strip=True)
    contracts.append(contract_date)

    contract_div = soup.find("div", class_="body")
    for p in contract_div.find_all("p"):
        strong_tag = p.find("strong")
        if strong_tag:
            current_agency = strong_tag.text.strip()
            contracts.append(f"AGENCY: {current_agency}")
        else:
            # Process the contract details
            contracts.append(p.text.strip())

    return "\n\n".join(contracts)

url = "https://www.defense.gov/News/Contracts/Contract/Article/3749216/"
scrape(url)
