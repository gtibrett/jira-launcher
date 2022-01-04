import {faBookmark} from '@fortawesome/pro-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Button, Divider, Grid, IconButton, IconButtonProps, InputAdornment, TextField, Tooltip, useTheme} from '@mui/material';
import {ChangeEvent, SyntheticEvent, useEffect, useState} from 'react';
import AddFavorite, {saveFavorite} from '../components/AddFavorite';
import Favorites from '../components/Favorites';
import Header from '../components/Header';
import {faBug, faSearch} from "@fortawesome/pro-light-svg-icons";

type SaveToFavoritesButtonProps = {
    onClick: IconButtonProps['onClick'];
    color?: IconButtonProps['color'];
}

const SaveToFavoritesButton = ({onClick, color = 'primary'}: SaveToFavoritesButtonProps) => (
    <Tooltip arrow title="Save to favorites">
        <IconButton size="small" color={color} onClick={onClick}>
            <FontAwesomeIcon icon={faBookmark} fixedWidth/>
        </IconButton>
    </Tooltip>
);

const Extension = () => {
    const theme = useTheme();
    const [state, setState] = useState({
        key: '',
        jql: '',
        instance: '',
        project: ''
    });

    const [open, setOpen] = useState(false);

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

    // watch for open to flip to false, then sets jql back to ''
    useEffect(() => {
        if (!open) {
            setState(s => ({
                ...s,
                jql: ''
            }));
        }
    }, [open]);

    const handleChange = (prop: string) => (ev: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [prop]: ev.target.value
        });
    };

    const handleKey = (ev: SyntheticEvent) => {
        ev.preventDefault();

        let {key} = state;
        if (key.indexOf('-') === -1) {
            key = state.project + '-' + key;
        }

        window.open('https://' + state.instance + '/browse/' + key);
    };

    const saveKey = (ev: SyntheticEvent) => {
        ev.preventDefault();

        let {key} = state;
        if (key.indexOf('-') === -1) {
            key = state.project + '-' + key;
        }

        saveFavorite(key, 'https://' + state.instance + '/browse/' + key, 'ticket');
        setState({
            ...state,
            key: ''
        });
    };

    const handleSearch = (ev: SyntheticEvent) => {
        ev.preventDefault();

        window.open('https://' + state.instance + '/issues/?jql=' + state.jql);
    };

    const saveSearch = (ev: SyntheticEvent) => {
        ev.preventDefault();
        setOpen(true);
    };

    return <>
        <Header title="Jira Quick Launcher"/>

        <Grid container spacing={3}>
            <Grid item xs={12} container spacing={1} alignItems="center">
                <Grid item xs>
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
                                startAdornment: <InputAdornment position="start">
                                    <FontAwesomeIcon icon={faBug} color={theme.palette.primary.main} role="presentation"/>
                                </InputAdornment>,
                                endAdornment: <InputAdornment position="end">
                                    <Button size="small" color="primary" onClick={handleKey}>Go</Button>
                                </InputAdornment>
                            }}
                        />
                    </form>
                </Grid>
                <Grid item>
                    <SaveToFavoritesButton onClick={saveKey}/>
                </Grid>
            </Grid>


            <Grid item xs={12} container spacing={1} alignItems="center">
                <Grid item xs>
                    <form onSubmit={handleSearch}>
                        <TextField
                            label="Search"
                            variant="outlined"
                            fullWidth

                            placeholder="JQL"
                            value={state.jql}
                            onChange={handleChange('jql')}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">
                                    <FontAwesomeIcon icon={faSearch} color={theme.palette.secondary.main} role="presentation"/>
                                </InputAdornment>,
                                endAdornment: <InputAdornment position="end">
                                    <Button size="small" color="primary" onClick={handleSearch}>Go</Button>
                                </InputAdornment>
                            }}
                        />
                    </form>
                </Grid>
                <Grid item>
                    <SaveToFavoritesButton onClick={saveSearch} color="secondary"/>
                </Grid>
            </Grid>
        </Grid>
        <Divider sx={{marginTop: 2, marginBottom: 2, marginLeft: -4, marginRight: -4}}/>
        <Favorites/>

        <AddFavorite jql={state.jql} open={open} setOpen={setOpen}/>
    </>;
};

export default Extension;