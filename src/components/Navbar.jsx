import { Link } from "react-router-dom";
import "../css/Navbar.css";

function Navbar(){
    return(
        <nav>
            <Link to="/">Home</Link>
            <Link to="/favorites">Favorites</Link>
        </nav>
    );
};
export default Navbar;