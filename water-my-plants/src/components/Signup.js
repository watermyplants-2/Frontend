import React, { useEffect, useState } from 'react';
import { Link}  from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../store/actions/plantActions";
import * as yup from 'yup';
import schema from './signupSchema';

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
//   Signup Component
//---------------------------------------------
const Signup = ({ signup }) => {

    //----------------------------//
    //   States
    //----------------------------//

    const [formValues,setFormValues]=useState(initialFormValues)
    const [formErrors, setFormErrors]=useState(initialFormErrors)
    const [disabled, setDisabled]=useState(initialDisabled)

    //----------------------------//
    //   Helpers
    //----------------------------//
    const change = (name, value) => {
    validate(name, value)
    setFormValues({...formValues,[name]:value})
    }

    const signupSubmit = () => {
        const newUser = {
            username:formValues.username.trim(),
            email:formValues.email.trim(),
            password:formValues.password.trim()
        }

        postNewUser(newUser)

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
        

    const postNewUser=newUser=>{
        console.log("Placeholder - new user signed up",newUser)

        signup( newUser ); // axios call handled in redux
    }

// const postNewUser = newUser => {

//   axios.post('https://reqres.in/api/users',newUser)
//   //https://reqres.in/api/users

//     .then(res=>{
//       console.log(res.data)
//     })
//     .catch(err=>{
//       debugger
//       console.log(err)
//     })
//     .finally(()=>{
//       setFormValues(initialFormValues)
//       document.getElementById('signupForm').reset()
//     })

// }


    //----------------------------//
    //   Event Handlers
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
        signupSubmit()
    }

//---------------------------------------------
//   Return
//---------------------------------------------
    return(
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
            <h1>Sign Up:</h1>
            <form onSubmit={onSubmit} id="signupForm">
                <label htmlFor="username">Username:
                 <input 
                    name="username" 
                    type="text" 
                    onChange={onChange}
                />
                </label>
                <label htmlFor="email">Email:
                 <input 
                    name="email" 
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
                <button disabled={disabled}>Sign Up</button>
            </form>
            <div id="errorFrame">
                    {formErrors.username}
                    {formErrors.email}
                    {formErrors.password}
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return { };
};

export default connect( mapStateToProps, { signup })( Signup );