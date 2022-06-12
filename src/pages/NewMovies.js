import NewMovieForm from "../components/movies/NewMovieForm";
import {postMovie} from "../services/MovieService";
import {useEffect, useState} from "react";
import SuccessMessage from "../components/ui/SuccessMessage";
import ErrorMessage from "../components/ui/ErrorMessage";

function NewMeetupsPage() {
    const [postStatus, setPostStatus] = useState(null);

    function addMovieHandler(movieData) {
        console.log(JSON.stringify(movieData))
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
            <NewMovieForm onAddMovieData={addMovieHandler}/>
        </section>
    );
}

export default NewMeetupsPage;