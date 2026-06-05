import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx'
import Favorites from './pages/Favorites.jsx'
import Navbar from "./components/Navbar.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";

function App(){
    return(
        <BrowserRouter>
        <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<Favorites />}/>
                <Route path="/movie/:id" element={<MovieDetails />}/>
            </Routes>
        </BrowserRouter>
    );
};
export default App;