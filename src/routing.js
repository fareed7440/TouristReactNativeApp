import SignUpCon from './container/signupCon'
import React,{Component} from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginCon from './container/loginCon'
import Maps from './components/map'

class Routing extends Component{
    render(){
        return(
 <Router > 

<Scene key = "signupCon">
     
       <Scene key="signupCon" component={SignUpCon} hideNavBar = {true} />
          <Scene key="loginCon" component={LoginCon} hideNavBar = {true} />
           <Scene key="map" component={Maps} hideNavBar = {true} />
        
            </Scene>


            </Router>

        )
    }
}



export default Routing;