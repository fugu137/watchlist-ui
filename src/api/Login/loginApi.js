import axios from 'axios';

const STORAGE_KEY = process.env.REACT_APP_STORAGE_KEY;

const LoginApi = {
    login: async (username, password) => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        const url = '/login';

        return await axios
            .post(url, formData)
            .then(() => {
                localStorage.setItem(STORAGE_KEY, username);
                return {
                    loggedIn: username,
                    error: null,
                };
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    return {
                        error: 'Invalid login details. Please check your username and password and try again.',
                    };
                } else {
                    return {
                        error: 'The server is unavailable. Please try again later.',
                    };
                }
            });
    },
    logout: async () => {
        const url = '/logout';

        return await axios
            .post(url)
            .then(() => {
                localStorage.removeItem(STORAGE_KEY);
                return {
                    loggedIn: null,
                    error: null,
                };
            })
            .catch(() => ({
                error: 'Server unavailable. Unable to log out. Please try again later.',
            }));
    },
    getPrincipal: async () => {
        const url = '/accounts/principal';

        return await axios
            .get(url)
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                }
            })
            .catch(() => {
                return null;
            });
    },
};

export default LoginApi;
