import axios from 'axios';
import AccountApi from './accountApi';

jest.mock('axios');

const url = '/accounts';

const username = 'username';
const password = 'password';

describe('AccountApi', () => {
    it('should create account when details are valid', async () => {
        const details = {
            username: username,
            password: password,
        };

        axios.post.mockResolvedValueOnce({ status: 200 });
        const response = await AccountApi.createAccount(username, password, password);

        expect(axios.post).toHaveBeenCalledWith(url, details);
        expect(response).toStrictEqual({
            accountCreated: true,
            message: 'Account successfully created.'
        });
    });

    it('should not create an account when details are invalid', async () => {
        await AccountApi.createAccount(username, password, 'differentPassword');

        expect(axios.post).not.toHaveBeenCalled();
    });

    it('should return an error if passwords don`t match', async () => {
        const response = await AccountApi.createAccount(username, password, 'differentPassword');

        expect(response).toStrictEqual({
            accountCreated: false,
            message: 'Passwords don`t match. Please try again.'
        });
    });

    it('should return `username already exists` if username already exists', async () => {
        axios.post.mockRejectedValueOnce({ response: { status: 409 } });

        const response = await AccountApi.createAccount(username, password, password);

        expect(response).toStrictEqual({
            accountCreated: false,
            message: 'Username already exists. Please try again with a different username.'
        });
    });

    it('should return a general error if the create account request fails', async () => {
        axios.post.mockRejectedValueOnce({ response: { status: 500 } });

        const response = await AccountApi.createAccount(username, password, password);

        expect(response).toStrictEqual({
            accountCreated: false,
            message: 'Something went wrong. Please try again later.'
        });
    });
});
