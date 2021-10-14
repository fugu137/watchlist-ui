import { NavLink } from 'react-router-dom';
import '../../App.css';
import './Navbar.css';


function Navbar(props) {

    return (
        <nav className="Navbar">
            <span className="Navbar__status">Logged in: {props.loggedIn !== null || undefined ? props.loggedIn.toString() : "unknown"}</span>
            <ul className="Navbar__menuItems">
                {props.links.map((link, index) =>
                    <li key={index}>
                        <NavLink
                            className="Navbar__navLink"
                            to={link.path}
                            exact={link.exact}
                        >
                            {link.component.name}
                        </NavLink>
                    </li>
                )}
                <li>
                    <button onClick={props.handleLogout}>Logout</button>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
