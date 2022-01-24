import React, { ReactElement } from 'react';
import styles from './Button/Button.module.css';

type Props = {
    text: string;
}

function Button({ text }: Props): ReactElement {
    return (
        <button className={styles.button}>
            {text}
        </button>
    );
}

export default Button;