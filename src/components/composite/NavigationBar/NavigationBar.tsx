import { ReactElement } from 'react';
import { User } from '../../../types';
import Button from '../../basic/Button/Button';
import Heading from '../../basic/Heading/Heading';
import styles from './NavigationBar.module.css';

interface Props {
    /** Sets the logged in user */
    user: User | null;
    
    /** Function to be called when the "Log out" button is clicked */
    onLogoutClick: () => void; 
    
    /** Function to be called when the "Sign in" button is clicked */
    onSigninClick: () => void;
}

function NavigationBar ({ user, onLogoutClick, onSigninClick }: Props): ReactElement {
    return (
        <nav className={styles.navigationBar}>
            {user ? (
                <>
                    <Heading type="h3" text={`Welcome, ${user.username}`} />
                    <Button text="Log out" type="primary" onClick={onLogoutClick} />
                </>
            ) : (
                <>
                    <Heading type="h3" text="" />
                    <Button text="Sign in" type="secondary" onClick={onSigninClick} />
                </>
            )}
        </nav>
    );
}

export default NavigationBar;
