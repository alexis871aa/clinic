import {
	combineReducers,
	legacy_createStore as createStore,
	applyMiddleware,
} from 'redux';
import { ordersReducer } from './reducers';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
	orders: ordersReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
