import { ACTION_TYPE } from '../constants';
import { request } from '../../shared/lib';
import { loadOrdersAsync } from '../actions';
import { PAGINATION_LIMIT } from '../../shared/constants';

const initialState = {
	orders: [],
	isLoading: false,
	error: null,
	lastPage: 1,
};

export const orderReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.ADD_ORDER:
			return {
				...state,
				orders: [...state.orders, payload],
			};
		case ACTION_TYPE.LOAD_ORDERS:
			return {
				...state,
				orders: [...payload.orders],
				isLoading: false,
				lastPage: payload.lastPage,
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

export const loadOrders =
	({ searchPhrase, page, sortBy, order }) =>
	async (dispatch) => {
		dispatch({ type: ACTION_TYPE.LOAD_REQUESTED });
		try {
			const { data } = await request(
				`/orders?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}&sortBy=${sortBy}&order=${order}`,
			);
			dispatch(loadOrdersAsync(data));
		} catch (error) {
			dispatch({
				type: ACTION_TYPE.LOAD_ORDERS_REQUESTED_FAILED,
				payload: error.message,
			});
		}
	};
