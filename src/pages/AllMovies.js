import MovieList from "../components/movies/MovieList";
import { useState, useContext, useEffect } from "react";

import { getMovies } from "../services/MovieService";
import WatchedContext from "../store/WatchedContext";
import PageTitle from "../components/layout/PageTitle";
import PaginationBar from "../components/layout/PaginationBar";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";

function AllMoviesPage() {
    const [loadedMovies, setLoadedMovies] = useState([]);
    const watchedContext = useContext(WatchedContext);
    const location = useLocation();
    const [search, setSearch] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setSearch(params.get("search") ? params.get("search") : "");
    }, [location]);

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

    function onPageChange(page, pageSize) {
        const params = new URLSearchParams(location.search);
        const searchParam = params.get("search") ? params.get("search") : "";
        return getMovies(page, pageSize, searchParam);
    }

    return (
        <section>
            {search ? (
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ width: "500px", marginLeft: "auto" , marginRight: "auto", marginBottom: "20px" }}
                >
                    Results for "{search}"
                </Typography>
            ) : (
                <PageTitle text="All movies"></PageTitle>
            )}

            <PaginationBar getItems={onPageChange} onResponse={onResponse}>
                <MovieList movies={loadedMovies} />
            </PaginationBar>
        </section>
    );
}

export default AllMoviesPage;
