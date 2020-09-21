import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import PrivateRoute from "./PrivateRoute";
import axios from 'axios'

//----------------------------//
//   Initial Values
//----------------------------//

const prop={
  test:"testvalue"
}
const initialFormValues={
  id:"",
  username:"",
  email:"",
  password:"",
}
// Is there a secure way to store password so it's not in state?


function App() {
//----------------------------//
//   States
//----------------------------//

const [formValues, setFormValues] = useState(initialFormValues) 


//----------------------------//
//   Helpers
//----------------------------//

const postNewUser = newUser => {

  axios.post('https://reqres.in/api/users',newUser)
  //https://reqres.in/api/users

    .then(res=>{
      console.log(res.data)
    })
    .catch(err=>{
      debugger
      console.log(err)
    })
    .finally(()=>{
      setFormValues(initialFormValues)
      document.getElementById('signupForm').reset()
    })

}




//----------------------------//
//   Event Handlers
//----------------------------//
const change = (name, value) => {
  //validate(name, value)
  setFormValues({...formValues,[name]:value})
}

const submit = () => {
  const newUser = {
    username:formValues.username.trim(),
    email:formValues.email.trim(),
    password:formValues.password.trim()
  }

  postNewUser(newUser)

}


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
          {/* <PrivateRoute exact path="/protected" component={ Home } /> */}
          <PrivateRoute exact path="/protected"  render={ () => <Home prop={prop} /> }  />
          {/* <Route exact path="/login" component={ Login } /> */}
          <Route exact path="/login" render={ () => 
            <Login 
              change={change}
              submit={submit}
            
            /> } />
          {/* <Route path='/signup' component={ Signup } /> */}
          <Route path='/signup' render={ () => 
            <Signup 
              change={change}
              submit={submit}
          
              /> } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
