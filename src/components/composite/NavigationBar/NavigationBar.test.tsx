import { fireEvent, render, screen } from '@testing-library/react';
import NavigationBar from './NavigationBar';

describe('NavigationBar', () => {
    const mockLogoutClickHandler = jest.fn();
    const mockSigninClickHandler = jest.fn();
    
    const otherProps = {
        onLogoutClick: mockLogoutClickHandler,
        onSigninClick: mockSigninClickHandler,
    }

    it('should display sign in button and not log out button if no user is logged in', () => {
        render(<NavigationBar user={null} {...otherProps}/>);

        expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Log out' })).not.toBeInTheDocument();
    });

    it('should display log out button and not sign in button if user is logged in', () => {
        render(<NavigationBar user={{ username: 'Jacqueline' }} {...otherProps} />);

        expect(screen.getByRole('button', { name: 'Log out' })).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Sign in' })).not.toBeInTheDocument();
    });

    it('should display text "Welcome <username>" if user is logged in', () => {
        const username = 'Jacqueline';

        render(<NavigationBar user={{ username }} {...otherProps} />);

        expect(screen.getByText(`Welcome, ${username}`)).toBeInTheDocument();
    });

    it('should call onLogoutClick callback if log out button clicked', () => {
        render(<NavigationBar user={{ username: 'Jacqueline' }} {...otherProps} />);

        const logoutButton = screen.getByRole('button', { name: 'Log out' });
        fireEvent.click(logoutButton);

        expect(mockLogoutClickHandler).toHaveBeenCalledTimes(1);
    });
    
    it('should call onSigninClick callback if sign in button clicked', () => {
        render(<NavigationBar user={null} {...otherProps} />);

        const signinButton = screen.getByRole('button', { name: 'Sign in' });
        fireEvent.click(signinButton);

        expect(mockSigninClickHandler).toHaveBeenCalledTimes(1);
    });
});
