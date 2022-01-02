import {Box, createTheme, ThemeProvider} from '@mui/material';
import {blue, blueGrey} from '@mui/material/colors';
import Extension from './pages/Extension';

const theme = createTheme({
	palette: {
		primary:   {
			main: blue[800]
		},
		secondary: {
			main: blueGrey[600]
		}
	}
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Box width={400} minHeight={200} p={3}>
				<Extension/>
			</Box>
		</ThemeProvider>
	);
}

export default App;
