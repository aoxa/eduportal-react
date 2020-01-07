import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { adminStyles } from '../../styles/styles';
import { makeStyles }  from '@material-ui/core/styles';

export default function AdminSettings() {
	const classes = makeStyles( adminStyles )();

	return (
		<Grid container >
			<Grid item xs={12}>
				<Typography variant="h5">Configuracion</Typography>	
			</Grid>		    
			<Grid item sm={12} xs={12}>
				<Paper className={classes.paper}>
				</Paper>
			</Grid>
        </Grid>
	);
} 