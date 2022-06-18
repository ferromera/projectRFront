import MovieList from "../components/movies/MovieList";
import { useEffect, useState, useContext } from "react";

import { getMovies } from "../services/MovieService";
import { USER_ID } from "../App";
import WatchedContext from "../store/WatchedContext";
import { Typography } from "@mui/material";
import PageTitle from "../components/layout/PageTitle";

function AllMoviesPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedMovies, setLoadedMovies] = useState([]);
    const watchedContext = useContext(WatchedContext);
    const isDeleting = watchedContext.deleting;

    useEffect(() => {
        setIsLoading(true);
        let mounted = true;
        if (!isDeleting) {
            getMovies(USER_ID).then((res) => {
                setIsLoading(false);
                res.data.forEach((movie) => {
                    if (movie.userData) {
                        if (movie.userData.watched)
                            watchedContext.addWatched(movie.movie);
                        if (movie.userData.wantToWatch)
                            watchedContext.addWantToWatch(movie.movie);
                    }
                });
                setLoadedMovies(res.data);
            });
        }
        return () => {
            mounted = false;
        };
    }, [isDeleting]);

    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        );
    }

    return (
        <section>
            <PageTitle text="All movies"></PageTitle>
            <MovieList movies={loadedMovies} />
        </section>
    );
}

export default AllMoviesPage;
