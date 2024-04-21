import List from '@mui/material/List/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Contract } from '../../types';
import { usdToNum } from '../utils/currencyConverter';

interface IProps {
    data: Contract[];
}

const Leaderboard: React.FC<IProps> = (props) => {
    const [leaderboard, setLeaderboard] = useState<
        { awardedCompany: string; awardedAmount: number }[]
    >([]);

    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    useEffect(() => {
        const calcLeaderboard = () => {
            const common_contractors = [
                'BAE Systems',
                'Lockheed Martin',
                'Raytheon',
                'General Dynamics',
                'Northrop Grumman',
                'Boeing',
                'Pfizer'
            ];
            const groups: { [key: string]: number } = {};

            for (let c of common_contractors) {
                groups[c] = 0;
            }

            for (let row of props.data) {
                let grouped = false;
                for (let c of common_contractors) {
                    if (row.companyName.includes(c)) {
                        groups[c] += usdToNum(row.amountAwarded);
                        grouped = true;
                    }
                }
                if (!grouped) {
                    if (row.companyName in groups) {
                        groups[row.companyName] += usdToNum(row.amountAwarded);
                    } else {
                        groups[row.companyName] = usdToNum(row.amountAwarded);
                    }
                }
            }

            let res: { awardedCompany: string; awardedAmount: number }[] = [];
            for (let key in groups) {
                res.push({ awardedCompany: key, awardedAmount: groups[key] });
            }

            res = res.sort((a, b) => b.awardedAmount - a.awardedAmount).slice(0, 5);

            setLeaderboard(res);
        };

        calcLeaderboard();
    }, [props.data]);

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', height: '50vh' }}>
            {leaderboard.map((entry, idx) => (
                <ListItem alignItems='flex-start' key={idx} sx={{ py: 0 }}>
                    <ListItemIcon>
                        <Typography variant='body1' fontSize={20}>
                            {idx + 1}
                        </Typography>
                    </ListItemIcon>
                    <ListItemText
                        primary={entry.awardedCompany}
                        sx={{ fontSize: '14px !important' }}
                        secondary={
                            <Typography
                                sx={{ display: 'inline' }}
                                component='span'
                                variant='body2'
                                color='text.primary'
                                fontSize={13}
                            >
                                {currencyFormatter.format(entry.awardedAmount)}
                            </Typography>
                        }
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default Leaderboard;
