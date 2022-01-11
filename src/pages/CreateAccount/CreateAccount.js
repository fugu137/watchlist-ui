import { useState } from 'react';
import AccountApi from '../../api/Account/accountApi';
import './CreateAccount.css';

function CreateAccount () {
    const [status, setStatus] = useState({
        accountCreated: false,
        error: null,
    });

    const [formDetails, setformDetails] = useState({
        username: 'Test',
        password: 'test',
        repeat: 'test',
    });

    const updateformDetails = (input, event) => {
        const data = { [input]: event.target.value };
        setformDetails((oldformDetails) => ({ ...oldformDetails, ...data }));
    };

    const handleLoginButtonClick = (event) => {
        event.preventDefault();
        
        AccountApi.createAccount(formDetails.username, formDetails.password, formDetails.repeat).then((response) => {
            setStatus(response);
        });
    };

    return (
        <main className="CreateAccount">
            <h1>Create Account</h1>
            <section className="CreateAccount__form">
                <form>
                    <label className="CreateAccount__formLabel" htmlFor="username-input">
                        Username:
                    </label>
                    <input
                        id="username-input"
                        className="CreateAccount__formInput"
                        type="text"
                        value={formDetails.username}
                        onChange={(event) => updateformDetails('username', event)}
                    />
                    <label className="CreateAccount__formLabel" htmlFor="password-input">
                        Password:
                    </label>
                    <input
                        id="password-input"
                        className="CreateAccount__formInput"
                        type="text"
                        value={formDetails.password}
                        onChange={(event) => updateformDetails('password', event)}
                    />
                    <label className="CreateAccount__formLabel" htmlFor="repeat-input">
                        Repeat Password:
                    </label>
                    <input
                        id="repeat-input"
                        className="CreateAccount__formInput"
                        type="text"
                        value={formDetails.repeat}
                        onChange={(event) => updateformDetails('repeat', event)}
                    />
                    <button className="CreateAccount__formButton" onClick={handleLoginButtonClick}>
                        Create Account
                    </button>
                    <div className="CreateAccount__formError">{status.error && status.error}</div>
                    <div className="CreateAccount__formSuccess">{status.accountCreated && 'Account created!'}</div>
                </form>
            </section>
        </main>
    );
}

export default CreateAccount;
