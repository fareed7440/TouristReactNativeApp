import React, { Component } from 'react'
import Reduxthunk from 'redux-thunk'
import { Provider } from 'react-redux'
import {
    createStore,
    applyMiddleware
} from 'redux'
import rootReducer from './reducer/rootReducer'
import Routing from '../routing'

class Store extends Component {
    render() {
        const store = createStore(rootReducer,{}, applyMiddleware(Reduxthunk));
        return (
            <Provider store={store}>
                <Routing />

            </Provider>
        )
    }
}

export default Store