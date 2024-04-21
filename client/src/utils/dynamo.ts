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
    return new Promise((resolve, reject) => {
        dynamodb.scan(params, (err, data) => {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                reject(err);
            } else {
                const processed: Contract[] = processData(data);
                resolve(processed);
            }
        });
    });
}

const processData= (data: AWS.DynamoDB.ScanOutput): Contract[] => {
    const contracts: Contract[] = [];

    if (data.Items === undefined) return contracts;

    let count = 0;
    for (let item of data.Items) {

        const results = cleaner(item.contracts.L as RawContract[]);
        contracts.push(...results);
        if (count++ === 20) break;
    }

    return contracts;
}

const cleaner = (rawRows: RawContract[]): Contract[] => { 
    return rawRows.map((r) => ({
            id: Math.random().toFixed(10).toString(),
            workLocation: r.M.workLocation.S,
            amountAwarded: r.M.amountAwarded.S,
            contractingActivity: r.M.contractingActivity.S,
            awardedFor: r.M.awardedFor.S,
            contractType: r.M.contractType.S,
            companyName: r.M.companyName.S,
            contractNumber: r.M.contractNumber.S,
            completionDate: formatDate(r.M.completionDate.S),
        }));
}

const formatDate = (datestr: string): string => {
    datestr = datestr.replace(/fiscal/ig, 'Jan.');

    const parts = datestr.split(' ');

    if (parts.length === 1) {
        return `Jan. 1 ${parts[0]}`;
    }
    else if (parts.length === 2) {
        return `${parts[0]} 1, ${parts[1]}`
    }
    else if (parts.length > 3) {
        return `${parts[0]} ${parts[1]}, ${parts[2]}`;
    }

    return datestr;
}
