export interface RawContract {
    M: {
        workLocation: { S: string };
        amountAwarded: { S: string };
        contractingActivity: { S: string };
        awardedFor: { S: string };
        contractType: { S: string };
        companyName: { S: string };
        contractNumber: { S: string };
        completionDate: { S: string };
    };

}

export interface Contract {
    id: string;
    workLocation: string;
    amountAwarded: string;
    contractingActivity: string;
    awardedFor: string;
    contractType: string;
    companyName: string;
    contractNumber: string;
    completionDate: string;
}

// export interface Contract {
//     id: string;
//     context: string;
//     date: Date;
//     awardedCompany: string;
//     awardedCompanyLocation: string;
//     amountAwarded: number;
//     awardedFor: string;
//     workLocation: string;
//     expectedCompletionDate: Date;
//     contractingActivityGroup: string;
//     activityGroupLocation: string;
//     activityCode: string;
//     contractType: string;
//     isModification: boolean;
//   }