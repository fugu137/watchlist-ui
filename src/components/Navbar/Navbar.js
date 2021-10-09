import '../../App.css';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar(props) {

    return (
        <nav className="Navbar">
            <ul className="Navbar__menuItems">
                {props.links.map((link, index) =>
                    <li key={index}>
                        <Link to={link.path}>{link.component.name}</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
