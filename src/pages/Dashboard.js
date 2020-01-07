import React, { useState } from "react";

import AdminNavBar from './admin/AdminNavBar';

import { makeStyles } from '@material-ui/core/styles';
import { adminStyles } from '../styles/styles';
import { Route } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import AdminSettings from './admin/AdminSettings';
import UserSettings from './admin/UserSettings';
import GroupSettings from './admin/GroupSettings';
import AdminDrawer from './admin/AdminDrawer';
import UserEdit from './admin/UserEdit';

export default function Dashboard() {
	const classes = makeStyles( adminStyles )();
	const [open, setOpen] = useState(false);
	
  	const handleDrawerOpen = () => {
    	setOpen(true);
  	};

  	const handleDrawerClose = () => {
    	setOpen(false);
  	};

	return (
	<div className={classes.root}>
		<CssBaseline />
		
		<AdminNavBar open={open} handleOpen={handleDrawerOpen}/>
		<AdminDrawer open={open} handleClose={handleDrawerClose} />
		
		<main className={classes.content}>
			<Route exact path="/dash" component={AdminSettings} />
        	<Route exact path="/dash/users" component={UserSettings} />
        	<Route path="/dash/users/edit" component={UserEdit} />
        	<Route path="/dash/groups" component={GroupSettings} />
        </main>

      </div>
	);
}
