import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { careSignsReducer } from './reducers/careSignsReducer';
import { postReducer } from './reducers/postReducer';

const rootReducer = combineReducers({
    post: postReducer,
    careSigns: careSignsReducer
})

export default createStore(rootReducer, applyMiddleware(thunk))