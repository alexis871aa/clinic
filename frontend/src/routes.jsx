import { Login, Order, Orders } from './pages';
import { Error } from './shared/components';

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
	{
		path: '*',
		element: <Error>Такая страница не найдена!</Error>,
	},
];
