import axios from 'axios';

const AccountApi = {
    createAccount: async (username, password, repeat) => {
        const url = '/accounts';

        if (password !== repeat) {
            return { 
                accountCreated: false,
                message: 'Passwords don`t match. Please try again.' 
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
                    message: 'Account successfully created.' 
                };
            })
            .catch((error) => {
                if (error.response && error.response.status === 409) {
                    return {
                        accountCreated: false,
                        message: 'Username already exists. Please try again with a different username.',
                    }
                }
                return {
                    accountCreated: false,
                    message: 'Something went wrong. Please try again later.',
                };
            });
    },
};

export default AccountApi;
