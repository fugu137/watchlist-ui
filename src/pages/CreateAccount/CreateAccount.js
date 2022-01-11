import './CreateAccount.css';

function CreateAccount () {
    return (
        <main className="CreateAccount">
            <h1>Create Account</h1>
            <section className="CreateAccount__form">
                <form>
                    <label className="CreateAccount__formLabel" forhtml="username-input">
                        Username:
                    </label>
                    <input
                        id="username-input"
                        className="CreateAccount__formInput"
                        type="text"
                    /> 
                    <label className="CreateAccount__formLabel" forhtml="password-input">
                        Password:
                    </label>
                    <input
                        id="password-input"
                        className="CreateAccount__formInput"
                        type="text"
                    /> 
                    <label className="CreateAccount__formLabel" forhtml="repeat-input">
                        Repeat Password:
                    </label>
                    <input
                        id="repeat-input"
                        className="CreateAccount__formInput"
                        type="text"
                    />
                    <button className="CreateAccount__formButton">
                       Create Account
                    </button>
                </form>
            </section>
        </main>
    );
}

export default CreateAccount;
