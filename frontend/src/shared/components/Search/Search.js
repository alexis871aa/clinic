import styles from './Search.module.css';

export const Search = ({ searchPhrase, onChange }) => {
	return (
		<div className={styles.search}>
			<input
				className={styles.inputSearch}
				type="text"
				id="search"
				name="search"
				value={searchPhrase}
				onChange={onChange}
				placeholder={'Введите ФИО или проблему...'}
			/>
		</div>
	);
};
