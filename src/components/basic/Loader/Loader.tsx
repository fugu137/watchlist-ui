import { ReactElement } from "react";
import styles from './Loader.module.css';


function Loader(): ReactElement {
    return (
        <span className={styles.loader} role="progressbar">
            <span className={styles.dot1}></span>
            <span className={styles.dot2}></span>
            <span className={styles.dot3}></span>
        </span>
    );
}

export default Loader;