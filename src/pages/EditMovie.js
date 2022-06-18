import MovieForm from "../components/movies/MovieForm";
import { postMovie, getMovie } from "../services/MovieService";
import { useEffect, useState } from "react";
import SuccessMessage from "../components/ui/SuccessMessage";
import ErrorMessage from "../components/ui/ErrorMessage";
import { useParams } from "react-router-dom";
import PageTitle from "../components/layout/PageTitle";

function EditMovie(params) {
    const [postStatus, setPostStatus] = useState(null);
    const { movieId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState(null);

    function addMovieHandler(movieData) {
        postMovie(movieData)
            .then((result) => {
                setPostStatus(true);
            })
            .catch((error) => {
                setPostStatus(false);
            });
    }

    useEffect(() => {
        if (postStatus !== null) {
            setTimeout(() => {
                setPostStatus(null);
            }, 2600);
        }
    }, [postStatus]);

    useEffect(() => {
        setIsLoading(true);
        let mounted = true;
        getMovie(movieId).then((res) => {
            setIsLoading(false);
            setMovie(res.data);
        });
        return () => {
            mounted = false;
        };
    }, []);

    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        );
    }

    return (
        <section>
            <PageTitle text="Edit movie"></PageTitle>
            {postStatus !== null ? (
                postStatus ? (
                    <SuccessMessage text="Movie edited!" />
                ) : (
                    <ErrorMessage text="An error occurred" />
                )
            ) : null}
            <MovieForm onSubmitMovie={addMovieHandler} movie={movie} />
        </section>
    );
}

export default EditMovie;
