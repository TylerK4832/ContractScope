import requests
import json
import os
import re
from dotenv import load_dotenv
import boto3
from concurrent.futures import ThreadPoolExecutor
import threading
load_dotenv()  

# Define the URL
url = "https://xgoth4mou0.execute-api.us-east-2.amazonaws.com/test/infercontract"

access_key = os.getenv('AWS_ACCESS_KEY_ID')
secret_key = os.getenv('AWS_SECRET_ACCESS_KEY')
region= os.getenv('AWS_DEFAULT_REGION')
dynamodb = boto3.client(
    'dynamodb',
    aws_access_key_id=access_key,
    aws_secret_access_key=secret_key,
    region_name=region
)

def create_table():
    existing_tables = dynamodb.list_tables()['TableNames']
    if 'FinalContracts' in existing_tables:
        dynamodb_resource = boto3.resource(
        'dynamodb', 
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        region_name=region)
        return dynamodb_resource.Table('FinalContracts')
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
            'ReadCapacityUnits': 100,
            'WriteCapacityUnits': 100
        }
    )
    return table

def get_trained_output(context):
    input_data = {
        "inputs": [
            {
                "question": "What is the company that was awarded the contract?",
                "context": context
            },
            {
                "question": "Where will the work be performed?",
                "context": context
            },
            {
                "question": "What is the amount awarded?",
                "context": context
            },
            {
                "question": "What is the contract awarded for?",
                "context": context
            },
            {
                "question": "When is the contract expected to be completed by?",
                "context": context
            },
            {
                "question": "What is the contracting activity?",
                "context": context
            },
            {
                "question": "What is the type of contract?",
                "context": context
            },
            {
                "question": "What is the contract number?",
                "context": context
            },
            {
                "question": "Is this a modification to a previous contract?",
                "context": context
            },
        ]
    }

    payload = json.dumps(input_data)
    headers = {
        "Content-Type": "application/json"
    }
    response = requests.post(url, data=payload, headers=headers)
    response = response.json()
    extracted_answers = [entry["answer"] for entry in response]
    field_names = ["companyName", "workLocation", "amountAwarded", "awardedFor", "completionDate", "contractingActivity", "contractType", "contractNumber"]
    data_to_insert = {field_names[i]: extracted_answers[i] for i in range(len(field_names))}
    return data_to_insert

def process_contracts(date, string_of_texts):
    curr = []
    for contract in string_of_texts:
        output = get_trained_output(contract)
        if output['companyName'] != '' and output['amountAwarded'] != '':
            curr.append(output)
    formatted = [{'M': {key: {'S': value} for key, value in contract.items()}} for contract in curr]
    data_to_insert = {
        'id': {'S': date},
        'contracts': {'L': formatted}
    }
    response = dynamodb.put_item(
        TableName='FinalContracts',
        Item=data_to_insert
    )

def readAndProcessAllOutput():
    response = dynamodb.scan(TableName="Contracts")
    items = response['Items']
    while 'LastEvaluatedKey' in response:
        response = dynamodb.scan(TableName="Contracts", ExclusiveStartKey=response['LastEvaluatedKey'])
        items.extend(response['Items'])

    # Create a ThreadPoolExecutor
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = []
        for item in items:
            date = item['id']['S']
            string_of_texts = item['texts']['SS']
            # Submit tasks to the executor
            futures.append(executor.submit(process_contracts, date, string_of_texts))
        
        # Wait for all futures to complete
        for future in futures:
            future.result()  # Getting the result to handle exceptions

create_table()
readAndProcessAllOutput()