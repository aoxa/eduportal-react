import React from 'react';

export default function UserEdit (props) {
	const { user } = props.location; 
	return (<div>Editar {user.username}</div>);
}