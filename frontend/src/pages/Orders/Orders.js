import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadOrders } from '../../store/reducers';
import {
	selectLastPage,
	selectOrders,
	selectOrdersError,
	selectOrdersLoading,
} from '../../store/selectors';
import { Error, Pagination, Search, SortSelect } from '../../shared/components';
import { convertPhone, debounce } from '../../shared/lib';
import { sortOption } from '../../shared/constants';
import styles from './Orders.module.css';

export const Orders = () => {
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const [sortBy, setSortBy] = useState({ path: 'date', order: 'asc' });
	const [sortSign, setSortSign] = useState('dateASC');
	const [page, setPage] = useState(1);
	const lastPage = useSelector(selectLastPage);
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

		dispatch(
			loadOrders({
				searchPhrase,
				page,
				sortBy: sortBy.path,
				order: sortBy.order,
			}),
		);
	}, [shouldSearch, sortBy, page]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 1200), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	if (error) {
		return <Error>{error}</Error>;
	}

	if (isLoading) {
		return <div className={styles.loader}>Загрузка заявок...</div>;
	}

	const onSort = ({ target }) => {
		setSortSign(target.value);

		const selectedOption = sortOption.find((option) => option.value === target.value);

		switch (selectedOption.value) {
			case 'nameASC':
				setSortBy((prevState) => ({
					...prevState,
					path: 'name',
					order: 'asc',
				}));
				break;
			case 'nameDESC':
				setSortBy((prevState) => ({
					...prevState,
					path: 'name',
					order: 'desc',
				}));
				break;
			case 'problemASC':
				setSortBy((prevState) => ({
					...prevState,
					path: 'problem',
					order: 'asc',
				}));
				break;
			case 'problemDESC':
				setSortBy((prevState) => ({
					...prevState,
					path: 'problem',
					order: 'desc',
				}));
				break;
			case 'dateDESC':
				setSortBy((prevState) => ({
					...prevState,
					path: 'date',
					order: 'desc',
				}));
				break;
			case 'dateASC':
			default:
				setSortBy((prevState) => ({
					...prevState,
					path: 'date',
					order: 'asc',
				}));
				break;
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>Заявки с формы</div>
			<div>
				<Search searchPhrase={searchPhrase} onChange={onSearch} />
				<SortSelect value={sortSign} options={sortOption} onChange={onSort} />
			</div>
			{orders.length > 0 ? (
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
			) : (
				<div className={styles.noOrders}>Такие заявки не найдены!</div>
			)}
			{lastPage > 1 && orders.length > 0 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};
