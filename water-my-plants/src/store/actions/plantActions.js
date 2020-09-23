import { axiosWithAuth } from '../../utils/axiosWithAuth';

export const ADD_USER = 'add-user';
export const ADD_USERNAME = 'add-username';

export const login = data => {
    return ( dispatch ) => {
        axiosWithAuth()
            .post( '/auth/login', data)
                .then( response => {
                    console.log( 'login response ', response.data )
                    localStorage.setItem( "token", response.data.token );
                    // history.push( "/protected" );
                    // dispatch({type: ADD_USERNAME, payload: data}) 
                })
                .catch( error => {
                    console.log('login error ', error)
                });
    }
};

export const signup = data => {
    console.log(data)
    return ( dispatch ) => {
        axiosWithAuth()
            .post( '/auth/register', data )
                .then( response => {
                    console.log( 'signup response ', response.data.data )
                    dispatch({ type: ADD_USER, payload: response.data.data })
                    // history.push( "/login" );
                })
                .catch( error => {
                    console.log('signup error ', error)
                });
    }
};


            
                
            //     .post("http://localhost:3333/smurfs", data)
            // .then( () => {
            //     data.id=!data.id;
            //     dispatch({type: ADD_SMURF, payload: data}) 
            // })
            // .catch( error => {
            //     console.log( error )
            // });