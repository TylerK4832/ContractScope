import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Layout: React.FC = () => {
    const [leftPaneActive, setLeftPaneActive] = useState(0);
    const [rightPaneActive, setRightPaneActive] = useState(0);

    const handleLeftPaneChange = (evt: React.SyntheticEvent<Element, Event>, idx: number) =>
        setLeftPaneActive(idx);
    const handleRightPaneChange = (evt: React.SyntheticEvent<Element, Event>, idx: number) =>
        setRightPaneActive(idx);

    return (
        <Container sx={{ py: 4 }}>
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <Item>Table</Item>
                </Grid>
                <Grid xs={8}>
                    <Item>
                        <Tabs value={leftPaneActive} onChange={handleLeftPaneChange}>
                            <Tab label='Analysis 1' value={0} />
                            <Tab label='Analysis 2' value={1} />
                            <Tab label='Analysis 3' value={2} />
                        </Tabs>
                    </Item>
                </Grid>
                <Grid xs={4}>
                <Item>
                        <Tabs value={rightPaneActive} onChange={handleRightPaneChange}>
                            <Tab label='Analysis 1' value={0} />
                            <Tab label='Analysis 2' value={1} />
                        </Tabs>
                    </Item>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Layout;
