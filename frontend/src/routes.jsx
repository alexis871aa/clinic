import { Login, Order, Orders } from './pages';

export const routes = [
	{
		path: '/',
		element: <Order />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/orders',
		element: <Orders />,
	},
];
