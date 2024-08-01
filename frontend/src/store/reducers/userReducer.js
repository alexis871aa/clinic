import { ACTION_TYPE } from '../constants';

const initialState = {
	id: null,
	email: null,
	roleId: null,
	registeredAt: null,
};

export const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.LOGIN:
			return {
				...state,
				user: payload,
			};
		case ACTION_TYPE.LOGOUT:
			return initialState;
		default:
			return state;
	}
};
