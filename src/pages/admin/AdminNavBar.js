import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import { adminStyles } from '../../styles/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Link as RouterLink } from 'react-router-dom';

import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';


export default function AdminBar(props) {
	const classes = makeStyles( adminStyles )();
	const open = props.open;
	const handleDrawerOpen = props.handleOpen;

	return (
		<AppBar
			position="fixed"
			className={clsx(classes.appBar, {
			[classes.appBarShift]: open,
			})}
		>

			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={handleDrawerOpen}
					edge="start"
					className={clsx(classes.menuButton, {
					[classes.hide]: open,
					})}
					>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" noWrap className={clsx({
					[classes.hide]: open})}>
					Admin
				</Typography>
				<IconButton className={classes.appBarToolbarMenu} component={RouterLink} to="/">
					<HomeIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
}