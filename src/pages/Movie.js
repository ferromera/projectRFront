import { useEffect, useState, useContext } from "react";

import { getMovie } from "../services/MovieService";
import WatchedContext from "../store/WatchedContext";
import MovieItem from "../components/movies/MovieItem";
import { useNavigate, useParams } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";

function MoviePage() {
    const { id } = useParams();
    const [movie, setMovie] = useState();
    const watchedContext = useContext(WatchedContext);
    const isDeleting = watchedContext.deleting;
    const navigate = useNavigate();

    useEffect(() => {
        let mounted = true;
        if (!isDeleting) {
            trackPromise(
                getMovie(id).then((res) => {
                    setMovie(res.data);
                })
            );
        } else {
            navigate("/movies");
        }
        return () => {
            mounted = false;
        };
    }, [isDeleting]);

    return (
        <section>
            {movie && (
                <MovieItem
                    key={movie.movie.id}
                    movie={movie.movie}
                    userData={movie.userData}
                />
            )}
        </section>
    );
}

export default MoviePage;
