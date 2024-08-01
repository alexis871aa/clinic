import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadOrders } from '../../store/reducers';
import {
	selectOrders,
	selectOrdersError,
	selectOrdersLoading,
} from '../../store/selectors';
import { Error } from '../../shared/components';
import { convertPhone } from '../../shared/lib';
import { useNavigate } from 'react-router-dom';
import styles from './Orders.module.css';

export const Orders = () => {
	const orders = useSelector(selectOrders);
	const isLoading = useSelector(selectOrdersLoading);
	const error = useSelector(selectOrdersError);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const user = JSON.parse(sessionStorage.getItem('userData'));

		if (!user) {
			navigate('/login');
			return;
		}

		dispatch(loadOrders());
	}, [dispatch]);

	if (error) {
		return <Error>{error}</Error>;
	}

	if (isLoading) {
		return <div className={styles.loader}>Загрузка..</div>;
	}

	return (
		<div className={styles.container}>
			<div className={styles.title}>Заявки с формы</div>
			<div></div>
			<table className={styles.table}>
				<thead>
					<tr>
						<th>Дата отправки</th>
						<th>ФИО</th>
						<th>Телефон</th>
						<th>Проблема</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => (
						<tr key={order.id}>
							<td>{new Date(order.sendAt).toLocaleString()}</td>
							<td>{order.name}</td>
							<td>{convertPhone(order.phone)}</td>
							<td>{order.problem}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
