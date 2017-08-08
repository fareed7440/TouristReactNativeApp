import ActionTypes from '../actions/actionTypes'

const initialState = {}

function LogoutReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.LOGOUT_REQUEST_SUCCESS:
            return { ...state, logout: action.data }
        default: return state
    }
}


export default LogoutReducer;