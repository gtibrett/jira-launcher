import {Button, Dialog, DialogActions, DialogContent, Grid, TextField} from '@mui/material';
import {ChangeEvent, SyntheticEvent, useEffect, useState} from 'react';
import {Favorite} from "../types";

export function saveFavorite(name: string, url: string, type?: string) {
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

type AddFavoriteProps = {
    jql: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}

type AddFavoriteState = {
    name: Favorite['name'];
    instance: string;
}

const AddFavorite = ({jql, open, setOpen}: AddFavoriteProps) => {
    const [state, setState] = useState<AddFavoriteState>({
        name: '',
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

    useEffect(() => {
        if (open) {
            setState(s => ({
                ...s,
                name: ''
            }));
        }
    }, [open]);

    const handleChange = (prop: string) => (ev: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [prop]: ev.target.value
        });
    };

    const handleSave = (ev: SyntheticEvent) => {
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