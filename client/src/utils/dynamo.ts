import AWS from 'aws-sdk';
import { Contract, RawContract } from '../../types';

// Configure AWS
AWS.config.update({
  region: process.env.REACT_APP_AWS_DEFAULT_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
});

// Create DynamoDB service object
const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: 'FinalContracts',
  // Add any conditions or filters here if needed
};

export const getDataFromDB = async (): Promise<Contract[]> => {
  let allContracts: Contract[] = [];
  let lastEvaluatedKey: AWS.DynamoDB.Key | undefined = undefined;

  do {
    const result: AWS.DynamoDB.DocumentClient.ScanOutput = await scanWithPagination(params, lastEvaluatedKey);
    const processed = processData(result.Items);
    allContracts = allContracts.concat(processed);
    lastEvaluatedKey = result.LastEvaluatedKey;
  } while (lastEvaluatedKey);

  return allContracts;
}

const scanWithPagination = async (params: AWS.DynamoDB.DocumentClient.ScanInput, lastEvaluatedKey?: AWS.DynamoDB.Key): Promise<AWS.DynamoDB.DocumentClient.ScanOutput> => {
  if (lastEvaluatedKey) {
    params.ExclusiveStartKey = lastEvaluatedKey;
  }

  return dynamodb.scan(params).promise();
}

const processData = (items?: AWS.DynamoDB.DocumentClient.ItemList): Contract[] => {
  const contracts: Contract[] = [];

  if (!items) return contracts;

  for (const item of items) {
    const results = cleaner(item.contracts.L as RawContract[]);
    contracts.push(...results);
  }

  return contracts;
}

const cleaner = (rawRows: RawContract[]): Contract[] => {
  return rawRows.map((r) => ({
    id: Math.random().toFixed(10).toString(),
    workLocation: r.M.workLocation.S,
    amountAwarded: formatAmountAwarded(r.M.amountAwarded.S),
    contractingActivity: r.M.contractingActivity.S,
    awardedFor: r.M.awardedFor.S,
    contractType: r.M.contractType.S,
    companyName: r.M.companyName.S,
    contractNumber: r.M.contractNumber.S,
    completionDate: formatDate(r.M.completionDate.S),
  }));
}

const formatAmountAwarded = (amount: string): string => {
    if (amount.includes("and"))
        return amount.split("and")[0];
    return amount;
}

const formatDate = (datestr: string): string => {
  datestr = datestr.replace(/fiscal/ig, 'Jan.');

  const parts = datestr.split(' ');

  if (parts.length === 1) {
    return `Jan. 1 ${parts[0]}`;
  } else if (parts.length === 2) {
    return `${parts[0]} 1, ${parts[1]}`
  } else if (parts.length > 3) {
    return `${parts[0]} ${parts[1]}, ${parts[2]}`;
  }

  return datestr;
}
