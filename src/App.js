import './App.css';
import routes from './router/routes'
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {

    return (
        <Router>
            <div className="App">
                <header className="App__header">
                    <Navbar links={routes} />
                </header>

                <Switch>
                    {routes.map((route, index) => 
                        <Route path={route.path} exact={route.exact} key={index}>
                            {route.component}
                        </Route>
                    )};
                </Switch>
            </div>
        </Router >
    );
}

export default App;
