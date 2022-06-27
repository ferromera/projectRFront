import MovieList from "../components/movies/MovieList";
import { useEffect, useState, useContext } from "react";

import { getMovie, getMovies } from "../services/MovieService";
import WatchedContext from "../store/WatchedContext";
import PageTitle from "../components/layout/PageTitle";
import MovieItem from "../components/movies/MovieItem";
import { Navigate, useNavigate, useParams } from "react-router-dom";

function MoviePage() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState();
    const watchedContext = useContext(WatchedContext);
    const isDeleting = watchedContext.deleting;
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        let mounted = true;
        if (!isDeleting) {
            getMovie(id).then((res) => {
                setIsLoading(false);
                setMovie(res.data);
            });
        } else {
            navigate("/movies");
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
            <MovieItem
                    key={movie.movie.id}
                    movie={movie.movie}
                    userData={movie.userData}
                />
        </section>
    );
}

export default MoviePage;
