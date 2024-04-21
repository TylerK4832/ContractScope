import { LineChart } from '@mui/x-charts';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { Contract } from '../../types';
import { usdToNum } from '../utils/currencyConverter';

interface IProps {
    data: Contract[];
}

const TimeSeries: React.FC<IProps> = (props) => {
    const dateToAmountAwarded: { [date: string]: number } = {};
    for (let contract of props.data) {
        let contract_date;
        try {
            contract_date = new Date(contract.completionDate).getUTCFullYear();

            if (isNaN(contract_date)) continue;
        }
        catch {
            continue;
        }

        // If the date already exists in the hash map, increment its value by the amount awarded
        if (dateToAmountAwarded[contract_date]) {
            dateToAmountAwarded[contract_date] += usdToNum(contract.amountAwarded);
        } else {
            // If the date does not exist in the hash map, initialize it with the amount awarded
            dateToAmountAwarded[contract_date] = usdToNum(contract.amountAwarded);
        }
    }

    const dateToAmountAwardedSorted = Object.fromEntries(
        Object.entries(dateToAmountAwarded).sort((a, b) => parseInt(a[0]) - parseInt(b[0])).filter(([key, _]) => parseInt(key) >= 2000)
    );
    const keys = Object.keys(dateToAmountAwardedSorted)
    const values = Object.values(dateToAmountAwardedSorted).map((v) => v / 1e9);

    return (
        <LineChart
            xAxis={[
                {
                    data: keys,
                    scaleType: 'band',
                    label: 'Year Of Completion (2000s)',
                },
            ]}
            yAxis={[
                {
                    label: 'Amount in Dollars (in Billions)',
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
                    transform: 'translateX(-65px)',
                },
            }}
            margin={{ top: 5, right: 5, bottom: 80, left: 125 }}
        />
    );
};

export default TimeSeries;
