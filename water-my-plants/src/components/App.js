import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
// import PrivateRoute from "./PrivateRoute";
import axios from 'axios'
import * as yup from 'yup'
import loginSchema from './loginSchema'
import signupSchema from './signupSchema'


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
const initialDisabled=true
const initialFormErrors={
  id:"",
  username:"",
  email:"",
  password:"",
}
const initialSchema=loginSchema
// Is there a secure way to store password so it's not in state?


function App() {
//----------------------------//
//   States
//----------------------------//

const [formValues, setFormValues] = useState(initialFormValues) 
const [disabled, setDisabled] = useState(initialDisabled)
const [formErrors, setFormErrors] = useState(initialFormErrors)
const [schema, setSchema] = useState(initialSchema)

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

const validate = (name, value) => {
  yup
    .reach(schema, name)
    .validate(value)
    .then(valid => {
      setFormErrors({...formErrors, [name]: ""})
    })
    .catch(err => {
      // debugger
      setFormErrors({...formErrors,[name]: err.errors[0]})
      // console.log(err)
    })
}

useEffect(() => {
  schema.isValid(formValues)
    .then(valid => {
      setDisabled(!valid)
    })
}, [formValues])



//----------------------------//
//   Event Handlers
//----------------------------//
const change = (name, value) => {
  validate(name, value)
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
        <Switch>
          {/* <PrivateRoute exact path="/protected"  render={ () => <Home /> }  />  */}
          {/* Commented out PrivateRoute/protected path until I get backend endpoints */}
          <Route exact path="/protected"  render={ () => <Home /> }  />
          <Route exact path="/login" render={ () => 
            <Login 
              change={change}
              submit={submit}
              disabled={disabled}
              errors={formErrors}
              setSchema={setSchema}
            
            /> } />
          <Route path='/signup' render={ () => 
            <Signup 
              change={change}
              submit={submit}
              disabled={disabled}
              errors={formErrors}
              setSchema={setSchema}

          
              /> } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
