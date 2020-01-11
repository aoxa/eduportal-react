import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';

import Autocomplete from '@material-ui/lab/Autocomplete';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { adminStyles } from '../../styles/styles';

import EditUserForm from './partial/EditUserForm';
import { properties } from '../../properties';

export default function UserEdit (props) {
	const { user } = props.location; 
		
	const classes = makeStyles( adminStyles )();
	
	const [ loaded, setLoaded] = useState(false);
	const [ groups, setGroups ] = useState([]);
	const [ selectedGroup, setSelectedGroup ] = useState();
	const [ addGroups, setAddGroups] = useState([]);

	if( !user ) return (<Redirect to={{pathname: "/dash/users"}} />);
	

	const handleDelete = (toDelete) => {	
		axios.delete(properties.server + "users/" + user.id + "/groups/" + toDelete.id)
			.then(result=>{
				if(result.status ===202) {
					setGroups( groups => groups.filter(group => group.name !== toDelete.name));
				}
			});
	}

	const handleLoad = () => {
		axios.get(properties.server + "users/" + user.id + "/groups")
			.then(result=>{
				setGroups(result.data);
				setLoaded(true);
			});
	}

	const addGroup = (e) => {
		if(selectedGroup) {
			axios.post(properties.server + "users/" + user.id + "/groups/" + selectedGroup)
				.then(result=>console.log(result));	
		}	
	} 

	const loadGroups = (e) => {
		const { value } = e.target;
		setSelectedGroup(undefined);
		if(value.length > 2) {
			axios.get(properties.server + "groups/query/" + value)
				.then(result => setAddGroups(result.data));	
		}
		
	}

	return (
		<Grid container>
			<Grid item md={8}>
				<Paper className={ classes.paper }>
					<Typography variant="h4" align="center" gutterBottom> Editar {user.username} </Typography>		
					<EditUserForm user={props.location.user} />
				</Paper>
				<Paper className={ classes.paper }>
					<Typography variant="h6" align="center" gutterBottom>
					Grupos</Typography>
					{!loaded && <Button onClick={handleLoad}>Cargar grupos</Button>}
					{loaded && groups.map((item, key)=>{
						return (
						<Chip key={key}
							className="chipi"
					        label={item.name}
					        onDelete={e=>handleDelete(item)}
					      />)	
					})}
					
					
				</Paper>
			</Grid>
			<Grid item md={4}>
				<Paper className={ classes.paper }>
					<Typography variant="h6" align="center" gutterBottom> Agregar a grupo </Typography>		
					<Autocomplete
						  options={addGroups}
						  renderOption={(option)=> (<span id={option.id}>{option.name}</span>)}
						  getOptionLabel={option => option.name}
						  onChange={(e)=>setSelectedGroup(e.target.id)}
						  renderInput={params => (
						    <TextField {...params} onChange={loadGroups} label="Nombre del grupo" variant="outlined" fullWidth />
						  )}
					/> 
					<Button onClick={addGroup}>Agregar</Button>
				</Paper>
				<Paper className={ classes.paper }>
					<Typography variant="h6" align="center" gutterBottom> Agregar rol </Typography>		
					<TextField />
					<Button >Agregar</Button>
				</Paper>
			</Grid>
		</Grid>
		);
}