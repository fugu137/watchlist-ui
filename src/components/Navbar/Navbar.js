import { NavLink } from 'react-router-dom';
import '../../App.css';
import './Navbar.css';


function Navbar({ logoutHandler, loggedIn, links }) {

    return (
        <nav className="Navbar">
            <span className="Navbar__status">Logged in: {loggedIn !== null || undefined ? loggedIn.toString() : "unknown"}</span>
            <ul className="Navbar__menuItems">
                {links.map((link, index) =>
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
                    <button onClick={logoutHandler}>Logout</button>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
