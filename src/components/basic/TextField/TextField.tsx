import { ChangeEvent, ReactElement } from "react";
import styles from './TextField.module.css';


type Props = {
     /** Sets the type of the text field. */
    type: 'text' | 'email' | 'password';
     /** Sets the label text if provided. */
    label?: string;
    /** Sets the text content. */
    value?: string;
    /** Sets an error message if provided. */
    error?: string;
    /** Sets an onChange function. */
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

function TextField({ type, label, value, error, onChange }: Props): ReactElement {
    return (
        <figure className={styles.textField}>
            <label className={styles.label}>{label}</label>
            <input type={type} value={value} onChange={onChange} className={styles.input} />
            <figcaption className={styles.error}>{error}</figcaption>
        </figure>
    );
}

export default TextField;