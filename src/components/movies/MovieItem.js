import classes from './MovieItem.module.css'
import Card from "../ui/Card";
import {postUserMovie} from "../../services/UserMovieService";
import {USER_ID} from "../../App";
import WatchedContext from "../../store/WatchedContext";
import {useContext} from "react";
import MovieItemButtons from "./MovieItemButtons";

function MovieItem(props) {
    const watchedContext = useContext(WatchedContext);
    const itemIsWatched = watchedContext.itemIsWatched(props.movie.id);

    function updateWatchedCall() {
        watchedContext.setUpdated(false)
        const json = {
            userId: USER_ID,
            movieId: props.movie.id,
            watched: !itemIsWatched
        };
        postUserMovie(json).then(res => watchedContext.setUpdated(true));
    }

    function watchedHandler() {
        updateWatchedCall();
        if (itemIsWatched) {
            watchedContext.removeWatched(props.movie.id);
        } else {
            watchedContext.addWatched(props.movie);
        }
    }
    return (
        <li className={classes.item}>
            <Card>
                <div className={classes.container}>
                    <div className={classes.image}>
                        <img src={props.movie.image} alt={props.movie.title} />
                    </div>
                    <div className={classes.content}>
                        <h3>{props.movie.title}</h3>
                        <p>{props.movie.description}</p>
                    </div>
                    <MovieItemButtons movie={props.movie}/>
                    {/*<div className={classes.actions}>*/}
                    {/*    <button className={itemIsWatched ? classes.watched : classes.notwatched }*/}
                    {/*            onClick={watchedHandler}>Watched</button>*/}
                    {/*</div>*/}
                </div>
            </Card>
        </li>
    )
}

export default MovieItem;