import React from 'react';
import clsx from 'clsx';

import { Link } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { makeStyles } from '@material-ui/core/styles';
import { adminStyles } from '../../styles/styles';

const routes = [
	{
		url: '/dash',
		icon: <SettingsIcon />,
		name: 'Configuracion'
	},
	{
		url: '/dash/users',
		icon: <PersonIcon />,
		name: 'Usuarios'
	},
	{
		url: '/dash/groups',
		icon: <PeopleIcon />,
		name: 'Grupos'
	},
]

export default function AdminDrawer(props) {
	const classes = makeStyles( adminStyles )();
	const handleDrawerClose = props.handleClose;
	const open = props.open;

	const isActive = (value) => (window.location.pathname === value ? 'active' : '');
	
	return (
		<Drawer
			variant="permanent"
			className={clsx(classes.drawer, {
			[classes.drawerOpen]: open,
			[classes.drawerClose]: !open,
			})}
			classes={{
			paper: clsx({
			[classes.drawerOpen]: open,
			[classes.drawerClose]: !open,
			}),
			}}
			>
			<div className={classes.toolbar}>
				<Typography variant="h6" noWrap>
					Admin
				</Typography>
				<IconButton onClick={handleDrawerClose}>
					<ChevronLeftIcon />
				</IconButton>
			</div>
			<Divider />
			
			<List>
				{routes.map((prop, key) =>{
					return(
					<Link to={prop.url} style={{ textDecoration: 'none', color: 'inherit' }} key={key}>
						<ListItem className={clsx(classes.listItem, {['active']: isActive(prop.url)})} button key={key}>
							<ListItemIcon  >
								{prop.icon}
							</ListItemIcon>
							<ListItemText primary={prop.name} />
						</ListItem>
					</Link>
					)
				})}
			</List>
		</Drawer>
	);
}