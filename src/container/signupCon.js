import Signup from '../components/signup'
import {connect} from 'react-redux'
import signupRequest from '../store/actions/signupAct'

function mapStateToProps(state){
    return{
xyz : state.SignupReducer
    }
   
}

function mapDispatchToProps(dispatch){
return{
    SignupData : (data)=>dispatch(signupRequest(data))

}
}


SignUpCon = connect (mapStateToProps,mapDispatchToProps)(Signup)
export default SignUpCon;
