import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AccountApi from '../../api/Account/accountApi';
import CreateAccount from './CreateAccount';

jest.mock('../../api/Account/accountApi');

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

describe('Create Account', () => {
    it('should display create account form', () => {
        render(<CreateAccount />);

        expect(screen.getByLabelText('Username:')).toBeInTheDocument();
        expect(screen.getByLabelText('Password:')).toBeInTheDocument();
        expect(screen.getByLabelText('Repeat Password:')).toBeInTheDocument();

        expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
    });

    it('should create an account with form details', async () => {
        const username = 'testUsername';
        const password = 'testPassword';

        render(<CreateAccount />);

        AccountApi.createAccount.mockResolvedValueOnce({ 
            accountCreated: true,
            message:'Account successfully created.' 
        });

        const usernameField = screen.getByLabelText('Username:');
        const passwordField = screen.getByLabelText('Password:');
        const repeatField = screen.getByLabelText('Repeat Password:');
        const button = screen.getByRole('button', { name: 'Create Account' });

        fireEvent.change(usernameField, { target: { value: username } });
        fireEvent.change(passwordField, { target: { value: password } });
        fireEvent.change(repeatField, { target: { value: password } });

        await waitFor(() => fireEvent.click(button));

        expect(AccountApi.createAccount).toHaveBeenCalledWith(username, password, password);
    });

    it('should display success message if account created', async () => {
        const successMessage = 'Test success message.';

        render(<CreateAccount />);

        AccountApi.createAccount.mockResolvedValueOnce({  
            accountCreated: true,
            message: successMessage,  
        });

        const button = screen.getByRole('button', { name: 'Create Account' });
        await waitFor(() => fireEvent.click(button));

        expect(screen.getByText(successMessage)).toBeInTheDocument();
    });

    it('should display error message if cannot create an account', async () => {
        const errorMessage = 'Test error message.';

        render(<CreateAccount />);

        AccountApi.createAccount.mockResolvedValueOnce({  
            accountCreated: false,
            message: errorMessage,  
        });

        const button = screen.getByRole('button', { name: 'Create Account' });
        await waitFor(() => fireEvent.click(button));

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
});
