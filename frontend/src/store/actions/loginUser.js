import { ACTION_TYPE } from '../constants';

export const loginUser = (user) => ({
	type: ACTION_TYPE.LOGIN,
	payload: user,
});
