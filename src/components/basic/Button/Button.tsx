import { MouseEventHandler, ReactElement } from 'react';
import styles from '../Button/Button.module.css';

type Props = {
    /** Sets the text content of the button */
    text: string;

    /** Sets the button variant (determines the style of the button) */
    variant: 'primary' | 'secondary';

    /** Optional click handler */
    onClick?: MouseEventHandler<HTMLButtonElement>;

    /** Set to true to disable the button */
    disabled?: boolean;
}

function Button({ text, variant, onClick, disabled = false }: Props): ReactElement {
    const styleList = [styles.button, styles[variant]];
    disabled && styleList.push(styles.disabled);
    
    return (
        <button className={styleList.join(' ')} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
}

export default Button;