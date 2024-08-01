import { ACTION_TYPE } from '../constants';

export const loadOrdersAsync = (data) => {
	return {
		type: ACTION_TYPE.LOAD_ORDERS,
		payload: data,
	};
};
