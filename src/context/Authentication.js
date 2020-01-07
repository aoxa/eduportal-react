import React, { Component } from 'react';
import { AuthProvider } from './auth'

class Auth extends Component {
	state = {
		authenticated : false,
		user : {
			role: 'visitor'
		}
	};

	initiateLogin = () => {

	};

	logout = () => {

	};

	handleAuthentication = () => {

	};

	setSession(authResult) {

	}

	render() {
		const authProviderValue = {
			...this.state,
			initiateLogin: this.initiateLogin,
			handleAuthentication: this.handleAuthentication,
			logout: this.logout
		};

		return (
			<AuthProvider value={authProviderValue}>
				{this.props.children}
			</AuthProvider>
			);
	}
}

export default Auth;