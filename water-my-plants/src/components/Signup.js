import React, { useEffect, useState } from 'react';
import { Link}  from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../store/actions/plantActions";
import * as yup from 'yup';
import schema from './signupSchema';
import Footer from './Footer'
import styled from 'styled-components';




const StyledDiv = styled.div`

.background{
    background-color:#222822;
    height:100vh;
    background-image:url('https://cdn.shopify.com/s/files/1/1637/3125/files/FoliaCollective-PlantsToGo4-Header_1440x640.jpg');
    background-repeat:no-repeat;
    background-size:cover;
}
.wrapper{
    background-color:#FFFFFF;
}

.navWrap{
    width:100%;
    background-color:#DAB692;
}
.navbar{

    background-color:#DAB692;
    display:flex;
    flex-flow:row;
    justify-content:center;

    a, :hover,:active,:visited {
        color:#8F5B34;
    }
    li{
        display:inline-block;
        padding:2rem 5rem 2rem 5rem;
        border-right:1px solid #8F5B34;
    }
    li:first-child{
        border-left:1px solid #8F5B34;
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
    button{
        color:
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
            <StyledDiv>
                <div className="background">
                    <div className="wrapper">

                        
                    
                        <div className="navWrap">
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
                        </div>
                        <div className="formFrame">
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
                        <Footer />
                    </div>
                </div>
        
            </StyledDiv>
        </div>


        
    )
};

const mapStateToProps = state => {
    return { };
};

export default connect( mapStateToProps, { signup })( Signup );