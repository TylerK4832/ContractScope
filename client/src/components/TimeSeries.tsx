// import * as React from "react";
import { LineChart } from '@mui/x-charts';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import rows from '../utils/rows';

const TimeSeries = () => {
    const dateToAmountAwarded: { [date: string]: number } = {};

    rows.forEach((contract) => {
        let contract_date = contract.date.toISOString();
        // If the date already exists in the hash map, increment its value by the amount awarded
        if (dateToAmountAwarded[contract_date]) {
            dateToAmountAwarded[contract_date] += contract.amountAwarded;
        } else {
            // If the date does not exist in the hash map, initialize it with the amount awarded
            dateToAmountAwarded[contract_date] = contract.amountAwarded;
        }
    });

    const keys = Object.keys(dateToAmountAwarded).sort();
    const keys_dated = keys.map((k) => new Date(k));
    const values = keys_dated.map((k) => dateToAmountAwarded[k.toISOString()] / 1000000);

    return (
        <LineChart
            xAxis={[
                {
                    data: keys_dated,
                    scaleType: 'time',
                    label: 'Year',
                },
            ]}
            yAxis={[
                {
                    label: 'Amount in Dollars (in Millions)',
                },
            ]}
            series={[
                {
                    data: values,
                },
            ]}
            sx={{
                [`.${axisClasses.left} .${axisClasses.label}`]: {
                    // Move the y-axis label with CSS
                    transform: 'translateX(-10px)',
                },
            }}
            margin={{ top: 5, right: 5, bottom: 80, left: 55 }}
        />
    );
};

export default TimeSeries;
