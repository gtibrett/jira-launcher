import {faJira} from '@fortawesome/free-brands-svg-icons';
import {faQuestion} from '@fortawesome/pro-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {AppBar, Grid, Toolbar, Typography} from '@mui/material';
import {memo} from 'react';
import Options from '../pages/Options';

const Header = ({title = faQuestion}) => {
	return <>
		<AppBar color="secondary">
			<Toolbar>
				<Grid container spacing={2} alignItems="center">
					<Grid item><FontAwesomeIcon icon={faJira} size="2x" fixedWidth/></Grid>
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