import '../../App.css';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';


function Login(props) {

    useEffect(() => {
        const getAuth = async () => {
            const url = 'http://localhost:8080/accounts/principal';

            axios({
                method: 'GET',
                url: url,
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            })
                .catch(error => console.error("Principal Error:", error));
        }

        getAuth();

    }, []);

    return (
        <div className="Login">
            <h1>Login Page</h1>
            <p>
                <button onClick={props.loginHandler}>Login</button>
            </p>
        </div>
    );
}

export default Login;


    // const history = useHistory();

    // useEffect(() => {
    //     if (props.loggedIn) {
    //         history.replace("/");
    //     }

    //     props.loginHandler("Michael", "Password123");

    // }, [props, history])