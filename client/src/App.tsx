import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import Layout from './components/Layout';

interface IProps {}

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const App: React.FC<IProps> = (props) => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {/* Add project code beneath the baseline */}
                <Layout />
            </ThemeProvider>
        </>
    );
};

export default App;
