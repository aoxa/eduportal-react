import React, { useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';
import { adminStyles } from '../../styles/styles';
import UserList from './partial/UserList';

import { properties } from '../../properties';

class UserSettings extends React.Component {

	constructor(props) {
		super(props);
		this.update = this.update.bind(this);
		this.state = {usernames:[]};
	}
	

	update(event) {
		const { value } = event.target;
		this.setState({usernames:[]})
		if(value !== "") {
			axios.get(properties.server + "users/username/query/" + value)
				.then(result=>{
					if(result.status === 200) {
						this.setState({usernames:result.data});			
					}
				}).catch(e=>{
			});	
		}		
	}

	render() {
		const { classes } = this.props;
		return (
			<div> 
				<div>Usuarios</div>

				<Autocomplete
				  options={this.state.usernames}
				  getOptionLabel={option => option.username}
				  style={{ width: 300 }}			  
				  renderInput={params => (
				    <TextField {...params} onChange={this.update} label="usernames" variant="outlined" fullWidth />
				  )}
			/> 
				<Paper className={ classes.paper }>
					<UserList />
				</Paper>
			</div>
		);	
	}	
} 
export default withStyles(adminStyles)(UserSettings);