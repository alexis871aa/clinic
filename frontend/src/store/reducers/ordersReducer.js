import { ACTION_TYPE } from '../constants';
import { request } from '../../shared/lib';
import { loadOrdersAsync } from '../actions';

const initialState = {
	orders: [],
	isLoading: false,
	error: null,
};

export const ordersReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.ADD_ORDER:
			return {
				...state,
				orders: [...state, payload],
			};
		case ACTION_TYPE.LOAD_ORDERS:
			return {
				...state,
				orders: state.orders.concat(payload),
				isLoading: false,
			};
		case ACTION_TYPE.LOAD_REQUESTED:
			return {
				...state,
				isLoading: true,
			};
		case ACTION_TYPE.LOAD_ORDERS_REQUESTED_FAILED:
			return {
				...state,
				orders: [],
				isLoading: false,
				error: payload,
			};
		default:
			return state;
	}
};

export const loadOrders = (args) => async (dispatch) => {
	dispatch({ type: ACTION_TYPE.LOAD_REQUESTED });
	try {
		const orders = request('/orders');
		dispatch(loadOrdersAsync(orders));
	} catch (error) {
		dispatch({
			type: ACTION_TYPE.LOAD_ORDERS_REQUESTED_FAILED,
			payload: error.message,
		});
	}
};
