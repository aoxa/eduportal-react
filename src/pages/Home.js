import React, { useState } from "react"
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'; 
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

import { Delete } from '@material-ui/icons';
import { makeStyles }  from '@material-ui/core/styles';
import { styles } from "../styles/styles"

const useStyles = makeStyles( styles );

function MainSection(props) {
	const classes  = useStyles();
	const [name, setName] = useState("");
	const [exercises, setExercises] = useState([]);
	

	return (
		<Grid item xs={12} sm={9}>
			<Paper className={classes.paper} elevation={3}>
				<Typography variant="h4" align="center" gutterBottom> Exercises </Typography>
					
				<form className={classes.form} onSubmit={ (e) => {
					e.preventDefault();
					setExercises([...exercises, {title: name, id: Date.now()}]);
					setName("");
				} }>
					<TextField name='title' label='exercise' value={name} onChange={(e)=>{setName(e.target.value)}} margin='normal' />
					<Button type="submit" color="primary" variant="contained" >Create</Button>
				</form>

				<List>
					{exercises.map( ({id, title}) => 
						<ListItem key={id}>
							<ListItemText primary={title} />
							<ListItemSecondaryAction> 
								<IconButton color="primary" 
								onClick={e=>{
									let newEx = exercises.filter(el=>el.id !== id);
									setExercises(newEx);
								}}>
									<Delete />
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					)}
				</List>
			</Paper>
		</Grid>
		);
}

function SideBar(props) {
	const classes  = useStyles();

	return (
		<Grid item xs={12} sm={3}>
			<Paper className={classes.paper} elevation={3} >
				<Typography variant="h6" align="center" gutterBottom> Courses </Typography>
			</Paper>
		</Grid>
		
		);
}

function Home(props) {
	const classes  = useStyles();

	return (
			
			<Grid container spacing={1}>
				<MainSection classes={classes}/>	
				<SideBar classes={classes}/>		
			</Grid>
						
		)
}

export default Home;