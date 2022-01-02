import {faSlidersH} from '@fortawesome/pro-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, TextField, Tooltip, Typography} from '@mui/material';
import {ChangeEvent, SyntheticEvent, useEffect, useState} from 'react';

type OptionsState = {
    instance: string;
    project: string;
}

const Options = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [state, setState] = useState<OptionsState>({
        instance: '',
        project: ''
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

    const handleChange = (prop: string) => (ev: ChangeEvent<HTMLInputElement>) => {
        setState(s => ({
            ...s,
            [prop]: ev.target.value
        }));
    };

    const handleSave = (ev: SyntheticEvent) => {
        ev.preventDefault();

        chrome.storage.sync.set({jiraInstance: state.instance, project: state.project});
        setOpen(false);
    };

    const handleCancel = (ev: SyntheticEvent) => {
        ev.preventDefault();
        setOpen(false);
    };

    return <>
        <Tooltip title="Options" placement="left" arrow>
            <IconButton onClick={() => setOpen(true)}>
                <FontAwesomeIcon icon={faSlidersH} color="#FFF" fixedWidth/>
            </IconButton>
        </Tooltip>
        <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
            <DialogTitle>Options</DialogTitle>
            <form onSubmit={handleSave}>
                <DialogContent dividers>
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
                            <Typography variant="caption">Enter the domain for your Jira Instance. i.e.
                                mysite.atlassian.net</Typography>
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
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" color="primary" onClick={handleSave}>Save</Button>
                    <Button color="inherit" onClick={handleCancel}>Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
    </>;
};

export default Options;