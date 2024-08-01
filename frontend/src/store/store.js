import {
	combineReducers,
	legacy_createStore as createStore,
	applyMiddleware,
} from 'redux';
import { orderReducer, userReducer } from './reducers';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
	order: orderReducer,
	user: userReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
