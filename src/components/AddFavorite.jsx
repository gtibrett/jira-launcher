/*global chrome*/
import {Button, Dialog, DialogActions, DialogContent, Grid, TextField} from '@mui/material';
import {useEffect, useState} from 'react';

export function saveFavorite(name, url, type) {
	chrome.storage.sync.get(['favorites'], function (data) {
		const {favorites = []} = data;
		chrome.storage.sync.set({
			favorites: [
				...favorites,
				{name, url, type}
			]
		});
	});
}

const AddFavorite = ({jql, open, setOpen}) => {
	const [state, setState] = useState({
		name:     '',
		instance: ''
	});
	
	useEffect(() => {
		chrome.storage.sync.get(['jiraInstance'], function (data) {
			const {jiraInstance: instance = ''} = data;
			
			setState(s => ({
				...s,
				instance
			}));
		});
		
		return function () {
			setState(s => ({
				...s,
				name: ''
			}));
		};
	}, []);
	
	const handleChange = prop => (ev) => {
		setState({
			...state,
			[prop]: ev.target.value
		});
	};
	
	const handleSave = (ev) => {
		ev.preventDefault();
		
		const url = 'https://' + state.instance + '/issues/?jql=' + jql;
		
		saveFavorite(state.name, url, 'search');
		setOpen(false);
	};
	
	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<form onSubmit={handleSave}>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								fullWidth
								label="Name"
								autoFocus
								
								id="name"
								value={state.name}
								onChange={handleChange('name')}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								fullWidth
								label="JQL"
								disabled
								
								id="jql"
								value={jql}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button type="submit" size="small" color="primary" onClick={handleSave}>Save</Button>
					<Button size="small" color="inherit" onClick={() => setOpen(false)}>Cancel</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default AddFavorite;