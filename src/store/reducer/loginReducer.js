import ActionTypes from '../actions/actionTypes'

const initialState = {}

function LoginReducer ( state = initialState ,action){
    switch(action.type){
        case ActionTypes.LOGIN_REQUEST_SUCCESS : 
        return { ...state , login:action.data}
        default : return state
    }
}


export default LoginReducer;