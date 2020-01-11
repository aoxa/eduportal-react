import React, { useState } from 'react';
import axios from 'axios';


import { properties } from '../../../properties';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default function InviteUser(props) {
	const [ email, setEmail ] = useState("");
	const [ groups, setGroups ] = useState([]);
	const [ loadedGroups, setLoadedGroups ] = useState([]); 
	
	const loadGroups = (e) => {
		const { value } = e.target;
		if(value && value.length > 2) {
			axios.get(properties.server + "groups/query/" + value)
				.then(result => setLoadedGroups(result.data));	
		}
	}

	const invite = () => {
		//TODO do something with the user
		axios.post(properties.server + "users/invite",
			{ email: email, userGroups: groups.map((val,key)=> val.id) })
			.then(result=>console.log(result));
	}

	return (
		<Grid container>
			<Grid item md={3}>
				<TextField label="Email del usuario" onChange={(e)=>setEmail(e.target.value)} value={email} />
			</Grid>
			<Grid item md={6}>
				<Autocomplete
					options={loadedGroups}
					getOptionLabel={option => option.name}
					renderOption={(option)=> (<span id={option.id}>{option.name}</span>)}
					onChange={(e,val,reason)=> { if('clear'===reason) groups.splice(); else setGroups(val)}}
					multiple
					variant='outlined'
					onInputChange={loadGroups}
					renderInput={params => (
						<TextField {...params}  label="Grupos" variant="outlined" fullWidth />
					)}
				/>
			</Grid>
			<Grid item md={3}>
				<Button onClick={invite}>Invitar</Button>
			</Grid>
			
		</Grid>
	)
}