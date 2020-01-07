import React, { useState } from "react"
import { Typography, TextField, Paper, Button, Grid } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
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