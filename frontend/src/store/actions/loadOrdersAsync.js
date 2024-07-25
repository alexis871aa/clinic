import { ACTION_TYPE } from '../constants';

export const loadOrdersAsync = (orders) => {
	return {
		type: ACTION_TYPE.LOAD_ORDERS,
		payload: orders,
	};
};
