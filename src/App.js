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

    const [status, setStatus] = useState({
        loggedInUser: null,
        error: null,
    });

    useEffect(() => {
        LoginApi.getPrincipal().then((username) => {
            setStatus((old) => ({ ...old, loggedInUser: username}));
        });
    }, []);


    const login = async (username, password) => {
        const response = await LoginApi.login(username, password);
        setStatus(old => ({ ...old, ...response }));
    };

    const logout = async () => {
        const response = await LoginApi.logout();
        setStatus(old => ({ ...old, ...response }));
        removeCookie('XSRF-TOKEN'); // needed to avoid issue with logging in again straight after logout
    };

    return (
        <div className="App">
            <header className="App__header">
                <Navbar
                    links={routes}
                    loggedIn={status.loggedInUser}
                    logoutHandler={logout}
                />
            </header>
            <Switch>
                <Route exact path="/">
                    {/* {status.loggedIn
                            ? <Home 
                                loggedIn={status.loggedIn} 
                                statusHandler={setLoggedInStatus}/>
                            : <Redirect to="/login" />} */}
                    <Home
                        loggedIn={status.loggedInUser}
                    />
                </Route>
                <Route exact path="/login">
                    <Login loginHandler={login} error={status.error} />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
