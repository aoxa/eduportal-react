import React from 'react';
import SimpleList from './SimpleList';
import { TableHeader, TableContent } from './table/UserTableContent';
import DeleteIcon from '@material-ui/icons/Delete';
import { properties } from '../../../properties'; 

import axios from 'axios';

export default function UserList() {

		const actions = 
		[
		  	{ 
			  	name: "delete",
			  	dialog: {
					title: "Borrar Usuario",
					text: "La accion no es reversible, esta seguro?",
					open: false,
					handleAgree: async (id, callback)=>{	
						if(!id) return {result: false};

						const response = await axios.delete(properties.server + "users/" +id);
						if( 200 !== response.status) {
							return {result: false, message: 'Error borrando el usuario'};	
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
			<SimpleList Header={TableHeader} Content={TableContent} actions={actions} resource="users" />
		);
}
