import React from 'react';
import { Paper, Grid } from '@material-ui/core';
import { withStyles }  from '@material-ui/core/styles';
import { styles } from "../styles/styles"
import { Link as RouterLink } from 'react-router-dom';


function Course(props) {
	const { classes } = props;

	return (
		<Grid container>
			<Grid item xs={8}>
				<Paper className={classes.paper} elevation={5}>
					Courses
					<div>
					<RouterLink to="/survey">Survey</RouterLink>
					</div>
				</Paper>
			</Grid>
		</Grid>
		);
} 

export default withStyles(styles)(Course);