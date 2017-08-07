import ActionTypes from '../actions/actionTypes'

const initialState = {}

function SignupReducer ( state = initialState ,action){
    switch(action.type){
        case ActionTypes.SIGNUP_REQUEST_SUCCESS : 
        return { ...state , signup:action.data}
        default : return state
    }
}


export default SignupReducer;