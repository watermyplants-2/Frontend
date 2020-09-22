import React, { useEffect, useState } from 'react';
import { Link}  from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import * as yup from 'yup';
import schema from './loginSchema';

//----------------------------//
//   Initial Values
//----------------------------//

const initialFormValues={
    id:"",
    username:"",
    email:"",
    password:"",
  }
const initialFormErrors={
    id:"",
    username:"",
    email:"",
    password:"",
    }
const initialDisabled=true



//---------------------------------------------
//   Login Component
//---------------------------------------------
const Login = (props) => {


    //----------------------------//
    //   States
    //----------------------------//

    const [formValues,setFormValues]=useState(initialFormValues)
    const [formErrors, setFormErrors]=useState(initialFormErrors)
    const [disabled, setDisabled]=useState(initialDisabled)
    let history = useHistory();


    //----------------------------//
    //   Helpers
    //----------------------------//
    const change = (name, value) => {
        validate(name, value)
        setFormValues({...formValues,[name]:value})
      }
      
    const loginSubmit = () => {
        const newLogin = {
            username:formValues.username.trim(),
            password:formValues.password.trim()
        }
        postLogin(newLogin)
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

      const postLogin=newLogin=>{
          console.log("Placeholder - post Login", newLogin);

          axiosWithAuth()
            .post( '/api/login', newLogin )
                .then( response => {
                    console.log('post response ', response)
                    // localStorage.setItem( "token", response.data.payload );
                    // history.push( "/protected" );
                })
                .catch( error => {
                    console.log('post error ', error)
                });
      }

    // const postLogin = newLogin => {

    // axios.post('https://reqres.in/api/users', newLogin)
    // //https://reqres.in/api/users
    
    //     .then(res=>{
    //     console.log(res.data)
    //     })
    //     .catch(err=>{
    //     debugger
    //     console.log(err)
    //     })
    //     .finally(()=>{
    //     setFormValues(initialFormValues)
    //     document.getElementById('loginForm').reset()
    //     })
    
    // }
      

    //----------------------------//
    //   Event Handlers & Effects
    //----------------------------//


    useEffect(() => {
        schema.isValid(formValues)
          .then(valid => {
            setDisabled(!valid)
          })
      }, [formValues])
      

    const onChange = evt => {
        const { name,value } = evt.target
        change(name,value)
    }

    const onSubmit = evt => {
        evt.preventDefault()
        loginSubmit()
    }

 

    return(
        <>
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
            <div>
                <h1>Login:</h1>
                <form onSubmit={onSubmit}>
                    <label htmlFor="username">Username:
                    <input 
                        name="username" 
                        type="text" 
                        onChange={onChange}
                    />
                    </label>
                    <label htmlFor="password">Password:
                    <input 
                        name="password" 
                        type="password" 
                        onChange={onChange}
                    />
                    </label>
                    <button disabled={disabled}>Log In</button>
                </form>
                <div id="errorFrame">
                    {formErrors.username}
                    {formErrors.email}
                    {formErrors.password}
                </div>
            </div>
        </>
    )
};

export default Login;