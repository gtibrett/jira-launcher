/*global chrome*/
import {faArrowTurnDownLeft} from '@fortawesome/pro-solid-svg-icons';
import {Button, Grid, InputAdornment, TextField, Typography} from '@mui/material';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import Header from '../components/Header';

const Options = () => {
	const navigate          = useNavigate();
	const [state, setState] = useState({
		instance: '',
		project:  ''
	});
	
	useEffect(() => {
		chrome.storage.sync.get(['jiraInstance', 'project'], function (data) {
			const {jiraInstance: instance = '', project = ''} = data;
			
			setState({
				instance,
				project
			});
		});
	}, []);
	
	const handleChange = prop => (ev) => {
		setState(s => ({
			...s,
			[prop]: ev.target.value
		}));
	};
	
	const handleSave = (ev) => {
		ev.preventDefault();
		
		chrome.storage.sync.set({jiraInstance: state.instance, project: state.project});
		navigate('/');
	};
	
	const handleCancel = (ev) => {
		ev.preventDefault();
		
		navigate('/');
	};
	
	return <>
		<Header title="Options" icon={faArrowTurnDownLeft} link="/"/>
		
		<form onSubmit={handleSave}>
			<Grid container spacing={2} justifyContent="flex-end">
				<Grid item xs={12}>
					<TextField
						variant="outlined"
						fullWidth
						label="Jira Instance"
						InputProps={{
							startAdornment: <InputAdornment position="start">https://</InputAdornment>
						}}
						autoFocus
						
						id="instance"
						value={state.instance}
						onChange={handleChange('instance')}
						placeholder="[site].atlassian.net"
					/>
					<Typography variant="caption">Enter the domain for your Jira Instance. i.e. mysite.atlassian.net</Typography>
				</Grid>
				<Grid item xs={12}>
					<TextField
						variant="outlined"
						fullWidth
						label="Default Project"
						
						id="project"
						value={state.project}
						onChange={handleChange('project')}
						placeholder="ABC"
					/>
				
				</Grid>
				
				<Grid item><Button type="submit" variant="contained" color="primary" onClick={handleSave}>Save</Button></Grid>
				<Grid item><Button variant="contained" color="inherit" onClick={handleCancel}>Cancel</Button></Grid>
			
			</Grid>
		</form>
	</>;
};

export default Options;