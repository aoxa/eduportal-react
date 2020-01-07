const rules = {
	visitor: {
		static: ["home:visit"]
	},
	admin: {
		static: ["admin:visit"]
	}
};
// TODO this has a back end relation, we should load those on startup.
// static view page rules
// dynamic action page rules. EG: can post if writer

export default rules;