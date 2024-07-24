import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '../routes';
import styles from './Clinic.module.css';

const router = createBrowserRouter(routes);

export const Clinic = () => {
	return (
		<div className={styles.container}>
			<RouterProvider router={router} />
		</div>
	);
};
