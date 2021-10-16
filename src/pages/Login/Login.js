import '../../App.css';
import './Login.css';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


function Login(props) {

    const [details, setDetails] = useState({
        username: "Michael",
        password: "Password123",
    });

    const updateDetails = (input, event) => {
        const data = { [input]: event.target.value };
        setDetails((oldDetails) => ({ ...oldDetails, ...data }) );
    }

    const loginButtonHandler = (event) => {
        event.preventDefault();
        props.handleLogin(details.username, details.password);
    }


    return (
        <div className="Login">
            <h1>Login Page</h1>
            <form className="Login__form">
                <label
                    className="Login__formLabel"
                    forhtml="username-input"
                >
                    Username:
                </label>
                <input
                    id="username-input"
                    className="Login__formInput"
                    type="text"
                    value={details.username}
                    onChange={(event) => updateDetails("username", event)}
                >
                </input>
                <label
                    className="Login__formLabel"
                    forhtml="password-input"
                >
                    Password:
                </label>
                <input
                    id="password-input"
                    className="Login__formInput"
                    type="password"
                    value={details.password}
                    onChange={(event) => updateDetails("password", event)}
                >
                </input>
                <button onClick={loginButtonHandler}>Login</button>
                <div className="Login__formError"> {props.error && props.error}</div>

               
            </form>
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

    // useEffect(() => {
    //     const getToken = async () => {
    //         const url = 'http://localhost:8080/accounts/principal';

    //         axios({
    //             method: 'GET',
    //             url: url,
    //             withCredentials: true,
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Access-Control-Allow-Origin': '*',
    //             }
    //         })
    //             .catch(error => console.error("Principal Error:", error));
    //     }

    //     getToken();

    // }, []);