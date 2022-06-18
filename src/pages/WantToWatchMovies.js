import { useEffect, useState, useContext } from "react";
import { getWantToWatchMovies } from "../services/MovieService";
import { USER_ID } from "../App";
import MovieList from "../components/movies/MovieList";
import WatchedContext from "../store/WatchedContext";
import PageTitle from "../components/layout/PageTitle";

function WantToWatchMovies() {
    const watchedContext = useContext(WatchedContext);
    const isUpdated = watchedContext.updated;
    const [isLoading, setIsLoading] = useState(true);
    const [loadedMovies, setLoadedMovies] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        let mounted = true;
        if (isUpdated) {
            getWantToWatchMovies(USER_ID).then((res) => {
                setIsLoading(false);
                res.data.forEach((movie) => {
                    if (movie.userData.wantToWatch)
                        watchedContext.addWantToWatch(movie.movie);
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
            <PageTitle text="My want to watch movies"></PageTitle>
            <MovieList movies={loadedMovies} />
        </section>
    );
}

export default WantToWatchMovies;
