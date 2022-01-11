import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import './Login.css';

function Login ({ loginHandler, error }) {
    const [formDetails, setformDetails] = useState({
        username: 'Michael',
        password: 'Password123',
    });

    const updateformDetails = (input, event) => {
        const data = { [input]: event.target.value };
        setformDetails((oldformDetails) => ({ ...oldformDetails, ...data }));
    };

    const handleLoginButtonClick = (event) => {
        event.preventDefault();
        loginHandler(formDetails.username, formDetails.password);
    };

    return (
        <main className="Login">
            <h1>Login Page</h1>
            <section className="Login__form">
                <form>
                    <label className="Login__formLabel" htmlFor="username-input">
                        Username:
                    </label>
                    <input
                        id="username-input"
                        className="Login__formInput"
                        type="text"
                        value={formDetails.username}
                        onChange={(event) => updateformDetails('username', event)}
                    />
                    <label className="Login__formLabel" htmlFor="password-input">
                        Password:
                    </label>
                    <input
                        id="password-input"
                        className="Login__formInput"
                        type="password"
                        value={formDetails.password}
                        onChange={(event) => updateformDetails('password', event)}
                    />
                    <button className="Login__formButton" onClick={handleLoginButtonClick}>
                        Login
                    </button>
                    <div className="Login__formError"> {error && error}</div>
                </form>
                <Link className="Login__link" to="/createaccount">
                    Don't have an account?
                </Link>
            </section>
        </main>
    );
}

export default Login;
