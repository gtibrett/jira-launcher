/*global chrome*/
import {faSlidersH} from '@fortawesome/pro-solid-svg-icons';
import {Button, Grid, InputAdornment, TextField} from '@mui/material';
import {useEffect, useState} from 'react';
import Header from '../components/Header';

const Extension = () => {
	const [state, setState] = useState({
		key:      '',
		jql:      '',
		instance: '',
		project:  ''
	});
	
	useEffect(() => {
		chrome.storage.sync.get(['jiraInstance', 'project'], function (data) {
			const {jiraInstance: instance = '', project = ''} = data;
			
			setState(s => ({
				...s,
				instance,
				project
			}));
		});
	}, []);
	
	const handleChange = prop => (ev) => {
		setState({
			...state,
			[prop]: ev.target.value
		});
	};
	
	const handleKey = (ev) => {
		ev.preventDefault();
		
		let {key} = state;
		if (key.indexOf('-') === -1) {
			key = state.project + '-' + key;
		}
		
		window.open('https://' + state.instance + '/browse/' + key);
	};
	
	const handleSearch = (ev) => {
		ev.preventDefault();
		
		window.open('https://' + state.instance + '/issues/?jql=' + state.jql);
	};
	
	return <>
		<Header title="Jira Quick Launcher" icon={faSlidersH} link="/options"/>
		
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<form onSubmit={handleKey}>
					<TextField
						label="Open an issue"
						variant="outlined"
						fullWidth
						autoFocus
						
						placeholder="XYZ-123"
						value={state.key}
						onChange={handleChange('key')}
						InputProps={{
							endAdornment:
								<InputAdornment position="end">
									<Button variant="contained" onSubmit={handleKey}>Go</Button>
								</InputAdornment>
						}}
					/>
				</form>
			</Grid>
			
			<Grid item xs={12}>
				<form onSubmit={handleSearch}>
					<TextField
						label="Search"
						variant="outlined"
						fullWidth
						
						placeholder="JQL"
						value={state.jql}
						onChange={handleChange('jql')}
						InputProps={{
							endAdornment:
								<InputAdornment position="end">
									<Button variant="contained" onSubmit={handleSearch}>Go</Button>
								</InputAdornment>
						}}
					/>
				</form>
			</Grid>
		</Grid>
	
	</>;
};

export default Extension;