import { ChangeEvent, ReactElement } from "react";
import styles from './TextField.module.css';


type Props = {
    /** Sets the type of the text field */
    type: 'text' | 'email' | 'password';
    /** Sets the label text if provided */
    label?: string;
    /** Sets the text content */
    value?: string;
    /** Sets an error message if provided */
    error?: string;
    /** Sets an onChange function */
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

function TextField({ type, label, value, error, onChange }: Props): ReactElement {
    const style = `${styles.input} ${error ? styles.invalid : ''}`;

    return (
        <div className={styles.textField}>
            <label className={styles.label} style={label ? { marginBottom: '3px' } : {}}>{label}</label>
            <input type={type} maxLength={46} value={value} onChange={onChange} className={style} />
            <span className={styles.errorMessage}>
                {error &&
                    <svg className={styles.errorIcon} viewBox="0 0 24 24" >
                        <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 9 L 13 9 L 13 7 L 11 7 z M 11 11 L 11 17 L 13 17 L 13 11 L 11 11 z" />
                    </svg>}
                {error}
            </span>
        </div>
    );
}

export default TextField;