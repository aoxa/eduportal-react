import React, { useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from '../styles/styles';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Badge } from '@material-ui/core';

export default function MainBar(props) {
	const [anchorEl, setAnchorEl] = useState(null);
  	const open = Boolean(anchorEl);

  	const classes = makeStyles(styles)();  

	return (
		<div>
		 <AppBar position="static">
          <Toolbar>
            <IconButton 
            	edge="start" 
            	className={classes.menuButton} 
            	color="inherit" 
            	aria-label="menu"  
            	onClick={(ev)=>setAnchorEl(ev.currentTarget)}>
              <MenuIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={ev=>setAnchorEl(null)}
              >
                <MenuItem onClick={ev=>setAnchorEl(null)} component={RouterLink} to="/">Home Page</MenuItem>
                <MenuItem onClick={ev=>setAnchorEl(null)} component={RouterLink} to="/admin">Admin</MenuItem>
                <MenuItem onClick={ev=>setAnchorEl(null)} component={RouterLink} to="/course">Course</MenuItem>
                <MenuItem onClick={ev=>setAnchorEl(null)} component={RouterLink} to="/form">Form</MenuItem>
                <MenuItem onClick={ev=>setAnchorEl(null)} component={RouterLink} to="/dash">Dashboard</MenuItem>
            </Menu>
            <div className={classes.grow}></div>
            <div className={classes.sectionDesktop}>
	            <IconButton 
	            	aria-label="show 17 new notifications" 
	            	color="inherit"
					component={RouterLink} 
	             	to="/notifications"
	            	>
	              <Badge badgeContent={0} color="secondary">
	                <NotificationsIcon />
	              </Badge>
	            </IconButton>
	            <IconButton
	              edge="end"
	              aria-label="account of current user"
	              aria-haspopup="true"
	              color="inherit"
	              component={RouterLink} 
	              to="/profile"
	            >
	              <AccountCircle />
	            </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        </div>
	);
}