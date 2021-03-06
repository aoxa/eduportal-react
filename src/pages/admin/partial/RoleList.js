import React from 'react';
import axios from 'axios';

import SimpleList from './SimpleList';
import { TableHeader, TableContent } from './table/GroupTableContent';
import DeleteIcon from '@material-ui/icons/Delete';
import { properties } from '../../../properties'; 

/*
	<SimpleList Header={TableHeader} Content={TableContent} resource="roles" />
	*/

export default function RoleList() {
	
	const actions = 
	[
	  	{ 
		  	name: "delete",
		  	dialog: {
				title: "Borrar Rol",
				text: "La accion no es reversible, esta seguro?",
				open: false,
				handleAgree: async (id, callback)=>{	
					if(!id) return {result: false};

					const response = await axios.delete(properties.server + "roles/" +id);
					
					if(response.status !== 200) {
						return {result: false, message: 'Error intentando borrar el rol'};	
					}
					callback();
					
					return {result: true, message: ''};
				}
			},
			action: {
				icon: <DeleteIcon />
			}	
		}
	];

	return (
		<SimpleList Header={TableHeader} Content={TableContent} actions={actions} resource="roles" />
		);
}
