import styles from './Order.module.css';

export const Order = () => {
	const handleSubmit = () => {};

	return (
		<div className={styles.container}>
			<div className={styles.title}>Запись к врачу</div>
			<form className={styles.form} onSubmit={handleSubmit}>
				<label htmlFor="name">ФИО</label>
				<input
					type="text"
					name="name"
					className={styles.inputName}
					placeholder="Введите ваше ФИО"
					required
				/>
				<label htmlFor="phone">Номер телефона</label>
				<input
					type="text"
					name="phone"
					className={styles.inputPhone}
					placeholder="Введите номер вашего телефона"
					required
				/>
				<label htmlFor="problem">Опишите вашу проблему</label>
				<textarea
					name="problem"
					className={styles.textArea}
					placeholder="Опишите вашу проблему"
					required
				/>
				<button type="submit">Отправить</button>
			</form>
		</div>
	);
};
