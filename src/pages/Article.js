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

const DisplayNodeHeader = (props) => {

	const { userId, title } = props;
	const [ user, setUser ] = useState(undefined);

	if(!user) {
		setTimeout(	()=>{
			setUser({id: '076aa244-3685-11ea-aec2-2e728ce88125', username: 'aoxa', firstName: 'Pepe', lastName: 'Trueno'});
			}, 5000);	
	}
	

	return (
			<React.Fragment>
				<Typography variant="h4">{title}</Typography>
				<Typography variant="subtitle2">{user? "Publicado $ por " + user.username : "cargando" }</Typography>
			</React.Fragment>
		);
};

class ViewArticle extends React.Component {

	constructor(props) {
		super(props);
		this.state = {loading: true, article: undefined};
		this.renderLoading = this.renderLoading.bind(this);
		this.renderArticle = this.renderArticle.bind(this);
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

	renderArticle(classes) {
		const { article } = this.state;
		return (
			<Paper className={classes.paper}>
				<DisplayNodeHeader title={article.title} userId="id" />
				<Typography variant="body1">{article.body}</Typography>
			</Paper>
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
			<Grid item md={6}>
				<Paper className={classes.paper}>
					<TextField
						name='title'
						value={article.title} 
						type="text"
						label="Titulo"
						onChange={handle}
						/>
					<TextField
						name='body'
						value={article.body} 
						type="textarea"
						label="Contenido"
						onChange={handle}
						/>
					<Button onClick={save} variant="contained">Save</Button>
				</Paper>
			</Grid>
			<Grid item md={6}>
				<Paper className={classes.paper}>
					Content
				</Paper>
			</Grid>
		</Grid>
	);	
}

export default withStyles(styles)(ViewArticle);