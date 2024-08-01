import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { addOrderAsync } from '../../store/actions';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Error } from '../../shared/components';
import styles from './Order.module.css';

const initialData = {
	name: '',
	phone: '',
	problem: '',
};

const orderSchema = yup.object().shape({
	name: yup
		.string()
		.required('Заполните ФИО')
		.matches(
			/^[А-ЯЁ][а-яё]+(?: [А-ЯЁ][а-яё]+){1,2}$/,
			'Введите пожалуйста корректное ФИО, можно только фамилию и имя!',
		)
		.min(3, 'В поле ФИО должно быть минимум 3 символа')
		.max(50, 'В поле ФИО должно быть максимум 50 символов'),
	phone: yup
		.string()
		.required('Введите пожалуйста номер телефона!')
		.matches(
			/^\+(74\d{9}|79\d{9})$/,
			'Введите пожалуйста корректный номер телефона! Формат должен быть +7(код)номер',
		),
	problem: yup
		.string()
		.required('Опишите пожалуйста вашу проблему!')
		.min(3, 'В описании должно быть минимум 3 символа')
		.max(190, 'В описании должно быть максимум 190 символов'),
});

export const Order = () => {
	const dispatch = useDispatch();
	const [data, setData] = useState(initialData);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			phone: '',
			problem: '',
		},
		resolver: yupResolver(orderSchema),
	});
	const navigate = useNavigate();

	const handleChange = ({ target }) => {
		setData((prevState) => ({
			...prevState,
			[target.name]: target.value,
		}));

		formError = '';
	};

	const onSubmit = () => {
		dispatch(addOrderAsync(data));

		setData(initialData);
	};

	const handleClick = () => {
		navigate('/login');
	};

	let formError =
		errors?.name?.message || errors?.phone?.message || errors?.problem?.message;

	return (
		<div className={styles.container}>
			<div className={styles.title}>Запись к врачу</div>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="name">ФИО</label>
				<input
					type="text"
					id="name"
					name="name"
					className={styles.inputName}
					placeholder="Введите ваше ФИО..."
					required
					value={data.name}
					{...register('name', { onChange: handleChange })}
				/>
				<label htmlFor="phone">Номер телефона</label>
				<input
					type="text"
					id="phone"
					name="phone"
					className={styles.inputPhone}
					placeholder="Введите номер вашего телефона..."
					required
					value={data.phone}
					{...register('phone', { onChange: handleChange })}
				/>
				<label htmlFor="problem">Опишите вашу проблему</label>
				<textarea
					id="problem"
					name="problem"
					className={styles.textArea}
					placeholder="Опишите вашу проблему..."
					required
					value={data.problem}
					{...register('problem', { onChange: handleChange })}
				/>
				<button type="submit" disabled={formError}>
					Отправить
				</button>
				<div className={styles.errorWrapper}>
					{formError && <Error>{formError}</Error>}
				</div>
			</form>
			<button className={styles.loginButton} onClick={handleClick}>
				Войти
			</button>
		</div>
	);
};
