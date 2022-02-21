import { MouseEventHandler, ReactElement } from 'react';
import styles from './Button.module.css';

type Props = {
    /** Sets the text content of the button */
    text: string;

    /** Sets the button type (determines the style of the button) */
    type: 'primary' | 'secondary';

    /** Sets the size of the button. Defaults to regular */
    size?: 'regular' | 'large'

    /** Optional click handler */
    onClick?: MouseEventHandler<HTMLButtonElement>;

    /** Set to true to disable the button */
    disabled?: boolean;
}

function Button({ text, type, size = 'regular', onClick, disabled = false }: Props): ReactElement {
    const style = `${styles.button} ${styles[type]} ${styles[size]} ${disabled ? styles.disabled : ''}`;

    return (
        <button className={style} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
}

export default Button;