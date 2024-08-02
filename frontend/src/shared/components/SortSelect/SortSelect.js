import styles from './SortSelect.module.css';

export const SortSelect = ({ options, value, onChange }) => {
	return (
		<div className={styles.sortSelect}>
			<label htmlFor="sortSelect" className={styles.labelSorSelect}>
				Сортировка:
			</label>
			<select id="sortSelect" value={value} onChange={onChange}>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};
