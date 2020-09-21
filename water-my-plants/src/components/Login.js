import React from 'react';

const Login = () => {
    return(
        <div>
            <h1>Login:</h1>
            <form>
                <label htmlFor="username">Username:
                 <input name="username" type="text" />
                </label>
                <label htmlFor="password">Password:
                 <input name="password" type="password" />
                </label>
                <button>Log In</button>
            </form>
        </div>
    )
};

export default Login;