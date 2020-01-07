import { createContext, useContext } from 'react';

export const AuthContext = createContext({
	authenticated: false, // to check if authenticated or not
	user: {}, // store all the user details
	accessToken: "", // accessToken of user for Auth0
	initiateLogin: () => {}, // to start the login process
	handleAuthentication: () => {}, // handle Auth0 login process
	logout: () => {} // logout the user
});

export function useAuth() {
	return useContext(AuthContext);
}

export const AuthProvider = AuthContext.Provider;

export const AuthConsumer = AuthContext.Consumer;