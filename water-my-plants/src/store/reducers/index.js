import {
    ADD_USER,
    ADD_USERNAME
} from "../actions";

const initialState = {
    username: '',
    id: ''
}

export default( state = initialState, action ) => {
    switch( action.type ) {
        case ADD_USERNAME:
            console.log(action.payload, state)

            return {
                ...state, 
                username: action.payload.username
            }
        case ADD_USER:
            console.log(action.payload)
            return {
                ...state, 
                username: action.payload.username,
                id: action.payload.id
            }
        default:
            return state;
    };
};