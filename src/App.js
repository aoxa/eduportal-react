import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Course from './pages/Course';
import Survey from './pages/Survey';
import ViewArticle, { EditArticle } from './pages/Article';
import Form from './pages/Form';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Notifications from './pages/Notifications';
import PrivateRoute from './PrivateRoute';
import Auth from "./context/Authentication";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MainBar from './components/MainNavBar';

import { styles } from "./styles/styles"

import './App.css';

function App(props) {
  
  const classes = makeStyles(styles)();

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
  }

  return (
    <Auth>
      <Router>
            <MainBar />
            <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/profile' component={Profile} />
            <Route path='/notifications' component={Notifications} />
            <Route path='/form' component={Form} />
            <Route path="/dash" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/course" component={Course} />
            <Route path="/survey" component={Survey} />  
            <Route exact path="/article/edit" component={EditArticle} /> 
            <Route exact path="/article/:id" component={ViewArticle} /> 
            <PrivateRoute component={Admin} path='/admin' />
            </Switch>
        </Router>
    </Auth>
  );
}

export default App;
