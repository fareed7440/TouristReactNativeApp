import ActionTypes from "./actionTypes"
import { Actions } from 'react-native-router-flux';
import * as DB from '../../firebase/database'

function signupRequest(data){
    console.log('datataa',data)
    return dispatch=>{
dispatch(SignupRequest());
if(data.password==data.cpassword){
  return DB.auth.createUserWithEmailAndPassword(data.email,data.password).then((send)=>{
      const ref = DB.database.ref('signupUser/'+send.uid);
      ref .set({
         uid : send.uid,
          name : data.name,
          email : data.email
      },
    success =>{
        dispatch(SignupRequestSuccess({
             uid: data.uid,
          name : data.name,
          email : data.email
        })),
        alert('successfully signup')
        Actions.loginCon()
    }
    )
  })  
}else{
    alert('password did not matched')
}

    }
} 





function SignupRequest(){
    return{
        type : ActionTypes.SIGNUP_REQUEST
    }
}

function SignupRequestSuccess(data){
    return{
        type: ActionTypes.SIGNUP_REQUEST_SUCCESS,
        data
    }
}


export default signupRequest