import { addOrder } from './addOrder';
import { request } from '../../shared/lib';

export const addOrderAsync = (order) => async (dispatch) => {
	await request('/orders', 'post', order);

	dispatch(addOrder(order));
};
