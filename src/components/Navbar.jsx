import { Link } from "react-router-dom";

function Navbar(){
    return(
        <nav className="flex justify-center gap-10 py-10 bg-slate-900">
            <Link 
                to="/"
                className = "text-white text-2xl font-bold hover:text-yellow-400 transition-colors"
            >
                Home
            </Link>
            <Link 
                to="/favorites"
                className = "text-white text-2xl font-bold hover:text-yellow-400 transition-colors">
                Favorites
                <div className="h-3"></div>
            </Link> 
        </nav>
    );
};
export default Navbar;