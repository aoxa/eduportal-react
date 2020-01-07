import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthConsumer } from "./context/auth";
import Can from "./auth/Can"


export default function PrivateRoute( {component: Component, ...rest}) {
	return(
		<AuthConsumer>
			{({ user }) => 	(
				<Route {...rest} render={(props)=>(
				
					<Can role={user.role}

						perform={rest.perform}
					
						yes={() => (		
							<Component {...props} /> 
							)}
					
						no={() => 
							(
								<Redirect to={{pathname: "/login", state: { referer: props.location}}} />
							)}
					/>
				)} 
				/>
			)}			
		</AuthConsumer>
	);
}