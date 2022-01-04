import {faJira} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {AppBar, Grid, Toolbar, Typography, useTheme} from '@mui/material';
import {memo} from 'react';
import Options from '../pages/Options';

type HeaderProps = {
    title: string;
}

const Header = ({title}: HeaderProps) => {
    const theme = useTheme();

    return <>
        <AppBar color="inherit" elevation={0} sx={{borderBottom: `1px solid ${theme.palette.divider}`}}>
            <Toolbar>
                <Grid container spacing={2} alignItems="center">
                    <Grid item><FontAwesomeIcon icon={faJira} transform="grow-6" fixedWidth color={theme.palette.primary.dark}/></Grid>
                    <Grid item xs>
                        <Typography variant="h5" component="h1">{title}</Typography>
                    </Grid>

                    <Grid item>
                        <Options/>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
        <Toolbar/>
    </>;
};

export default memo(Header);