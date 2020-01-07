import React from 'react';

import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import ConfirmDialog from '../ConfirmDialog';

export function TableHeader() {
	return (
		<TableHead>
			<TableRow>
				<TableCell>ID</TableCell>
				<TableCell>Nombre</TableCell>
				<TableCell>Acciones</TableCell>
			</TableRow>
		</TableHead>
		);
}

export class TableContent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			actions: this.props.actions,
			selectedId: null
		}
		this.handleClose = this.handleClose.bind(this); 
	}
	
	handleClose(item, callback) {		
		this.setState( prev => {
				const state = {...prev};

				for(let i=0; i<state.actions.length; i++) {
					if(state.actions[i].name === item.name) {
						state.actions[i].dialog.open=false;
					}
				}

				state.selectedId = undefined;

				return state 
			});

		if(callback) callback();
	}

	handleOpen(item, id) {
		this.setState( prev => {
				const state = {...prev};

				for(let i=0; i<state.actions.length; i++) {
					if(state.actions[i].name === item.name) {
						state.actions[i].dialog.open=true;
					}
				}

				state.selectedId = id;

				return state 
			});
	}

	render() {
		const { items, refresh } = this.props;
		return (
			<React.Fragment>
				<TableBody>
					
					{ items.map((item, key) =>{
					return(
						<TableRow key={key}>
							<TableCell>{item.id}</TableCell>
							<TableCell>{item.name}</TableCell>
							<TableCell>
								{this.state.actions.map((actionItem, key) => {
									return (
										<IconButton onClick={ ()=> this.handleOpen(actionItem, item.id)} >
											{actionItem.action.icon}
										</IconButton>
									);									
								})}
								<IconButton>
									<EditIcon />
								</IconButton>
							</TableCell>
						</TableRow>
					)
					}) }
				</TableBody>

				{this.state.actions.map((item, key) => {
					return (
						<ConfirmDialog title={item.dialog.title}
							text={item.dialog.text}
							open={item.dialog.open}
							handleClose={(e) => this.handleClose(item)}
							
							handleAgree={()=>{ item.dialog.handleAgree(this.state.selectedId, () => this.handleClose(item, refresh) ) }}
							/>
						)	
				})}
				
			</React.Fragment>
		);	
	}
	
}
