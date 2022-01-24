import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension'

import rootReducer from '../../redux/reducers';

const initalState = {

}

const middleware = [thunk]

const store = createStore(rootReducer, initalState, composeWithDevTools(applyMiddleware(thunk)))

export default store;