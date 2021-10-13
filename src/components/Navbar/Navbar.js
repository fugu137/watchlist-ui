import { NavLink } from 'react-router-dom';
import '../../App.css';
import './Navbar.css';


function Navbar(props) {

    return (
        <nav className="Navbar">
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
                    <button onClick={props.logoutHandler}>Logout</button>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
