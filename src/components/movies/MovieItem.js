import classes from './MovieItem.module.css'
import Card from "../ui/Card";
import {postUserMovie} from "../../services/UserMovieService";
import {BACKEND_HOST, USER_ID} from "../../App";
import WatchedContext from "../../store/WatchedContext";
import {useContext} from "react";
import MovieItemButtons from "./MovieItemButtons";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

function MovieItem(props) {
    const watchedContext = useContext(WatchedContext);
    const itemIsWatched = watchedContext.itemIsWatched(props.movie.id);
    const navigate = useNavigate();


    function editHandler() {
        navigate("/movies/edit/"+ props.movie.id);
    }

    return (
        <li className={classes.item}>
            <Card>
                <Button sx={{ float: "right", margin: "5px" }}
                    size="small" variant="outlined" color="error" onClick={editHandler}>Delete</Button>
                <Button sx={{ float: "right", margin: "5px" }} size="small"
                    variant="outlined" onClick={editHandler}>Edit</Button>
                <div className={classes.container}>
                    <div className={classes.image}>
                        <img src={BACKEND_HOST + "/movies/images/" + props.movie.image}
                             alt={props.movie.title} />
                    </div>
                    <div className={classes.content}>
                        <h3>{props.movie.title}</h3>
                        <p>{props.movie.description}</p>
                    </div>
                    <MovieItemButtons movie={props.movie}/>
                </div>
            </Card>
        </li>
    )
}

export default MovieItem;