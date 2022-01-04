import {faBookmark} from '@fortawesome/pro-solid-svg-icons';
import {faBug, faSearch} from '@fortawesome/pro-light-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Chip, Grid, Typography} from '@mui/material';
import {SyntheticEvent, useEffect, useState} from 'react';
import {Favorite} from "../types";

const getIcon = (type: string | undefined) => {
    switch (type) {
        case 'ticket':
            return <FontAwesomeIcon icon={faBug} transform="shrink-4" fixedWidth/>;

        case 'search':
            return <FontAwesomeIcon icon={faSearch} transform="shrink-4" fixedWidth/>;

        default:
            return undefined;
    }
};

const getColor = (type: string | undefined) => {
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
    const [state, setState] = useState<{ favorites: Favorite[] }>({
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

    const handleLink = (url: string) => (ev: SyntheticEvent) => {
        ev.preventDefault();
        window.open(url);
    };

    const handleDelete = (name: string, url: string) => (ev: SyntheticEvent) => {
        ev.preventDefault();

        const {favorites = []} = state;
        const index = favorites.findIndex(favorite => {
            return favorite.name === name && favorite.url === url;
        });

        if (index >= 0) {
            favorites.splice(index, 1);
            chrome.storage.sync.set({favorites});
        }
    };

    return (
        <Grid container spacing={1} alignItems="center" sx={{paddingBottom: 2}}>
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