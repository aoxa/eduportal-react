import React, { useState } from "react"
import { Typography, TextField, Paper, Button } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { withStyles }  from '@material-ui/core/styles';
import { styles } from "../styles/styles"

function Home(props) {
	const [name, setName] = useState("");
	const [exercises, setExercises] = useState([]);
	const { classes } = props;

	return (
			<Paper className={classes.paper} elevation={5}>
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
								}}><Delete /></IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					)}
				</List>

			</Paper>
		)
}

export default withStyles(styles)(Home);