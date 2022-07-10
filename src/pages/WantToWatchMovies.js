import { useState, useContext } from "react";
import { getWantToWatchMovies } from "../services/MovieService";
import MovieList from "../components/movies/MovieList";
import WatchedContext from "../store/WatchedContext";
import PageTitle from "../components/layout/PageTitle";
import PaginationBar from "../components/layout/PaginationBar";

function WantToWatchMovies() {
    const watchedContext = useContext(WatchedContext);

    const [loadedMovies, setLoadedMovies] = useState([]);

    function onResponse(res) {
        res.data.movies.forEach((movie) => {
            if (movie.wantToWatch) watchedContext.addWantToWatch(movie.movie);
        });
        setLoadedMovies(res.data.movies);
    }

    return (
        <section>
            <PageTitle text="My want to watch movies"></PageTitle>
            <PaginationBar getItems={getWantToWatchMovies} onResponse={onResponse}>
                <MovieList movies={loadedMovies} />
            </PaginationBar>
        </section>
    );
}

export default WantToWatchMovies;
