import ActionTypes from "./actionTypes"
import { Actions } from 'react-native-router-flux';
import * as DB from '../../firebase/database'

function logoutRequest(data) {
    console.log('datataa', data)
    return dispatch => {
        dispatch(LogoutRequest());
        DB.auth.signOut()
            .then((data) => {
                dispatch(LogoutRequestSuccess(data))
                Actions.signupCon()
            })


    }
}
function LogoutRequest() {
    return {
        type: ActionTypes.LOGOUT_REQUEST
    }
}

function LogoutRequestSuccess(data) {
    return {
        type: ActionTypes.LOGOUT_REQUEST_SUCCESS,
        data
    }
}


export default logoutRequest