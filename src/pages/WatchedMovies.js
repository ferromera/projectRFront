import { useEffect, useState, useContext } from "react";
import { getWatchedMovies } from "../services/MovieService";
import { USER_ID } from "../App";
import MovieList from "../components/movies/MovieList";
import WatchedContext from "../store/WatchedContext";
import PageTitle from "../components/layout/PageTitle";

function WatchedMovies() {
    const watchedContext = useContext(WatchedContext);
    const isUpdated = watchedContext.updated;
    const [isLoading, setIsLoading] = useState(true);
    const [loadedMovies, setLoadedMovies] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        let mounted = true;
        if (isUpdated) {
            getWatchedMovies(USER_ID).then((res) => {
                setIsLoading(false);
                res.data.forEach((movie) => {
                    if (movie.userData.watched)
                        watchedContext.addWatched(movie.movie);
                });
                setLoadedMovies(res.data);
            });
            return () => {
                mounted = false;
            };
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
            <PageTitle text="My watched movies"></PageTitle>
            <MovieList movies={loadedMovies} />
        </section>
    );
}

export default WatchedMovies;
