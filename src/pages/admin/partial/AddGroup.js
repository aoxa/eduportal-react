import React, { useState } from 'react';
import axios from 'axios';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';	

import { properties } from '../../../properties'; 



export default function AddGroup(props) {
	const [ groupName, setGroupName ] = useState("");
	const [ success, setSuccess ] = useState(false);
	const [ error, setError ] = useState(false);


	function agregarGrupo() {
		axios.post(properties.server + "groups", 
					{name: groupName})
			.then(result=>{	
				if(result.status !== 200) {
					setError(true);
				} else {
					setSuccess(true);
				}
			}).catch(e=>{
				setError(true);
			});
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
			onClick={agregarGrupo}>Crear</Button>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={error} onClose={()=>setError(false)} autoHideDuration={3000}>  
            	<Alert variant="filled" elevation={6} severity="error">Error creando el grupo</Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={success} onClose={()=>setSuccess(false)} autoHideDuration={3000}>  
            	<Alert variant="filled" elevation={6} severity="success">Grupo creado con exito</Alert>
            </Snackbar>
		</div>
	);
}