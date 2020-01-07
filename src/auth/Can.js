import rules from "./rules"

const check	= (rules, role, action, data) => {
	const userPermissions = rules[role];

	if(!userPermissions) return false;

	const staticPermissions = userPermissions.static;

	if(staticPermissions && staticPermissions.includes(action)) {
		return true;
	}

	return false;

	//TODO: Handle dynamic.

}

const Can = (props) => {
	return (
		check(rules, props.role, props.perform, props.data) ?
		props.yes() : props.no()
		)
}

Can.defaultProps = {
	yes: () => null,
	no: () => null
};


export default Can;