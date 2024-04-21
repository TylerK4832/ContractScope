import { Contract, RawContract } from '../../types';

const rawRows: RawContract[] = [
    {
        M: {
            workLocation: { S: 'Mobile, Alabama' },
            amountAwarded: { S: '$8,698,054' },
            contractingActivity: { S: 'The Navy’s Military Sealift Command' },
            awardedFor: {
                S: 'a 75-calendar day shipyard availability for the mid-term availability',
            },
            contractType: { S: 'firm-fixed-price' },
            companyName: { S: 'Alabama Shipyard LLC' },
            contractNumber: { S: 'N3220522C4019' },
            completionDate: { S: 'Oct. 12, 2022' },
        },
    },
];

const cleaner = (rawRows: RawContract[]) => { 
    return rawRows.map((r) => ({
            id: Math.random().toFixed(10).toString(),
            workLocation: r.M.workLocation.S,
            amountAwarded: r.M.amountAwarded.S,
            contractingActivity: r.M.contractingActivity.S,
            awardedFor: r.M.awardedFor.S,
            contractType: r.M.contractType.S,
            companyName: r.M.companyName.S,
            contractNumber: r.M.contractNumber.S,
            completionDate: r.M.completionDate.S,
        }));
}

export const rows: Contract[] = cleaner(rawRows);

