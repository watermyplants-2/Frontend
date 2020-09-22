import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
// import PrivateRoute from "./PrivateRoute";
import axios from 'axios'

function App() {

  return (
    <Router>
      <div>
        <Switch>
          {/* <PrivateRoute exact path="/protected"  render={ () => <Home /> }  />  */}
          {/* Commented out PrivateRoute/protected path until I get backend endpoints */}
          <Route exact path="/protected"  render={ () => <Home /> }  />
          <Route exact path="/login" render={ () => 
            <Login  /> } />
          <Route path='/signup' render={ () => 
            <Signup /> } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
