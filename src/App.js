import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import LogoutSuccess from './pages/Redirects/LogoutSuccess';
import routes from './router/routes';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import LoginApi from './api/Login/loginApi';


axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.withCredentials = true;


function App() {

    const [cookies, removeCookie] = useCookies(['XSRF-TOKEN']);

    const [status, setLoggedIn] = useState({
        loggedIn: null,
        error: null,
    });


    const login = async (username, password) => {
        const response = await LoginApi.login(username, password);
        setLoggedIn(old => ({ ...old, ...response }));
    }

    const logout = async () => {
        const response = await LoginApi.logout();
        setLoggedIn(old => ({ ...old, ...response }));
        removeCookie('XSRF-TOKEN'); // needed to avoid issue with logging in again straight after logout
    }

    return (
        <div className="App">
            <header className="App__header">
                <Navbar
                    links={routes}
                    loggedIn={status.loggedIn}
                    handleLogout={logout}
                />
            </header>
            <Switch>
                <Route exact path="/" >
                    {/* {status.loggedIn
                            ? <Home 
                                loggedIn={status.loggedIn} 
                                statusHandler={setLoggedInStatus}/>
                            : <Redirect to="/login" />} */}
                    <Home
                        loggedIn={status}
                        handleStatus={setLoggedIn}
                    />
                </Route>
                <Route exact path="/login">
                    <Login
                        handleLogin={login}
                        error={status.error}
                    />
                </Route>
                <Route exact path="/logout">
                    <LogoutSuccess />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
