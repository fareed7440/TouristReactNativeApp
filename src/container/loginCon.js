import Login from '../components/login'
import {connect} from 'react-redux'
import loginRequest from '../store/actions/loginAct'
function mapStateToProps(state){
    return{
        logedIn : state.LoginReducer

    }
   
}

function mapDispatchToProps(dispatch){
return{
    loginData : (data)=>dispatch(loginRequest(data))

}
}



LoginCon = connect (mapStateToProps,mapDispatchToProps)(Login)
export default LoginCon;
