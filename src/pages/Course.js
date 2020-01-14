import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles }  from '@material-ui/core/styles';
import { styles } from "../styles/styles"
import { Link as RouterLink } from 'react-router-dom';

import {properties} from '../properties';

function Course(props) {
	const [ articles, setArticles ] = useState([])
	const { classes } = props;

	useEffect( ()=>{
		const source = axios.CancelToken.source();
		(async () => {
			try {
				const response = await axios.get(properties.server + "articles", {
													        cancelToken: source.token
												      });

				setArticles(response.data);
				
				} catch (error) {
			      if (axios.isCancel(error)) {
			        console.log("Cancelled!")
			      } else {
			        throw error;
			      }
			    }
		})();

		return () => {
			    source.cancel();
			  };
	
	});
	
	return (
		<Grid container>
			<Grid item xs={8}>
				<Paper className={classes.paper} elevation={5}>
					Courses
					<div>
					<RouterLink to="/survey">Survey</RouterLink>
					</div>
					{ articles && articles.map( (value, key)=>{
						return (
							<div key={key}>
								<RouterLink to={ "/article/"+value.id }>{value.title}</RouterLink>
							</div>
							)
					} ) }
					
					<div>
					<RouterLink to="/article/edit">Edit Article</RouterLink>
					</div>
				</Paper>
			</Grid>
		</Grid>
		);
} 

export default withStyles(styles)(Course);