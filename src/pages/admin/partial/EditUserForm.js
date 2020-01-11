import React, { useState } from 'react';
import axios from 'axios';
 
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';	

import { makeStyles } from '@material-ui/core/styles';
import { adminStyles } from '../../../styles/styles';
import { properties } from '../../../properties';

export default function EditUserForm(props) {
	const [ user, setUser ] = useState(props.user);
	const [ saved, setSaved ] = useState({success: false, error: false});

	const handle = (e) => {
		const u = {...user}; 
		u[e.target.name] = e.target.value;
		setUser(u);
	}; 

	const save = () => {
		axios.put(properties.server + "users/" + user.id, 
			{username: user.username, firstName: user.firstName, lastName: user.lastName, email: user.email})
			.then((result)=>{
				setSaved({success: result.status === 200, error: result.status !== 200});
			})
			.catch((e)=>setSaved({error:true}));
	}

	const classes = makeStyles( adminStyles )();

	return (
		<Grid container>
				<Grid item md={6} className={ classes.gridMargin }>
					<TextField
						name='firstName' 
						label='firstName' value={user.firstName} 
						onChange={ handle } 
						fullWidth
						margin='normal' />
				</Grid>

				<Grid item md={6} className={ classes.gridMargin }>
					<TextField 
						name='lastName' 
						label='lastName' value={user.lastName} 
						onChange={ handle } 
						fullWidth
						margin='normal' />
				</Grid>

				<Grid item md={12} className={ classes.gridMargin }>
					<TextField 
						name='email' 
						label='email' value={user.email} 
						onChange={ handle } 
						fullWidth
						margin='normal' />
				</Grid>

				<Grid item md={12} className={ classes.gridMargin }>
					<TextField 
						name='username' 
						label='username' value={user.username} 
						onChange={ handle } 
						fullWidth
						margin='normal' />
				</Grid>
				<Grid item sm={12} className={ classes.gridMargin }>
					<Button onClick={save} color="primary" autoFocus>
			            Guardar
					</Button> 
				</Grid>
				<Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={saved.error} onClose={()=>setSaved({error:false})} autoHideDuration={3000}>  
            		<Alert severity="error">Error actualizando el usuario</Alert>
	            </Snackbar>
	            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={saved.success} onClose={()=>setSaved({success:false})} autoHideDuration={3000}>  
	            	<Alert severity="success">Usuario actualizado con exito</Alert>
	            </Snackbar>
		</Grid>
	);
}