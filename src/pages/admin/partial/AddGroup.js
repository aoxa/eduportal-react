import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { adminStyles } from '../../../styles/styles';
import axios from 'axios';

import { properties } from '../../../properties'; 

export default function AddGroup(props) {
	const [ groupName, setGroupName ] = useState("");
	let error = false;

	function setError() {
		error = true;
	}

	function postLogin() {
		axios.post(properties.server + "groups", 
					{name: groupName})
			.then(result=>{
	
				if(result.status === 200) {
					// setAuthTokens(result.data);
					//setLoggedIn(true);
				}
			}).catch(e=>{
				setError();
			})
	}

	return (
		<div>
			<Typography variant='subtitle1'>Agregar grupo</Typography>
			<TextField 
				name='groupName' 
				label='Nombre del grupo' value={groupName} 
				onChange={e => {setGroupName(e.target.value)}} 
				fullWidth
				margin='normal' />

			<Button fullWidth variant="contained" color="primary" 
			onClick={postLogin}>Crear</Button>
			{error && <div>Error creando el grupo</div>}
            
		</div>
	);
}