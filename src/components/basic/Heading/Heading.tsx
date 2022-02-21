import styles from './Heading.module.css';
import { ReactElement } from 'react';

interface Props {
    /** Sets the heading type (determines the size of the heading) */
    type: 'h1' | 'h2' | 'h3';

    /** Sets the heading text */
    text: string;
}

function Heading({ type, text }: Props) {
    return (
        <div>
            {renderHeading(type, text)}
        </div>
    )
}

const renderHeading = (type: string, text: string): ReactElement | null => {
    switch (type) {
        case 'h1': 
            return <h1 className={styles.h1}>{text}</h1>
        case 'h2':
            return <h2 className={styles.h2}>{text}</h2>
        case 'h3':
            return <h3 className={styles.h3}>{text}</h3>
        default:
            return null;
    }
}

export default Heading;