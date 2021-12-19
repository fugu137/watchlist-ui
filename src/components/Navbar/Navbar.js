import { NavLink } from 'react-router-dom';
import '../../App.css';
import './Navbar.css';
import links from '../../router/routes';


function Navbar ({ logoutHandler, loggedIn }) {
    return (
        <nav className="Navbar">
            <span className="Navbar__status">
                Logged in: {loggedIn ? loggedIn.toString() : 'false'}
            </span>
            <ul className="Navbar__menuItems">
                {links.map((link, index) => (
                    <li key={index}>
                        <NavLink className="Navbar__navLink" to={link.path} exact={link.exact}>
                            {link.name}
                        </NavLink>
                    </li>
                ))}
                <li>
                    <button onClick={logoutHandler}>Logout</button>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
