import MovieForm from "../components/movies/MovieForm";
import {postMovie} from "../services/MovieService";
import {useEffect, useState} from "react";
import SuccessMessage from "../components/ui/SuccessMessage";
import ErrorMessage from "../components/ui/ErrorMessage";

function NewMovie() {
    const [postStatus, setPostStatus] = useState(null);

    function addMovieHandler(movieData) {
        postMovie(movieData)
            .then(result => {
                setPostStatus(true)
            })
            .catch(error => {
                setPostStatus(false)
            });
    }

   useEffect(() => {
        if(postStatus !== null) {
            setTimeout(() => {
                setPostStatus(null);
            }, 2600)
        }
    },[postStatus]);
    return (
        <section>
            <h1>Add new movie</h1>
            { postStatus !== null ? (postStatus ?
                <SuccessMessage text='New movie added!'/> :
                <ErrorMessage text='An error occurred'/>) :
                null
            }
            <MovieForm onSubmitMovie={addMovieHandler}/>
        </section>
    );
}

export default NewMovie;