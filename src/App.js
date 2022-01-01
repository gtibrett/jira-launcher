import {Box} from '@mui/material';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Extension from './pages/Extension';
import Options from './pages/Options';

function App() {
	return (
		<Box width={400} minHeight={200} p={3}>
			<BrowserRouter>
				<Routes>
					<Route path="?options" element={<Options/>} exact/>
					<Route path="/options" element={<Options/>} exact/>
					<Route path="/*" element={<Extension/>}/>
				</Routes>
			</BrowserRouter>
		</Box>
	);
}

export default App;
