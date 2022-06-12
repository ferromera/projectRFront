import {Route, Routes} from "react-router-dom";
import Layout from "./components/layout/Layout";
import WatchedMovies from "./pages/WatchedMovies";
import AllMovies from "./pages/AllMovies";
import NewMovies from "./pages/NewMovies";

export const BACKEND_HOST = 'https://projectr-backend.herokuapp.com'

function App() {
    return (
        <Layout>
            <Routes>
                <Route path='/movies/' element={<AllMovies/>}/>
                <Route path='/movies/watched' element={<WatchedMovies/>}/>
                <Route path='/movies/new' element={<NewMovies/>}/>
            </Routes>
        </Layout>
    );
}

export default App;
