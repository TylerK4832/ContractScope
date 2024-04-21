import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import Leaderboard from './Leaderboard';
import MapComponent from './MapComponent';
import Table from './Table';
import TimeSeries from './TimeSeries';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Layout: React.FC = () => {
    const [leftPaneActive, setLeftPaneActive] = useState('0');
    const [rightPaneActive, setRightPaneActive] = useState('0');
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleLeftPaneChange = (evt: React.SyntheticEvent<Element, Event>, idx: string) =>
        setLeftPaneActive(idx);
    const handleRightPaneChange = (evt: React.SyntheticEvent<Element, Event>, idx: string) =>
        setRightPaneActive(idx);

    return (
        <Container sx={{ py: 1 }}>
            <Grid container spacing={2}>
                <Grid xs={12} height={isCollapsed ? '35vh' : '75vh'} sx={{ position: 'relative' }}>
                    <Item>
                        <Table isCollapsed={isCollapsed} />
                    </Item>
                    <Button
                        variant='outlined'
                        color='secondary'
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        sx={{
                            position: 'absolute',
                            bottom: '2.35em',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontSize: 12,
                        }}
                    >
                        {isCollapsed ? 'Expand Table' : 'Collapse Table'}
                    </Button>
                </Grid>
                <Grid xs={8} height='60vh'>
                    <Item>
                        <TabContext value={leftPaneActive}>
                            <TabList onChange={handleLeftPaneChange} centered>
                                <Tab label='Spending' value='0' />
                                <Tab label='Map' value='1' />
                            </TabList>
                            <TabPanel
                                value='0'
                                sx={{
                                    display: leftPaneActive === '0' ? 'flex' : 'none',
                                    alignContent: 'center',
                                    height: '50vh',
                                    p: 0
                                }}
                            >
                                <TimeSeries />
                            </TabPanel>
                            <TabPanel value='1' sx={{ height: '50vh', p: 0, pt: 0.25 }}>
                                <MapComponent />
                            </TabPanel>
                        </TabContext>
                    </Item>
                </Grid>
                <Grid xs={4} height='60vh'>
                    <Item>
                        <TabContext value={rightPaneActive}>
                            <TabList onChange={handleRightPaneChange} centered>
                                <Tab label='Funding Distribution' value='0' />
                            </TabList>
                            <TabPanel value='0' sx={{ p: 0 }}>
                                <Leaderboard />
                            </TabPanel>
                        </TabContext>
                    </Item>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Layout;
