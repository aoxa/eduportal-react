import React from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles }  from '@material-ui/core/styles';
import { styles } from '../styles/styles';



export default function Profile(props) {
	const classes = makeStyles(styles)();

	return (
		<Grid item xs={12} sm={9}>
			<Paper className={classes.paper} elevation={3}>
				<Typography variant="h4" align="center" gutterBottom> Profile </Typography>
			</Paper>
		</Grid>
	);
} 