import React from 'react';

const Signup = (props) => {
    const { change, submit } = props

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
                <button>Sign Up</button>
            </form>
        </div>
    )
};

export default Signup;