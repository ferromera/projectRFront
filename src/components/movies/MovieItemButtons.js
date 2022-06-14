import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useContext} from "react";
import WatchedContext from "../../store/WatchedContext";
import {USER_ID} from "../../App";
import {postUserMovie} from "../../services/UserMovieService";

function MovieItemButtons(props) {
    const watchedContext = useContext(WatchedContext);
    const itemIsWatched = watchedContext.itemIsWatched(props.movie.id);
    const itemIsWantToWatch = watchedContext.itemIsWantToWatch(props.movie.id);

    function updateWatchedCall() {
        watchedContext.setUpdated(false)
        const json = {
            userId: USER_ID,
            movieId: props.movie.id,
            watched: !itemIsWatched,
            wantToWatch: false
        };
        postUserMovie(json).then(res => watchedContext.setUpdated(true));
    }

    function watchedHandler() {
        updateWatchedCall();
        if (itemIsWatched) {
            watchedContext.removeWatched(props.movie.id);
        } else {
            watchedContext.addWatched(props.movie);
            watchedContext.removeWantToWatch(props.movie.id)
        }
    }

    function updateWantToWatchCall() {
        watchedContext.setUpdated(false)
        const json = {
            userId: USER_ID,
            movieId: props.movie.id,
            watched: false,
            wantToWatch: !itemIsWantToWatch
        };
        postUserMovie(json).then(res => watchedContext.setUpdated(true));
    }

    function wantToWatchHandler() {
        updateWantToWatchCall();
        if (itemIsWantToWatch) {
            watchedContext.removeWantToWatch(props.movie.id);
        } else {
            watchedContext.addWantToWatch(props.movie);
            watchedContext.removeWatched(props.movie.id)
        }
    }

    const buttonStyle = {
        margin: "10px"
    };
    return (
        <div>
            {itemIsWatched ?
                <Button sx={buttonStyle} variant="contained"
                        onClick={watchedHandler}>Watched</Button>
                :
                <Button sx={buttonStyle} variant="outlined"
                        onClick={watchedHandler}>Watched</Button>
            }
            {itemIsWantToWatch ?
                <Button sx={buttonStyle} variant="contained"
                        onClick={wantToWatchHandler}>Want to watch</Button>
                :
                <Button sx={buttonStyle} variant="outlined"
                        onClick={wantToWatchHandler}>Want to watch</Button>
            }
            <Button sx={buttonStyle} variant="contained">Rate</Button>
        </div>
    )
}

export default MovieItemButtons;