import React, { useState } from 'react';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from "react-router-dom";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { properties } from '../properties';
import { styles } from '../styles/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';

const DisplayNodeHeader = (props) => {

	const { userId, title } = props;
	const [ user, setUser ] = useState({id: '076aa244-3685-11ea-aec2-2e728ce88125', username: 'aoxa', firstName: 'Pepe', lastName: 'Trueno'});
	
	return (
			<React.Fragment>
				<Typography variant="h4">{title}</Typography>
				<Typography variant="subtitle2" gutterBottom>{user? "Publicado $ por " + user.username : "cargando" }</Typography>
			</React.Fragment>
		);
};

const DisplayComments = (props) => {
	const { children } = props.article; 
	const classes = makeStyles(styles)();

	return (
		<React.Fragment>
			<Typography variant="subtitle1">Comentarios</Typography>
			{children.map((entry,key)=>{
				return(
				<div key={key}> 
					<Typography variant="subtitle2">fetch user</Typography>
					<div>{entry.body}</div>
					<Divider light className={classes.spacedDivider} />
				</div>
			)})}
		</React.Fragment>
		);
}

class ViewArticle extends React.Component {

	constructor(props) {
		super(props);
		//TODO: store loading date. Update that date when comment retrieved, to paginate comments
		this.state = {loading: true, article: undefined, dialog: false, comment: ""};
		this.renderLoading = this.renderLoading.bind(this);
		this.renderArticle = this.renderArticle.bind(this);
		this.dialogClose = this.dialogClose.bind(this);
		this.addComment = this.addComment.bind(this);
	}

	componentDidMount() {
		axios.get(properties.server + "articles/"+this.props.match.params.id)
			.then(result=>{
				this.setState({loading: false, article: result.data});
			});		
	}

	renderLoading(classes) {
		return (
			<Paper className={classes.paper}>
				<CircularProgress />
			</Paper>);
	}

	dialogClose() {
		this.setState({...this.state, dialog:false});
	}

	addComment() {
		axios.post(properties.server+"articles/"+this.state.article.id+"/comment",
			{body: this.state.comment, user: "076aa244-3685-11ea-aec2-2e728ce88125"})
			.then((result)=>{
				this.setState({...this.state, comment:'', dialog:false});
			});
	}

	renderArticle(classes) {
		const { article } = this.state;
		return (
			<React.Fragment>
				<Paper className={classes.paper} elevation={3}>
					<DisplayNodeHeader title={article.title} userId="id" />
					<Typography variant="body1" className={classes.nodeBody}>{article.body}</Typography>
					<Divider className={classes.spacedDivider} />
					<DisplayComments article={article} />
				</Paper>

				<Fab className={classes.fab} onClick={()=>this.setState({...this.state, dialog: true})} color="primary"><AddIcon /></Fab>
				
				<Dialog maxWidth="md"
						fullWidth 
						open={this.state.dialog} 
						onClose={this.dialogClose} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Agregar Comentario</DialogTitle>
					<DialogContent>
						<TextField
						multiline
						autoFocus
						margin="dense"
						value={this.state.comment}
						onChange={(e)=>this.setState({...this.state, comment: e.target.value})}
						rows={4}
						id="name"
						label="Comentario"
						type="text"
						fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.dialogClose} color="primary">
						Cancelar
						</Button>
						<Button onClick={this.addComment} color="primary">
						Enviar
						</Button>
					</DialogActions>
				</Dialog>
			</React.Fragment>
			);
	}

	render() {
		const { classes } = this.props;

		return (
				<Grid container>
					<Grid item sm={12}>
						{this.state.loading? this.renderLoading(classes) : this.renderArticle(classes)}
					</Grid>
				</Grid>
			);
	}
}

export function EditArticle() {
	const [ article, setArticle ] = useState({title:"", body: "", user:"076aa244-3685-11ea-aec2-2e728ce88125"});
	const [ saved, setSaved ] = useState(false);
	const classes = makeStyles(styles)();

	const save = () => {
		axios.post(properties.server + "articles",
			article)
			.then(result=>{
				if(200 === result.status) {
					setSaved(true);	
				}
				
			});
		};

	const handle = (event) => {
		const {name, value} = event.target;
		const ar = {...article};
		ar[name]=value;

		setArticle(ar);
	};

	if(saved) {
		return (
			<Redirect to='/course' />
			);
	}

	return (
		<Grid container>
			<Grid item md={12}>
				<Paper className={classes.paper} elevation={3}>
					<Grid container>
						<Grid item sm={12}>
							<TextField
								className={classes.formElement}
								name='title'
								value={article.title} 
								type="text"
								label="Titulo"
								onChange={handle}
								fullWidth
								/>
						</Grid>
						<Grid item sm={12}>
							<TextField
								className={classes.formElement}
								name='body'
								multiline
								rows={8}
								value={article.body} 
								type="textarea"
								label="Contenido"
								fullWidth
								onChange={handle}
								/>
						</Grid>
						<Grid item sm={12}>
							<Button className={classes.formElement} onClick={save} variant="contained">Save</Button>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);	
}

export default withStyles(styles)(ViewArticle);