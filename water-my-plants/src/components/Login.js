import React from 'react';

const Login = (props) => {
    const { change, submit, disabled, errors } = props

    //----------------------------//
    //   Event Handlers
    //----------------------------//

    const onChange = evt => {
        const { name,value } = evt.target
        change(name,value)
    }

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }



    return(
        <div>
            <h1>Login:</h1>
            <form>
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
                {errors.username}
                {errors.email}
                {errors.password}
            </div>
        </div>
    )
};

export default Login;