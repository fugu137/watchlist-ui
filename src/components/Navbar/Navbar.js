import { Link } from 'react-router-dom';
import '../../App.css';
import './Navbar.css';


function Navbar(props) {

    return (
        <nav className="Navbar">
            <ul className="Navbar__menuItems">
                {props.links.map((link, index) =>
                    <li key={index}>
                        <Link to={link.path}>{link.component.name}</Link>
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
