import axios from 'axios';

const AccountApi = {
    createAccount: async (username, password, repeat) => {
        const url = '/accounts';

        if (password !== repeat) {
            return { 
                accountCreated: false,
                error: 'Passwords don`t match. Please try again.' 
            };
        }

        const details = { 
            username: username,
            password: password,
        };

        return await axios
            .post(url, details)
            .then(() => {
                return { 
                    accountCreated: true,
                    error: null 
                };
            })
            .catch((error) => {
                if (error.response && error.response.status === 409) {
                    return {
                        accountCreated: false,
                        error: 'Username already exists. Please try again with a different username.',
                    }
                }
                return {
                    accountCreated: false,
                    error: 'Something went wrong. Please try again later.',
                };
            });
    },
};

export default AccountApi;
