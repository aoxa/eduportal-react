import React from "react";
import { Button } from "../components/AuthForm"
import { useAuth } from "../context/auth"

export default function Admin() {
	const {setAuthTokens} = useAuth();

	function logout() {
		setAuthTokens()
	}

	return (
		<div>
			<div> Admin </div>
			<Button onClick={logout}>Log out</Button>
		</div>);
}