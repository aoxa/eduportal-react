import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AddGroup from './partial/AddGroup';
import GroupList from './partial/GroupList';
import RoleList from './partial/RoleList';

import { adminStyles } from '../../styles/styles';
import { makeStyles }  from '@material-ui/core/styles';

export default function GroupSettings() {
	const classes = makeStyles( adminStyles )();

	return (
		<Grid container >
			<Grid item xs={12}>
				<Typography variant="h5">Grupos</Typography>	
			</Grid>		    
			<Grid item md={8} xs={12}>
				<Paper className={classes.paper}>
					<GroupList />
				</Paper>
			</Grid>
			<Grid item md={4} xs={12}>
				<Paper className={classes.paper}>
					<AddGroup />
				</Paper>
			</Grid>
			<Grid item md={12}>
				<Typography variant="h5">Roles</Typography>	
			</Grid>	
			<Grid item md={8} xs={12}>
				<Paper className={classes.paper}>
					<RoleList />
				</Paper>
			</Grid>
        </Grid>
	);
} 