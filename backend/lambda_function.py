import json
import requests
from bs4 import BeautifulSoup
from datetime import datetime
import boto3
import re

# Code for our AWS lambda function to gather the most recent date and place it in our database (it is manual; but we could make a CI/CD pipeline)
# Utilize AWS Lambda and EventBridge in order to schedule our lambda to run M-F @ 8 PM EST (1 AM UTC)

dynamodb_client = boto3.client('dynamodb', region_name='us-east-1') 

def check_date_in_contracts(date):
    response = dynamodb_client.query(
        TableName='Contracts',
        KeyConditionExpression='id = :date',
        ExpressionAttributeValues={
            ':date': {'S': date}
        }
    )
    return response['Count'] > 0 

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
        
def get_most_recent_contract():
    # Most recent data will be updated on the /News/Contracts/ 
    link = 'https://www.defense.gov/News/Contracts/'
    page_content = requests.get(link).text
    url_pattern = r'https://www\.defense\.gov/News/Contracts/Contract/Article/\d+/'
    match = re.search(url_pattern, page_content)
    if match:
        return match.group()
    else:
        return None
    
def scrape_text(link):
    page_content = requests.get(link).text
    soup = BeautifulSoup(page_content, 'html.parser')
    p_elements = soup.find_all('p', style=False)
    if soup.find('h1', class_='maintitle') is None:
        return (None, None)
    title = soup.find('h1', class_='maintitle').get_text(strip=True)
    date = parse_date(title)
    p_texts = [' '.join(p.get_text(strip=True).split()) for p in p_elements if len(p.get_text(strip=True).split()) > 20]
    if not p_texts:
        return (str(date), None)
    return (str(date), p_texts)
    


def lambda_handler(event, context):
    most_recent_contract = get_most_recent_contract()
    if most_recent_contract is None:
        return {
        'statusCode': 404,
        'body': json.dumps('Unable to find most recent contract')
        }
    date, contracts = scrape_text(most_recent_contract)

    if (date == None):
        return {
        'statusCode': 404,
        'body': json.dumps('Page has no title (probably empty)')
        }
    elif (contracts == None):
        return {
        'statusCode': 404,
        'body': json.dumps(date + ' has weird formatting; skip me')
        }
        
    if check_date_in_contracts(date) == True:
        return {
        'statusCode': 200,
        'body': json.dumps('No new dates found; trying again tomorrow')
        }
    else:
        dynamodb_resource = boto3.resource('dynamodb', region_name='us-east-1')
        table = dynamodb_resource.Table('Contracts')
        response = table.put_item(
        Item={
            'id': date,
            'texts': set(contracts)
        }
        )
        if response['ResponseMetadata']['HTTPStatusCode'] == 200:
            return {
                'statusCode': 200,
                'body': json.dumps('Successfully parsed and gathered new contract')
            }
        else:
            return {
                'statusCode': 404,
                'body': json.dumps('Unable to insert into database')
            }
        
        
        
        

