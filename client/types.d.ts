export interface Contract {
    id: string;
    context: string;
    date: Date;
    awardedCompany: string;
    awardedCompanyLocation: string;
    amountAwarded: number;
    awardedFor: string;
    workLocation: string;
    expectedCompletionDate: Date;
    contractingActivityGroup: string;
    activityGroupLocation: string;
    activityCode: string;
    contractType: string;
    isModification: boolean;
  }