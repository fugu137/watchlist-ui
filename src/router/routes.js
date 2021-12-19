import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';

const routes = [
    {
        path: "/",
        exact: true,
        component: Home,
        name: "Home"
    },
    {
        path: "/login",
        exact: true,
        component: Login,
        name: "Login"
    }
];

export default routes;