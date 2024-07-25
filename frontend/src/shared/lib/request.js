import axios from 'axios';

export const request = (path, method, data) =>
	axios({
		url: '/api' + path,
		method: method || 'get',
		data: data || null,
	}).then((res) => res.data);
