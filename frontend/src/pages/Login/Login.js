import { useState } from 'react';
import { FormError } from '../../shared/components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './Login.module.css';

const userSchema = yup.object().shape({
	email: yup
		.string()
		.required('Заполните электронную почту')
		.matches(
			/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
			'Введите пожалуйста корректный адрес электронной почты!',
		),
	password: yup
		.string()
		.required('Введите пожалуйста пароль для входа!')
		.matches(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву!')
		.matches(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву!')
		.matches(/\d/, 'Пароль должен содержать хотя бы одну цифру!')
		.matches(
			/[@$!%*?&]/,
			'Пароль должен содержать хотя бы один специальный символ из @$!%*?&!',
		),
});

const initialDataUser = {
	email: '',
	password: '',
};

export const Login = () => {
	const [dataUser, setDataUser] = useState(initialDataUser);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(userSchema),
	});

	const handleChange = ({ target }) => {
		setDataUser((prevState) => ({
			...prevState,
			[target.name]: target.value,
		}));
	};

	const onSubmit = (event) => {};

	const userFormError = errors.email?.message || errors?.password?.message;

	return (
		<div className={styles.container}>
			<div className={styles.title}>Вход</div>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="email">Электронная почта</label>
				<input
					type="email"
					id="email"
					name="email"
					className={styles.inputEmail}
					placeholder="Введите ваш электронную почту..."
					required
					value={dataUser.email}
					{...register('email', { onChange: handleChange })}
				/>
				<label htmlFor="phone">Пароль</label>
				<input
					type="password"
					id="password"
					name="password"
					className={styles.inputPassword}
					placeholder="Введите ваш пароль..."
					required
					value={dataUser.password}
					{...register('password', { onChange: handleChange })}
				/>
				<button type="submit" disabled={userFormError}>
					Войти
				</button>
				<div className={styles.errorWrapper}>
					{userFormError && <FormError>{userFormError}</FormError>}
				</div>
			</form>
		</div>
	);
};
