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

    const history = useHistory();
    const [cookies, removeCookie] = useCookies(['XSRF-TOKEN']);

    const [status, setLoggedIn] = useState(null);

    // const setLoggedInStatus = (loggedInStatus) => {
    //     setLoggedIn({ ...status, loggedIn: loggedInStatus });
    // };

    const login = async (username, password) => {
        const token = cookies['XSRF-TOKEN'];
        console.log("Token without removal", token);
        // removeCookie('XSRF-TOKEN');
        // console.log("Token after", token);

        LoginApi.login(username, password)
                .then(response => {
                    if (response.status === 200) {
                        setLoggedIn(true);
                        // history.push("/");
                    } else {
                        console.log("Unable to log in.")
                    }
                })
                .catch(error => console.error("Login Error:", error));
        }

    const logout = async () => {
        const token = cookies['XSRF-TOKEN'];

        LoginApi.logout(token)
                .then(response => {
                    if (response.status === 200) {
                        setLoggedIn(false);
                        // history.push("/logout");
                        removeCookie('XSRF-TOKEN'); // needed to avoid issue with logging in again straight after logout
                    } else {
                        console.log("Unable to log out.")
                    }
                })
                .catch(error => console.error("Logout Error:", error));
    }

    return (
        <div className="App">
            <header className="App__header">
                <Navbar
                    links={routes}
                    loggedIn={status}
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
                    <Login handleLogin={login} />
                </Route>
                <Route exact path="/logout">
                    <LogoutSuccess />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
