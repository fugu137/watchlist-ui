import axios from 'axios';


const LoginApi = {

    login: async (username, password) => {

        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        const options = {
            method: 'POST',
            url: '/login',
            data: formData,
        }

        return await axios(options);
    },

    logout: async () => {

        const options = {
            method: 'POST',
            url: '/logout',
        }

        return await axios(options);
    }
}



export default LoginApi;