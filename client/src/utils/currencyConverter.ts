const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export const numToUsd = (num: number): string => {
    return currencyFormatter.format(num);
}

export const usdToNum = (usd: string): number => {
    return Number(usd.replace(/[^0-9.-]+/g,""));
}