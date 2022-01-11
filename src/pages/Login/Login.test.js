import { screen, render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Login from './Login';

const mockLoginHandler = jest.fn();

describe('Login', () => {
    it('should display login form', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        expect(screen.getByLabelText('Username:')).toBeInTheDocument();
        expect(screen.getByLabelText('Password:')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });

    it('should login with user-submitted details on form submit', () => {
        const username = 'testUsername';
        const password = 'testPassword';

        render(
            <MemoryRouter>
                <Login loginHandler={mockLoginHandler} />
            </MemoryRouter>
        );

        const usernameField = screen.getByLabelText('Username:');
        const passwordField = screen.getByLabelText('Password:');
        const button = screen.getByRole('button', { name: 'Login' });

        fireEvent.change(usernameField, { target: { value: username } });
        fireEvent.change(passwordField, { target: { value: password } });
        fireEvent.click(button);

        expect(mockLoginHandler).toHaveBeenCalledWith(username, password);
    });

    it('should display error message', () => {
        const error = 'Test error message.';

        render(
            <MemoryRouter>
                <Login error={error} />
            </MemoryRouter>
        );

        expect(screen.getByText(error)).toBeInTheDocument();
    });
});
