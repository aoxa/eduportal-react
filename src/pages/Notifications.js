import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles }  from '@material-ui/core/styles';
import { styles } from '../styles/styles';



export default function Notifications(props) {
	const classes = makeStyles(styles)();

	return (
		<Grid item xs={12} sm={9}>
			<Paper className={classes.paper} elevation={3}>
				<Typography variant="h4" align="center" gutterBottom> Notifications </Typography>
			</Paper>
		</Grid>
	);
} 