import styles from './FormError.module.css';

export const FormError = ({ children }) => {
	return <div className={styles.error}>{children}</div>;
};
