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


function App() {

    const history = useHistory();
    const [cookies, setCookies] = useCookies(['XSRF-TOKEN']);

    const [status, setLoggedIn] = useState({
        loggedIn: null,
        error: null,
    });

    const setLoggedInStatus = (loggedInStatus) => {
        setLoggedIn({ ...status, loggedIn: loggedInStatus });
    };


    const login = async (username, password) => {
        const url = 'http://localhost:8080/login';

        username = "Michael";
        password = "Password123";

        const token = cookies['XSRF-TOKEN'];

        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password)
        formData.append("_csrf", token)


        const options = {
            method: 'POST',
            url: url,
            withCredentials: true,
            data: formData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*',
                'X-XSRF-TOKEN': token
            }
        }

        await axios(options)
            .then(response => {
                console.log("Axios response:", response);
                if (response.status === 200) {
                    setLoggedInStatus(true);
                    history.push("/");
                } else {
                    console.log("Unable to log in.")
                }
            })
            .catch(error => console.error("Error Message:", error));
    }

    const logout = async () => {
        const url = 'http://localhost:8080/logout';

        const token = cookies['XSRF-TOKEN'];

        const options = {
            method: 'POST',
            url: url,
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'X-XSRF-TOKEN': token
            }
        }

        await axios(options)
            .then(response => {
                console.log("Axios response:", response);
                if (response.status === 200) {
                    setLoggedInStatus(false);
                    history.push("/logout");
                } else {
                    console.log("Unable to log out.")
                }
            })
            .catch(error => console.error("Error Message:", error));
    }

    return (
        <div className="App">
            <header className="App__header">
                <Navbar 
                    links={routes}
                    loginHandler={login}
                    logoutHandler={logout} 
                />
            </header>
            <Switch>
                <Route exact path="/" >
                    {/* {status.loggedIn
                            ? <Home loggedIn={status.loggedIn}/>
                            : <Redirect to="/login" />} */}
                    <Home 
                        loggedIn={status.loggedIn}
                    />
                </Route>
                <Route exact path="/login">
                    <Login loginHandler={login}/>
                </Route>
                <Route exact path="/logout">
                    <LogoutSuccess />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
