import MovieForm from "../components/movies/MovieForm";
import { postMovie } from "../services/MovieService";
import { useEffect, useState } from "react";
import SuccessMessage from "../components/ui/SuccessMessage";
import ErrorMessage from "../components/ui/ErrorMessage";
import PageTitle from "../components/layout/PageTitle";

function NewMovie() {
    const [postStatus, setPostStatus] = useState(null);

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
    return (
        <section>
            <PageTitle text="Add new movie"></PageTitle>
            {postStatus !== null ? (
                postStatus ? (
                    <SuccessMessage text="New movie added!" />
                ) : (
                    <ErrorMessage text="An error occurred" />
                )
            ) : null}
            <MovieForm movie={{}} onSubmitMovie={addMovieHandler} />
        </section>
    );
}

export default NewMovie;
