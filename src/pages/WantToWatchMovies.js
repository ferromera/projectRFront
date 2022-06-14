import {useEffect, useState, useContext} from "react";
import {getWantToSeeMovies} from "../services/MovieService";
import {USER_ID} from "../App";
import MovieList from "../components/movies/MovieList";
import WatchedContext from "../store/WatchedContext";

function WantToWatchMovies() {
    const watchedContext = useContext(WatchedContext);
    const isUpdated = watchedContext.updated
    const [isLoading, setIsLoading] = useState(true);
    const [loadedMovies, setLoadedMovies] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        let mounted = true;
        if (isUpdated) {
            getWantToSeeMovies(USER_ID)
                .then(res => {
                    setIsLoading(false);
                    res.data.forEach(movie => {
                        if (movie.userData.wantToSee)
                            watchedContext.addWantToSee(movie.movie);
                    });
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
            <h1>My want to watch movies</h1>
            <MovieList movies={loadedMovies} />
        </section>
    );
}

export default WantToWatchMovies;