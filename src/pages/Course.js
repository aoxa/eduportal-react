import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles }  from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink, Link } from 'react-router-dom';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import ListIcon from '@material-ui/icons/List';
import AssignmentIcon from '@material-ui/icons/Assignment';
import EditIcon from '@material-ui/icons/Edit';

import { styles } from "../styles/styles"
import {properties} from '../properties';

const actions = [
  { icon: <ListIcon />, name: 'Cuestionario', link: '/survey/edit' },
  { icon: <AssignmentIcon />, name: 'Articulo', link: '/article/edit' },
];

function Course(props) {
	const [ articles, setArticles ] = useState({data: [], loaded: false})
	const [ speedDial, setSpeedDial ] = useState({ open: false })
	const { classes } = props;

	useEffect( ()=>{
		const source = axios.CancelToken.source();
		(async () => {
			try {
				if(articles.loaded) return;

				const response = await axios.get(properties.server + "articles", {
													        cancelToken: source.token
												      });

				setArticles({ data: response.data, loaded: true });
				
				} catch (error) {
			      if (axios.isCancel(error)) {
			        console.log("Cancelled!");
			      } else {
			        throw error;
			      }
			    }
		})();

		return () => {
			    source.cancel();
			  };
	
	});

	const handleClose = () => {setSpeedDial({...speedDial, open:false})};
	const handleOpen = () => {setSpeedDial({...speedDial, open:true})};
	
	return (
		<React.Fragment>
			<Grid container>
				<Grid item xs={8}>
					<Paper className={classes.paper} elevation={5}>
						<Typography variant="h6">Asignaturas</Typography>
						{ articles.data && articles.data.map( (value, key)=>{
							return (
								<div key={key}>
									<RouterLink to={ "/article/"+value.id }>{value.title}</RouterLink>
								</div>
								)
						} ) }
					</Paper>
				</Grid>
				<Grid item xs={4}>
					<Paper className={classes.paper} elevation={5}>
						<Typography variant="h6">Autoridades</Typography>
					</Paper>
				</Grid>
			</Grid>
			<SpeedDial
				ariaLabel="SpeedDial openIcon example"
				className={classes.speedDial}
				icon={<SpeedDialIcon openIcon={<EditIcon />} />}
				onClose={handleClose}
				onOpen={handleOpen}
				open={speedDial.open}
			>
			{actions.map(action => (
				<SpeedDialAction
					key={action.name}
					icon={action.icon}
					tooltipTitle={action.name}
					component={Link}
					to={action.link}
				/>
			))}
			</SpeedDial>
		</React.Fragment>
		);
} 

export default withStyles(styles)(Course);