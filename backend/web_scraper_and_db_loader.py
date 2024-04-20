import requests
from bs4 import BeautifulSoup
from datetime import datetime
import re
import os
from dotenv import load_dotenv
load_dotenv()  
import os
import boto3

# Code for initializing a DynamoDB database named Contracts and filling it with the date and the raw text of the contracts
# FORMAT: {DDMMYY: Set of the contract paragraphs}

access_key = os.getenv('AWS_ACCESS_KEY_ID')
secret_key = os.getenv('AWS_SECRET_ACCESS_KEY')
region= os.getenv('AWS_DEFAULT_REGION')
dynamodb = boto3.client(
    'dynamodb',
    aws_access_key_id=access_key,
    aws_secret_access_key=secret_key,
    region_name=region
)

# Method to create DynamoDB table for Contracts (Key is Date, Values is Set of Contracts)
def create_table():
    existing_tables = dynamodb.list_tables()['TableNames']
    if 'Contracts' in existing_tables:
        dynamodb_resource = boto3.resource(
        'dynamodb', 
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        region_name=region)
        return dynamodb_resource.Table('Contracts')
    table = dynamodb.create_table(
        TableName='Contracts',
        KeySchema=[
            {
                'AttributeName': 'id',
                'KeyType': 'HASH' 
            }
        ],
        AttributeDefinitions=[
            {
                'AttributeName': 'id',
                'AttributeType': 'S' 
            }
        ],
        ProvisionedThroughput={
            'ReadCapacityUnits': 10,
            'WriteCapacityUnits': 10
        }
    )
    return table

# Grab the links to detailing all of the contracts
def scrape_web_links(filename='contract_links.txt'):
    base_url = "https://www.defense.gov/News/Contracts/?Page={}"
    links = set()

    def scrape_contract_links(page_number):
        nonlocal links
        page_content = requests.get(base_url.format(page_number)).text
        url_pattern = r'https://www\.defense\.gov/News/Contracts/Contract/Article/\d+/'
        urls = re.findall(url_pattern, page_content)
        links.update(urls)

    if not os.path.exists(filename):
        for i in range(1, 246):  # Scraping pages 1 through 245
            scrape_contract_links(i)
        
        # Write the links to a text file
        with open(filename, 'w') as file:
            for link in sorted(links):
                file.write(link + '\n')
    else:
        # If the file exists, read the links
        with open(filename, 'r') as file:
            links = file.readlines()
            links =[s.rstrip('\n') for s in links]

    return links

# Get date into 'MMDDYY' format
def parse_date(title):
    date_match = re.search(r'(\w{3,})\.?\s+(\d{1,2}),\s+(\d{4})', title)
    if date_match:
        month = date_match.group(1)
        # Check if the month is abbreviated by length and if it contains a period
        if len(month) > 3 and '.' in month:
            # Abbreviated month with a period, remove the period
            month = month.replace('.', '')
        elif len(month) > 3:
            # Full month name, abbreviate it to three characters
            month = month[:3]
        
        day = date_match.group(2)
        year = date_match.group(3)
        
        # Construct the date string
        date_str = f"{month} {day} {year}"

        # Parse the date string into a datetime object using strptime, which can handle both full and abbreviated month names
        date_obj = datetime.strptime(date_str, '%b %d %Y')
        
        # Format the date as MMDDYY
        formatted_date = date_obj.strftime('%m%d%y')
        return formatted_date
    else:
        raise Exception("Can't parse date; aborting")

# Scrape the date and contract info and place it into DynamoDB table
def scrape_text_and_add_to_database(link):
    page_content = requests.get(link).text
    soup = BeautifulSoup(page_content, 'html.parser')
    p_elements = soup.find_all('p', style=False)
    if soup.find('h1', class_='maintitle') is None:
        print("This has no title (probably empty) skip me")
        return 
    title = soup.find('h1', class_='maintitle').get_text(strip=True)
    date = parse_date(title)
    p_texts = [' '.join(p.get_text(strip=True).split()) for p in p_elements if len(p.get_text(strip=True).split()) > 20]
    if not p_texts:
        print(str(date) + " has weird formatting skip me")
        return 
    response = table.put_item(
    Item={
        'id': date,
        'texts': set(p_texts)
    }
    )
    if response['ResponseMetadata']['HTTPStatusCode'] != 200:
        print("Unable to insert: " + str(date) + " into our database")
    
table = create_table()
links = scrape_web_links()

for i in range(0, len(links)):
    scrape_text_and_add_to_database(links[i])
  



