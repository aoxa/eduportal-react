import React from 'react';
import SimpleList from './SimpleList';
import { TableHeader, TableContent } from './table/GroupTableContent';
import DeleteIcon from '@material-ui/icons/Delete';
import { properties } from '../../../properties'; 

import axios from 'axios';

export default function GroupList() {

		const actions = 
		[
		  	{ 
			  	name: "delete",
			  	dialog: {
					title: "Borrar Grupo",
					text: "La accion no es reversible, esta seguro?",
					open: false,
					handleAgree: async (id, callback)=>{	
						if(!id) return {result: false};

						const response = await axios.delete(properties.server + "groups/" +id);
						
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
			<SimpleList Header={TableHeader} Content={TableContent} actions={actions} resource="groups" />
		);
}
