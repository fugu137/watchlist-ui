import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Route, Switch } from 'react-router-dom';
import LoginApi from './api/Login/loginApi';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import routes from './router/routes';
import './App.css';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.withCredentials = true;

function App () {
    const [cookies, removeCookie] = useCookies(['XSRF-TOKEN']);

    const [clickEvent, setClickEvent] = useState(null);
    const [loginState, setLoginState] = useState({
        loggedInUser: null,
        error: null,
    });

    useEffect(() => {
        LoginApi.getPrincipal().then((username) => {
            setLoginState((old) => ({ ...old, loggedInUser: username }));
        });
    }, []);

    const login = async (username, password) => {
        const response = await LoginApi.login(username, password);
        setLoginState((old) => ({ ...old, ...response }));
    };

    const logout = async () => {
        const response = await LoginApi.logout();
        setLoginState((old) => ({ ...old, ...response }));
        removeCookie('XSRF-TOKEN'); // needed to avoid issue with logging in again straight after logout
    };

    const handleWindowClick = (event) => {
        setClickEvent(event);
    }

    return (
        <div className="App" onClick={handleWindowClick}>
            <header className="App__header">
                <Navbar links={routes} loggedIn={loginState.loggedInUser} logoutHandler={logout} />
            </header>
            <Switch>
                <Route exact path="/">
                    {/* {status.loggedIn
                            ? <Home 
                                loggedIn={status.loggedIn} 
                                statusHandler={setLoggedInStatus}/>
                            : <Redirect to="/login" />} */}
                    <Home loggedIn={loginState.loggedInUser} clickEvent={clickEvent} />
                </Route>
                <Route exact path="/login">
                    <Login loginHandler={login} error={loginState.error} />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
