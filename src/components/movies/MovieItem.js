import classes from "./MovieItem.module.css";
import Card from "../ui/Card";
import { BACKEND_HOST } from "../../App";
import MovieItemButtons from "./MovieItemButtons";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteMovie } from "../../services/MovieService";
import WatchedContext from "../../store/WatchedContext";
import { useContext } from "react";
import MovieTitle from "./MovieTitle";
import MovieYear from "./MovieYear";
import MovieDescription from "./MovieDescription";

function MovieItem(props) {
    const navigate = useNavigate();
    const watchedContext = useContext(WatchedContext);

    function editHandler() {
        navigate("/movies/edit/" + props.movie.id);
    }

    function deleteHandler() {
        watchedContext.setDeleting(true);
        deleteMovie(props.movie.id).then(() => {
            watchedContext.setDeleting(false);
        });
    }

    return (
        <li className={classes.item}>
            <Card>
                <Button
                    sx={{ float: "right", margin: "5px" }}
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={deleteHandler}
                >
                    Delete
                </Button>
                <Button
                    sx={{ float: "right", margin: "5px" }}
                    size="small"
                    variant="outlined"
                    onClick={editHandler}
                >
                    Edit
                </Button>
                <div className={classes.container}>
                    <div className={classes.image}>
                        <img
                            src={
                                BACKEND_HOST +
                                "/movies/images/" +
                                props.movie.id
                            }
                            alt={props.movie.title}
                        />
                    </div>
                    <div className={classes.content}>
                        <MovieTitle text={props.movie.title}></MovieTitle>
                        <MovieYear year={props.movie.year}></MovieYear>
                        <MovieDescription text={props.movie.description}></MovieDescription>
                    </div>
                    <MovieItemButtons movie={props.movie} />
                </div>
            </Card>
        </li>
    );
}

export default MovieItem;
