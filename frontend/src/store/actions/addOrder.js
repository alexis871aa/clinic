import { ACTION_TYPE } from '../constants';

export const addOrder = (order) => {
	return {
		type: ACTION_TYPE.ADD_ORDER,
		payload: order,
	};
};
