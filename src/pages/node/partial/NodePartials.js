import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';


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

export default DisplayNodeHeader;