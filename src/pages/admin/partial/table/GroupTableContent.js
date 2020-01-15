import React from 'react';

import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
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
			modal: {
				open: false,
				content: "",
				id: undefined
			},
			actions: this.props.actions,
			selectedId: null
		}
		this.handleClose = this.handleClose.bind(this); 
		this.handleModalClose = this.handleModalClose.bind(this);
		this.handleModalSave = this.handleModalSave.bind(this);
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

	handleModalClose() {
		this.setState({modal:{open: false, content:"", id: undefined}});
	}

	handleModalSave() {
		const result = this.props.itemUpdate(this.state.modal.id, this.state.modal.content);

		if(result) { 
			const { items } = this.props;

			for(let i = 0; i < items.length; i++) {
				if(items[i].id === this.state.modal.id) {
					items[i].name = this.state.modal.content;
				}
			}
		}

		this.handleModalClose();
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
										<IconButton key={key} onClick={ ()=> this.handleOpen(actionItem, item.id)} >
											{actionItem.action.icon}
										</IconButton>
									);									
								})}
								<IconButton onClick={()=>this.setState({modal:{open:true, content:item.name, id: item.id}})}>
									<EditIcon />
								</IconButton>
							</TableCell>
						</TableRow>
					)
					}) }
				</TableBody>

				{this.state.actions.map((item, key) => {
					return (
						<ConfirmDialog key={key} title={item.dialog.title}
							text={item.dialog.text}
							open={item.dialog.open}
							handleClose={(e) => this.handleClose(item)}
							
							handleAgree={()=>{ item.dialog.handleAgree(this.state.selectedId, () => this.handleClose(item, refresh) ) }}
							/>
						)	
				})}


				<Dialog fullWidth={true}
						maxWidth = {'sm'} 
						open={this.state.modal.open} 
						onClose={this.handleModalClose} 
						aria-labelledby="form-dialog-title">
			        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
			        <DialogContent>
			          <DialogContentText>
			          </DialogContentText>
			          <TextField
			            autoFocus
			            margin="dense"
			            id="modal-name"
			            label="Nombre"
			            type="text"
			            value={this.state.modal.content}
			            onChange={(e)=> this.setState({modal: {open: true, content:e.target.value, id: this.state.modal.id }})}
			            fullWidth
			          />
			        </DialogContent>
			        <DialogActions>
			          <Button onClick={this.handleModalClose} color="primary">
			            Cancelar
			          </Button>
			          <Button onClick={this.handleModalSave} color="primary">
			            Editar
			          </Button>
			        </DialogActions>
			      </Dialog>
				
			</React.Fragment>
		);	
	}
	
}
