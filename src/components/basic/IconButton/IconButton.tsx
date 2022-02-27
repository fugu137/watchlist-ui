import { MouseEventHandler, ReactElement } from 'react';
import styles from './IconButton.module.css';

type Props = {
    /** Sets the icon for the button */
    icon: 'delete' | 'home';

    /** Optional click handler */
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

function IconButton ({ icon, onClick }: Props): ReactElement {
    return (
        <button className={styles.button} onClick={onClick}>
            <svg className={styles.icon} viewBox="0 0 24 24">
                <title>{icon + ' button'}</title>
                <path d={paths[icon]} />
            </svg>
        </button>
    );
}

const paths = {
    delete:
        'M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z',
    home:
        'M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 11 21 L 11 15 L 13 15 L 13 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z M 12 4.7910156 L 18 10.191406 L 18 11 L 18 19 L 15 19 L 15 13 L 9 13 L 9 19 L 6 19 L 6 10.191406 L 12 4.7910156 z',
};

export default IconButton;
