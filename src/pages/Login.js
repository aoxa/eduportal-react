import React, { useState } from "react";
import axios from 'axios';
import { Link as RouterLink, Redirect } from "react-router-dom";
import logoImg from "../logo.svg";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Grid';
import { useAuth } from "../context/auth"
import { Logo, Error } from "../components/AuthForm";
import { makeStyles } from '@material-ui/core/styles';


export default function Login(props) {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [isError, setIsError] = useState(false);
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	//const { setAuthTokens } = useAuth();

	const useStyles = makeStyles(theme => ({
	  root: {
	    flexGrow: 1,
	  },
	  grid: {
	    padding: theme.spacing(2),
	    margin: 'auto',
	    maxWidth: 500,
	    display: 'flex',
	    flexDirection: 'column',
	    alignItems: 'center'
	  } 
	}));

	const classes = useStyles();

	const referer = props.location.state.referer || '/';

	function postLogin() {
		axios.post("http://localhost:8080/api/auth/login.json", 
					{username: userName, password: password})
			.then(result=>{
				console.log(result)
				if(result.status === 200) {
					console.log(result.data);
					// setAuthTokens(result.data);
					setLoggedIn(true);
				}
			}).catch(e=>{
				setIsError(true);
			})
	}

	if(isLoggedIn) {
		return (
			<Redirect to={referer} />
			);
	}


	return (
		<Grid className={classes.grid} sm={12} item container
			  direction="row"
			  justify="center"
			  >
			<Logo src={logoImg} />
			
			<TextField 
				name='username' 
				label='Username' value={userName} 
				onChange={e => {setUserName(e.target.value)}} 
				fullWidth
				margin='normal' />
			
			<TextField 
				name='password'
				fullWidth 
				label='password' value={password} 
				type='password'
				onChange={e => {setPassword(e.target.value)}} 
				margin='normal' />
			
			<Button fullWidth variant="contained" color="primary" 
				onClick={postLogin}>Sign In</Button>

			{ isError && <Error>The username or password is incorrect</Error> }			
			
			<Grid>
				<Link variant="body2" component={RouterLink} to="/">Don't have an account?</Link>
			</Grid>
		
		</Grid>
	);
}
