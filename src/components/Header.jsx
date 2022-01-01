import {faJira} from '@fortawesome/free-brands-svg-icons';
import {faQuestion} from '@fortawesome/pro-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {AppBar, Grid, IconButton, Toolbar, Tooltip, Typography} from '@mui/material';
import {memo} from 'react';
import {useNavigate} from 'react-router';

const Header = ({title, icon = faQuestion, link = '/'}) => {
	const navigate = useNavigate();
	
	return <>
		<AppBar>
			<Toolbar>
				<Grid container spacing={2} alignItems="center">
					<Grid item><FontAwesomeIcon icon={faJira} size="2x"/></Grid>
					<Grid item xs>
						<Typography variant="h5" component="h1">{title}</Typography>
					</Grid>
					
					<Grid item>
						<Tooltip title="Options" placement="left" arrow>
							<IconButton onClick={() => navigate(link)}>
								<FontAwesomeIcon icon={icon} color="#FFF"/>
							</IconButton>
						</Tooltip>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
		<Toolbar/>
	</>;
};

export default memo(Header);