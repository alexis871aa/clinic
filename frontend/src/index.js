import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Clinic } from './Clinic';
import { store } from './store';
import './index.css';

const router = createBrowserRouter([
	{
		path: '/*',
		element: <Clinic />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>,
);
