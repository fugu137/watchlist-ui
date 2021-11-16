import { useEffect, useState } from 'react';
import '../../App.css';
import './Login.css';

function Login ({ loginHandler, error }) {
    const [active, setActive] = useState(false);

    const [details, setDetails] = useState({
        username: 'Michael',
        password: 'Password123',
    });

    useEffect(() => {
        setActive(false);
    }, []);

    const updateDetails = (input, event) => {
        const data = { [input]: event.target.value };
        setDetails((oldDetails) => ({ ...oldDetails, ...data }));
    };

    const handleLoginButtonClick = (event) => {
        event.preventDefault();
        setActive(true);
        loginHandler(details.username, details.password);
    };

    return (
        <main className="Login">
            <h1>Login Page</h1>
            <section className="Login__form">
                <form>
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
                        onChange={(event) => updateDetails('username', event)}
                    ></input>
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
                        onChange={(event) => updateDetails('password', event)}
                    ></input>
                    <button
                        className="Login__formButton"
                        onClick={handleLoginButtonClick}
                    >
                        Login
                    </button>
                    <div className="Login__formError">
                        {' '}
                        {error && active && error}
                    </div>
                </form>
            </section>
        </main>
    );
}

export default Login;
