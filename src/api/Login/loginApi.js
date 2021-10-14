import axios from 'axios';


const LoginApi = {

    login: async (username, password) => {

        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        // formData.append("_csrf", token)

        const options = {
            method: 'POST',
            url: '/login',
            data: formData,
            // withCredentials: true,
            // headers: {
            //     'X-XSRF-TOKEN': token
            // }
        }

        return await axios(options);
    },

    logout: async () => {

        // token = document.cookie?.split('; ')
        // ?.find(row => row.startsWith('XSRF-TOKEN='))
        // ?.split('=')[1];

        // console.log(token)

        const options = {
            method: 'POST',
            url: '/logout',
            // withCredentials: true,
            // headers: {
            //     'X-XSRF-TOKEN': token
            // }
        }

        return await axios(options);
    }
}



export default LoginApi;