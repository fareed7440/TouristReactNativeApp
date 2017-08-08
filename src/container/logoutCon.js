import Maps from '../components/map'
import { connect } from 'react-redux'
import logoutRequest from '../store/actions/logoutAct'
function mapStateToProps(state) {
    return {
        Logout: state.LogoutReducer

    }

}

function mapDispatchToProps(dispatch) {
    return {
        logoutReq: (data) => dispatch(logoutRequest(data))

    }
}



MapsCon = connect(mapStateToProps, mapDispatchToProps)(Maps)
export default MapsCon;
