import { ACTION_TYPE } from '../constants';

export const addOrder = (order) => ({
	type: ACTION_TYPE.ADD_ORDER,
	payload: order,
});
