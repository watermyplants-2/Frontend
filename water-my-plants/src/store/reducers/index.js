import {
    USER_INFO
} from "../actions";

const initialState = {
    username: '',
    password: '',
    email: ''
}

export default( state = initialState, action ) => {
    switch( action.type ) {
        case USER_INFO:
            console.log(action.payload)
            return {
                ...state, 
                username: action.payload
            }
        default:
            return state;
    };
};