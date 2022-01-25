import { ReactElement } from "react"
import styles from './TextField.module.css';

type InputType = 'text' | 'email' | 'number' | 'password';

type Props<T> = {
    /** Sets the type of the text field. */
    type: T;
    /** Sets the label text if provided. */
    label?: T extends 'number' ? number : string;
    /** Sets placeholder text if provided. */
}

function TextField({ type, label }: Props<InputType>): ReactElement {
    return (
        <div className={styles.wrapper}>
            {label && <label className={styles.label}>{label}</label>}
            <input type={type} className={styles.input}></input>
        </div>
    );
}

export default TextField;