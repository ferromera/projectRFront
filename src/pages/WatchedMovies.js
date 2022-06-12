import {useEffect, useState, useContext} from "react";
import {getWatchedMovies} from "../services/MovieService";
import {USER_ID} from "../App";
import MovieList from "../components/movies/MovieList";
import WatchedContext from "../store/WatchedContext";

function WatchedMovies() {
    const watchedContext = useContext(WatchedContext);
    const isUpdated = watchedContext.updated
    const [isLoading, setIsLoading] = useState(true);
    const [loadedMovies, setLoadedMovies] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        let mounted = true;
        console.log('getting')
        if (isUpdated) {
            getWatchedMovies(USER_ID)
                .then(res => {
                    setIsLoading(false);
                    setLoadedMovies(res.data);
                })
            return () => { mounted = false; }
        }
    }, [isUpdated]);

    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        );
    }

    return (
        <section>
            <h1>My watched movies</h1>
            <MovieList movies={loadedMovies} />
        </section>
    );
}

export default WatchedMovies;