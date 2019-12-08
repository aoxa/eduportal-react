import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import logoImg from "../logo.svg";
import { Card, Logo, Form, Input, Error } from "../components/AuthForm";
import Button from '@material-ui/core/Button'
import axios from 'axios';
import { useAuth } from "../context/auth"


export default function Login(props) {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [isError, setIsError] = useState(false);
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const { setAuthTokens } = useAuth();

	const referer = props.location.state.referer || '/';

	function postLogin() {
		axios.post("http://localhost:8080/api/auth/login.json")
			.then(result=>{
				console.log(result)
				if(result.status === 200) {
					console.log(result.data);
					setAuthTokens(result.data);
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
		<Card>
			<Logo src={logoImg} />
			<Form>
				<Input type="username" placeholder="Username"
					value={userName} 
					onChange={e => {setUserName(e.target.value)}}
				 />
				<Input type="password" 
					value={password}
					placeholder="password"
					onChange={ e => {
						setPassword(e.target.value);
					}}
					 />
					
				<Button variant="contained" color="primary" 
					onClick={postLogin}>Sign In</Button>
			</Form>
			<Link to="/signup">Don't have an account?</Link>
			{ isError && <Error>The username or password is incorrect</Error> }
		</Card>
	);
}
