import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';
import { adminStyles } from '../../styles/styles';
import { Redirect } from "react-router-dom";
import UserList from './partial/UserList';
import InviteUser from './partial/InviteUser';

import { properties } from '../../properties';

class UserSettings extends React.Component {

	constructor(props) {
		super(props);
		this.update = this.update.bind(this);
		this.state = {usernames:[], user:undefined};
		this.selectUser = this.selectUser.bind(this);
	}
	
	selectUser(user) {
		this.setState({...this.state, user: user});
	}

	update(event) {
		const { value } = event.target;
		console.log(event);
		if(value.length > 2) {
			axios.get(properties.server + "users/username/query/" + value)
				.then(result=>{
					if(result.status === 200) {
						console.log(result.data)
						this.setState({usernames:result.data});			
					}
				}).catch(e=>{
					this.setState({usernames:[]})
			});	
		}		
	}



	render() {
		const { classes } = this.props;

		if(this.state.user) {
			return (<Redirect to={{pathname: "/dash/users/edit", user: this.state.user}} />)
		}

		return (
			<React.Fragment> 
				<Typography variant="h6" gutterBottom>Usuarios</Typography>

				<Grid container>
					<Grid item md={4}>
						<Paper className={ classes.paper }>
							<Typography variant="subtitle1">Buscar:</Typography>
							<Autocomplete
								options={this.state.usernames}
								getOptionLabel={option => option.username}
								renderOption={(option)=> (<span id={option.id}>{option.username}</span>)}
								onChange={(e,val)=>this.selectUser(val)}
								onInputChange={this.update}
								renderInput={params => (
									<TextField {...params}  label="usernames" variant="outlined" fullWidth />
								)}
							/>
						</Paper> 
					</Grid>
					<Grid item md={8}>
						<Paper className={ classes.paper }>
							<InviteUser />
						</Paper>
					</Grid>
					<Grid item md={12}>
						<Paper className={ classes.paper }>
							<UserList />
						</Paper>
					</Grid>
				</Grid>
				
				
			</React.Fragment>
		);	
	}	
} 
export default withStyles(adminStyles)(UserSettings);