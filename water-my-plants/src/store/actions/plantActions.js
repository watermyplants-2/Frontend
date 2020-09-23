import { axiosWithAuth } from '../../utils/axiosWithAuth';

export const USER_INFO = 'user-info';

export const login = data => {
    return ( dispatch ) => {
        axiosWithAuth()
            .post( '/auth/login', data)
                .then( response => {
                    console.log( 'login response ', response.data )
                    localStorage.setItem( "token", response.data.token );
                    // history.push( "/protected" );
                    // dispatch({type: USER_INFO, payload: data}) 
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