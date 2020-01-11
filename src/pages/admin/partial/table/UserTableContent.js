import React, { useState } from 'react';
import axios from 'axios';
import { properties } from '../../../../properties';
import ConfirmDialog from '../ConfirmDialog';

import { Link as RouterLink } from 'react-router-dom';

import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DeleteIcon from '@material-ui/icons/Delete';


export function TableHeader() {
	return (
		<TableHead>
			<TableRow>
				<TableCell>ID</TableCell>
				<TableCell>Nombre</TableCell>
				<TableCell>Apellido</TableCell>
				<TableCell>Nombre de Usuario</TableCell>
				<TableCell>Email</TableCell>
				<TableCell>Acciones</TableCell>
			</TableRow>
		</TableHead>
		);
}

export const TableContent = (props) =>  {

	
	const { items, refresh } = props;

	return (
		<React.Fragment>
			<TableBody>
				
				{ items.map((item, key) =>{
				return(
					<UserRow key={key} itemKey={key} user={item} 
					/>
				)
				}) }
			</TableBody>		
			
		</React.Fragment>
	);		
}

const UserRow = (props) => {
	const { user, itemKey } = props;

	const [enabled, setEnabled] = useState(user.enabled);

	return (
		<TableRow key={ itemKey }>
			<TableCell>{user.id}</TableCell>
			<TableCell>{user.firstName}</TableCell>
			<TableCell>{user.lastName}</TableCell>
			<TableCell>{user.username}</TableCell>
			<TableCell>{user.email}</TableCell>
			<TableCell>
				<IconButton  component={RouterLink} to={{pathname: "/dash/users/edit", user: user}} >
					<EditIcon />
				</IconButton>
				<IconButton onClick={ () => axios.post(properties.server + "users/" + user.id + "/activate")
						.then((result)=>{
							setEnabled(result.data);
						}) }>
					{enabled? <LockOpenIcon /> : <LockIcon /> }
				</IconButton>
			</TableCell>
		</TableRow>
		);
}