import MovieList from "../components/movies/MovieList";
import {useEffect, useState, useContext} from "react";

import {getMovies} from "../services/MovieService";
import {USER_ID} from "../App";
import WatchedContext from "../store/WatchedContext";


function AllMoviesPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedMovies, setLoadedMovies] = useState([]);
    const watchedContext = useContext(WatchedContext);

    useEffect(() => {
        setIsLoading(true);
        let mounted = true;
        getMovies(USER_ID)
            .then(res => {
                setIsLoading(false);
                res.data.forEach(movie => {
                    if (movie.userData && movie.userData.watched){
                        watchedContext.addWatched(movie.movie)
                    }
                })
                setLoadedMovies(res.data);
            })
        return () => { mounted = false; }
    }, []);

    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        );
    }

    return (
        <section>
            <h1>All Movies</h1>
            <MovieList movies={loadedMovies} />
        </section>
    );
}

export default AllMoviesPage;