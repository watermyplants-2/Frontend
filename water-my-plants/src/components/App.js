import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/protected">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
        <Switch>
          <PrivateRoute exact path="/protected" component={ Home } />
          <Route exact path="/login" component={ Login } />
          <Route path='/signup' component={ Signup } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
