import React, { useState } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './PrivateRoute';
import { AuthContext } from "./context/auth";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link as RouterLink } from 'react-router-dom';

import ListItemLink from "./components/ListItemLink";

import { styles } from "./styles/styles"

import './App.css';

function App(props) {
  const [authTokens, setAuthTokens] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { classes } = props;
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider 
          value={{authTokens, setAuthTokens: setTokens}}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"  onClick={(ev)=>setAnchorEl(ev.currentTarget)}>
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
            </Menu>
          </Toolbar>
        </AppBar>
        <div> 
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/admin" component={Admin} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

App.propTypes = {
   classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
