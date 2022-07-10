import MovieList from "../components/movies/MovieList";
import { useState, useContext } from "react";

import { getMovies } from "../services/MovieService";
import WatchedContext from "../store/WatchedContext";
import PageTitle from "../components/layout/PageTitle";
import PaginationBar from "../components/layout/PaginationBar";


function AllMoviesPage() {
    const [loadedMovies, setLoadedMovies] = useState([]);
    const watchedContext = useContext(WatchedContext);


    function onResponse(response) {
        response.data.movies.forEach((movie) => {
            if (movie.userData) {
                if (movie.userData.watched)
                    watchedContext.addWatched(movie.movie);
                if (movie.userData.wantToWatch)
                    watchedContext.addWantToWatch(movie.movie);
            }
        });
        setLoadedMovies(response.data.movies);
    }

 
    return (
        <section>
            <PageTitle text="All movies"></PageTitle>
            <PaginationBar getItems={getMovies} onResponse={onResponse}>
                <MovieList movies={loadedMovies} />
            </PaginationBar>
        </section>
    );
}

export default AllMoviesPage;
