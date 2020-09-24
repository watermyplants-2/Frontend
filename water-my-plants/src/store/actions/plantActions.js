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

export const fetchPlants = ({ setUserPlants, id, getId }) => {
    return ( dispatch ) => {
    axiosWithAuth()
        .get('/plants')
            .then(res => {
                setUserPlants(res.data.filter( plants => {
                    return plants.user_id === getId;
                }))
            })
            .catch(err => {
                console.log(err)
            })
        }
}

export const appendPlant = data => {
    console.log(data)
    return ( dispatch ) => {
        axiosWithAuth()
            .post('/plants', data)
            .then(response => {
                console.log("add plant ", data)
                // dispatch({ type: ADD_PLANT, payload: response.data.data })
            })
            .catch( error => {
                console.log('add plant error, ', error)
            })
    }
}

export const removePlant = data => {
    console.log(data)
    return ( dispatch ) => {
        axiosWithAuth()
            .delete(`/plants/${data}`)
                .then(response => {
                    console.log("deleted plant ", response)
                })
                .catch( error => {
                    console.log('deleted plant error, ', error)
                })
    }
}