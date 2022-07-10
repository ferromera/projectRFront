import { useState, useContext } from "react";
import { getWatchedMovies } from "../services/MovieService";
import MovieList from "../components/movies/MovieList";
import WatchedContext from "../store/WatchedContext";
import PageTitle from "../components/layout/PageTitle";
import PaginationBar from "../components/layout/PaginationBar";

function WatchedMovies() {
    const watchedContext = useContext(WatchedContext);
    const [loadedMovies, setLoadedMovies] = useState([]);

    function onResponse(res) {
        res.data.movies.forEach((movie) => {
            if (movie.watched) watchedContext.addWatched(movie.movie);
        });
        setLoadedMovies(res.data.movies);
    }

    return (
        <section>
            <PageTitle text="My watched movies"></PageTitle>
            <PaginationBar getItems={getWatchedMovies} onResponse={onResponse}>
                <MovieList movies={loadedMovies} />
            </PaginationBar>
        </section>
    );
}

export default WatchedMovies;
