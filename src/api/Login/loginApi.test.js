import axios from 'axios';
import LoginApi from './loginApi';

jest.mock('axios');

const STORAGE_KEY = process.env.REACT_APP_STORAGE_KEY;
const username = 'username';
const password = 'password';

describe('LoginApi', () => {
    describe('login', () => {
        it('calls backend with correct credentials', async () => {
            const url = '/login';

            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);

            axios.post.mockResolvedValueOnce({ status: 200 });
            await LoginApi.login(username, password);

            expect(axios.post).toHaveBeenCalledWith(url, formData);
        });

        it('returns correct response if login credentials are correct', async () => {
            const expectedResponse = {
                loggedInUser: username,
                error: null,
            };

            axios.post.mockResolvedValueOnce({ status: 200 });
            const response = await LoginApi.login(username, password);

            expect(response).toStrictEqual(expectedResponse);
        });

        it('returns correct response if login credentials are incorrect', async () => {
            const expectedResponse = {
                error: 'Invalid login details. Please check your username and password and try again.',
            };

            axios.post.mockRejectedValue({ response: { status: 401 } });
            const response = await LoginApi.login(username, password);

            expect(response).toStrictEqual(expectedResponse);
        });

        it('returns correct response if server unavailable', async () => {
            const expectedResponse = {
                error: 'The server is unavailable. Please try again later.',
            };

            axios.post.mockRejectedValue(new Error());
            const response = await LoginApi.login(username, password);

            expect(response).toStrictEqual(expectedResponse);
        });

        it('stores username in localstorage on successful login', async () => {
            localStorage.clear();
            axios.post.mockResolvedValueOnce({ status: 200 });
            await LoginApi.login(username, password);

            expect(localStorage.getItem(STORAGE_KEY)).toBe(username);
        });

        it('does not store username in localstorage on unsuccessful login', async () => {
            localStorage.clear();
            axios.post.mockRejectedValueOnce(new Error());
            await LoginApi.login(username, password);

            expect(localStorage.getItem(STORAGE_KEY)).toBe(null);
        });
    });

    describe('logout', () => {
        it('makes call to correct backend endpoint', async () => {
            const url = '/logout';

            axios.post.mockResolvedValueOnce({ status: 200 });
            await LoginApi.logout();

            expect(axios.post).toHaveBeenCalledWith(url);
        });

        it('returns correct response if logout successful', async () => {
            const expectedResponse = {
                loggedInUser: null,
                error: null,
            };

            axios.post.mockResolvedValueOnce({ status: 200 });
            const response = await LoginApi.logout();

            expect(response).toStrictEqual(expectedResponse);
        });

        it('returns correct response if logout not successful', async () => {
            const expectedResponse = {
                error: 'Server unavailable. Unable to log out. Please try again later.',
            };

            axios.post.mockRejectedValue({ response: { status: 500 } });
            const response = await LoginApi.logout();

            expect(response).toStrictEqual(expectedResponse);
        });

        it('removes username from localstorage only on successful logout', async () => {
            localStorage.clear();

            axios.post.mockResolvedValueOnce({ status: 200 });
            await LoginApi.login(username, password);
            expect(localStorage.getItem(STORAGE_KEY)).toBe(username);

            axios.post.mockRejectedValueOnce(new Error());
            await LoginApi.logout();
            expect(localStorage.getItem(STORAGE_KEY)).toBe(username);

            axios.post.mockResolvedValueOnce({ status: 200 });
            await LoginApi.logout();
            expect(localStorage.getItem(STORAGE_KEY)).toBe(null);
        });
    });

    describe('storage key', () => {
        it('loads storage key from environment', () => {
            expect(STORAGE_KEY).toBe('Watchlist');
        });
    });

    describe('principal', () => {
        it('returns correct details if user logged in', async () => {
            axios.get.mockResolvedValueOnce({ status: 200, data: 'Michael' });
            const response = await LoginApi.getPrincipal();

            expect(axios.get).toHaveBeenCalledWith('/accounts/principal');
            expect(response).toContain('Michael');
        });

        it('returns null if no user logged in', async () => {
            axios.get.mockRejectedValueOnce(new Error());
            const response = await LoginApi.getPrincipal();

            expect(response).toBe(null);
        });
    });
});
