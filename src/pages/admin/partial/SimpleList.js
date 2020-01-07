import React from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';

import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import { withStyles } from '@material-ui/core/styles';
import { adminStyles } from '../../../styles/styles';

import { properties } from '../../../properties'; 

import ConfirmDialog from './ConfirmDialog';

class SimpleList extends React.Component {

	constructor(props) {
		super(props);

		this.state = { 
			items: [], 
			hasNext: false, hasPrev: false, pageHash:undefined, 
			dialogOpen: false, selectedId: undefined }

		this.retrieveData = this.retrieveData.bind(this);
	}

	componentDidMount() {
		this.retrieveData();
	}

	retrieveData(hash = undefined, next = false, prev = false) {
		let params = "";

		if(hash) {
			params += "?hash=" + hash + '&next=' + next + "&prev=" + prev;
		}

		axios.get(properties.server + this.props.resource + params)
			.then(result=>{
				if(result.status === 200) {
					const { elements, next, prev, pageHash } = result.data;
					this.setState({items: elements, hasNext: next, hasPrev: prev, pageHash: pageHash});
					
				}
			}).catch(e=>{
			});
	}

	render() {
		const { items } = this.state;
		const { classes, Header, Content, actions } = this.props;
		
		return (
			<TableContainer > 
				<Table className={classes.table}>
					<Header />
					
					<Content actions={actions} items={this.state.items} refresh={this.retrieveData} />	
				</Table>
				
				<Button onClick={()=>{this.retrieveData()}} name="reset"
					variant="contained" color="primary">Primera Pagina</Button> 

				{this.state.hasNext && <Button onClick={()=>{this.retrieveData(this.state.pageHash, true)}} name="next"
					variant="contained" color="primary">Pagina Siguiente</Button> }
			</TableContainer>
			);
	}
}

export default withStyles(adminStyles)(SimpleList);