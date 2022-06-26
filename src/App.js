import {Route, Routes} from "react-router-dom";
import Layout from "./components/layout/Layout";
import WatchedMovies from "./pages/WatchedMovies";
import AllMovies from "./pages/AllMovies";
import NewMovies from "./pages/NewMovie";
import EditMovie from "./pages/EditMovie";
import WantToWatchMovies from "./pages/WantToWatchMovies";
import Home from "./pages/Home";


//Prod
//export const BACKEND_HOST = 'https://projectr-backend.herokuapp.com'
//Dev
export const BACKEND_HOST = 'http://localhost:8080'

function App() {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/movies/' element={<AllMovies/>}/>
                <Route path='/movies/watched' element={<WatchedMovies/>}/>
                <Route path='/movies/wantToWatch' element={<WantToWatchMovies/>}/>
                <Route path='/movies/new' element={<NewMovies />} />
                <Route path='/movies/edit/:movieId' element={<EditMovie/>}/>
            </Routes>
        </Layout>
    );
}

export default App;
