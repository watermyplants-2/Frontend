import React, { useEffect, useState } from 'react';
import { Link}  from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../store/actions/plantActions";
import * as yup from 'yup';
import schema from './loginSchema';
import styled from 'styled-components';
import Footer from './Footer'



const StyledDiv = styled.div`

.wrapper{
    background-color:#222822;
    height:100vh;
    background-image:url('https://cdn.shopify.com/s/files/1/1637/3125/files/FoliaCollective-PlantsToGo4-Header_1440x640.jpg');
    background-repeat:no-repeat;
    background-size:cover;
}
.navbar{
    background-color:#DAB692;
    a, :hover,:active,:visited {
        color:#8F5B34;
    }
    li{
        display:inline-block;
        padding:2rem 5rem 2rem 5rem;
        border-right:1px solid #8F5B34;
        border-bottom:1px solid #8F5B34;
    }
}

.formFrame{
    padding:4rem 10% 8rem 10%;
    min-width:30rem;
    width:50%;
    margin:auto;
    background-color:#FFFFFF;
    h1{
        margin:1rem auto;
    }
    form{
        text-align:right;
    }
    label{
        display:block;
        margin:1rem;
    }
    input{
        margin:0 0 0 .7rem; 
    }

}



`




//----------------------------//
//   Initial Values
//----------------------------//

const initialFormValues={
    username:"",
    password:"",
    email:""
  }
const initialFormErrors={
    username:"",
    password:"",
    email:""
    }
const initialDisabled=true



//---------------------------------------------
//   Login Component
//---------------------------------------------
const Login = ({ login }) => {


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
            login( newLogin ); // redux handles the axios request
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

//---------------------------------------------
//   Return
//---------------------------------------------

    return(
        <>
            <StyledDiv>
            <div className="wrapper">
                <ul className="navbar">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
                </ul>
                <div class="formFrame">
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
                <Footer />
            </div>
            

            </StyledDiv>
        </>
    )
};

const mapStateToProps = state => {
    return { };
};

export default connect( mapStateToProps, { login })( Login );