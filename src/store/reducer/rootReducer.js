import { combineReducers } from 'redux'
import SignupReducer from './signupReducer'
import LoginReducer from './loginReducer'
import LogoutReducer from './logoutReducer'
const rootReducer = combineReducers({
    SignupReducer,
    LoginReducer,
    LogoutReducer
})

export default rootReducer;