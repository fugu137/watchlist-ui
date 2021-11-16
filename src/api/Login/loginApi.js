import axios from 'axios'

const LoginApi = {
    login: async (username, password) => {
        const formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)

        const url = '/login'

        return await axios
            .post(url, formData)
            .then(() => ({
                loggedIn: true,
                error: null,
            }))
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    return {
                        error:
                            'Invalid login details. Please check your username and password and try again.',
                    }
                } else {
                    return {
                        error:
                            'The server is unavailable. Please try again later.',
                    }
                }
            })
    },
    logout: async () => {
        const url = '/logout'

        return await axios
            .post(url)
            .then(() => ({
                loggedIn: false,
                error: null,
            }))
            .catch(() => ({
                error:
                    'Server unavailable. Unable to log out. Please try again later.',
            }))
    },
}

export default LoginApi
