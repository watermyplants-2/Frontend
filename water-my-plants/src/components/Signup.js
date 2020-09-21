import React from 'react';

const Signup = () => {
    return(
        <div>
            <h1>Sign Up:</h1>
            <form>
                <label htmlFor="username">Username:
                 <input name="username" type="text" />
                </label>
                <label htmlFor="email">Email:
                 <input name="email" type="text" />
                </label>
                <label htmlFor="password">Password:
                 <input name="password" type="password" />
                </label>
                <button>Sign Up</button>
            </form>
        </div>
    )
};

export default Signup;