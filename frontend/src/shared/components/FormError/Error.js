import styles from './Error.module.css';

export const Error = ({ children }) => {
	return <div className={styles.error}>{children}</div>;
};
