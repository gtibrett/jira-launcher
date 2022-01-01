/*global chrome*/
import {faBookmark} from '@fortawesome/pro-solid-svg-icons';
import {faSearch, faBug} from '@fortawesome/pro-light-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Chip, Grid, Typography} from '@mui/material';
import {useEffect, useState} from 'react';

const getIcon = (type) => {
	switch (type) {
		case 'ticket':
			return <FontAwesomeIcon icon={faBug} transform="shrink-4" fixedWidth/>;
		
		case 'search':
			return <FontAwesomeIcon icon={faSearch} transform="shrink-4" fixedWidth/>;
		
		default:
			return undefined;
	}
};

const getColor = (type) => {
	switch (type) {
		case 'ticket':
			return 'primary';
		
		case 'search':
			return 'secondary';
		
		default:
			return undefined;
	}
};

const Favorites = () => {
	const [state, setState] = useState({
		favorites: []
	});
	
	useEffect(() => {
		const storageListener = () => {
			chrome.storage.sync.get(['favorites'], function (data) {
				const {favorites = []} = data;
				
				setState({
					favorites
				});
			});
		};
		
		chrome.storage.onChanged.addListener(storageListener);
		
		storageListener();
		
		return () => chrome.storage.onChanged.removeListener(storageListener);
	}, []);
	
	const handleLink = url => (ev) => {
		ev.preventDefault();
		window.open(url);
	};
	
	const handleDelete = (name, url) => (ev) => {
		ev.preventDefault();
		
		const {favorites = []} = state;
		const index            = favorites.findIndex(favorite => {
			return favorite.name === name && favorite.url === url;
		});
		
		if (index >= 0) {
			favorites.splice(index, 1);
			chrome.storage.sync.set({favorites});
		}
	};
	
	return (
		<Grid container spacing={1} alignItems="center">
			<Grid item xs={12}>
				<Typography variant="caption"><FontAwesomeIcon icon={faBookmark} fixedWidth/> Favorites</Typography>
				{state.favorites.length === 0 && <Typography color="secondary" variant="caption"> - none saved</Typography>}
			</Grid>
			
			{state.favorites.map(({name, url, type}) => (
				<Grid item key={name}>
					<Chip variant="outlined" icon={getIcon(type)} color={getColor(type)} size="small" onDelete={handleDelete(name, url)} onClick={handleLink(url)} label={name}/>
				</Grid>
			))}
		</Grid>
	);
};

export default Favorites;