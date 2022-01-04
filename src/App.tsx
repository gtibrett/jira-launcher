import {Box, createTheme, CssBaseline, ThemeProvider, useMediaQuery} from '@mui/material';
import {blue, blueGrey} from '@mui/material/colors';
import Extension from './pages/Extension';
import {useMemo} from "react";

function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                    primary: {
                        main: blue[prefersDarkMode ? 200 : 800]
                    },
                    secondary: {
                        main: blueGrey[prefersDarkMode ? 200 : 700]
                    },
                    grey: {
                        ...blueGrey
                    },
                    background: prefersDarkMode ? {
                        default: blueGrey[800],
                        paper: blueGrey[900]
                    } : {}
                },
            }),
        [prefersDarkMode],
    );

    return <>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Box width={400} minHeight={200} px={2} pt={2}>
                <Extension/>
            </Box>
        </ThemeProvider>
    </>;
}

export default App;
