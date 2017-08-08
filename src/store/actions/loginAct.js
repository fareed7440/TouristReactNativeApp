import ActionTypes from "./actionTypes"
import { Actions } from 'react-native-router-flux';
import * as DB from '../../firebase/database'

function loginRequest(data) {
    console.log('datataa', data)
    return dispatch => {
        dispatch(LoginRequest());
        return DB.auth.signInWithEmailAndPassword(data.email, data.password).then((sent) => {
            var user = {
                uid: sent.uid,
                name: data.name
            }
            dispatch(LoginRequestSuccess(data))
            Actions.logoutCon()
        })
 }
}

function LoginRequest() {
    return {
        type: ActionTypes.LOGIN_REQUEST
    }
}

function LoginRequestSuccess(data) {
    return {
        type: ActionTypes.LOGIN_REQUEST_SUCCESS,
        data
    }
}


export default loginRequest