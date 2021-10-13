import axios from 'axios';
import baseURL from '../baseUrl';


const LoginApi = {

    login: async (username, password) => {
        const url = `${baseURL}/login`;

        // const token = document.cookie
        //     ?.split('; ')
        //     ?.find(row => row.startsWith('XSRF-TOKEN='))
        //     ?.split('=')[1];

        // console.log("Login token", token)
        // if (!token) {
        //     console.log("Login token missing, getting new token")
        //     token = getToken();
        // }

        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        // formData.append("_csrf", token);

        const options = {
            method: 'POST',
            url: url,
            withCredentials: true,
            data: formData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                // 'Access-Control-Allow-Origin': 'http://localhost:3000',
                // 'X-XSRF-TOKEN': token,
                'Cookie': 'XSRF-TOKEN: undefined;',
            }
        }

        console.log(options)

        return await axios(options);
    },

    logout: async () => {
        const url = `${baseURL}/logout`;

        // console.log("Logout token", token)
        // if (!token) {
        //     console.log("Logout token missing, getting new token")
        //     getToken();
        // }
        // const token = document.cookie
        //     ?.split('; ')
        //     ?.find(row => row.startsWith('XSRF-TOKEN='))
        //     ?.split('=')[1];

        const options = {
            method: 'POST',
            url: url,
            withCredentials: true,
            // headers: {
                // 'Accept': 'application/json',
                // 'Access-Control-Allow-Origin': '*',
                // 'Content-Type': 'application/html',
                // 'X-XSRF-TOKEN': token
            // }
        }

        return await axios(options);
    }
}

const getToken = async () => {
    const url = `${baseURL}/token`;

    const options = {
        method: 'GET',
        url: url,
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    }

    axios(options).then(response => {
        return document.cookie
        ?.split('; ')
        ?.find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];
    }).catch(error => console.error(error));
}


export default LoginApi;