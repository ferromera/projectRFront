import MovieList from "../components/movies/MovieList";
import { useState, useContext, useEffect } from "react";
import { getMovies } from "../services/MovieService";
import WatchedContext from "../store/WatchedContext";
import PaginationBar from "../components/layout/PaginationBar";
import { useSearchParams } from "react-router-dom";
import { Typography } from "@mui/material";
import AdvancedSearch from "../components/search/AdvancedSearch";

function AllMoviesPage() {
    const [loadedMovies, setLoadedMovies] = useState([]);
    const watchedContext = useContext(WatchedContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState("");
    
    useEffect(() => {
        setSearch(searchParams.get("search") ? searchParams.get("search") : "");
    }, [searchParams]);

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
        const search = searchParams.get("search") ? searchParams.get("search") : "";
        const anyOrAllGenres = searchParams.get("anyGenre") === "true" ? "true" : "false";
        const genres = searchParams.get("genres") ? searchParams.get("genres") : "";
        return getMovies(page, pageSize, search, anyOrAllGenres, genres);
    }

    function onSearch(data) {
        searchParams.set("search", data.query);
        searchParams.set("anyGenre", data.anyOrAllGenres == "any");
        searchParams.set("genres", data.genres ? data.genres.join() : "");
        searchParams.set("page", "1");
        searchParams.set("r", 0)
        setSearchParams(searchParams);
    }

    return (
        <section>
            <AdvancedSearch onSearch={onSearch} />    
            {search && (
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        width: "500px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginBottom: "20px",
                    }}
                >
                    Results for "{search}"
                </Typography>
            ) }
            
            <PaginationBar getItems={onPageChange} onResponse={onResponse}>
                <MovieList movies={loadedMovies} />
            </PaginationBar>
        </section>
    );
}

export default AllMoviesPage;
