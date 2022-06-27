import classes from "./MovieItemMini.module.css";
import Card from "../ui/Card";
import { BACKEND_HOST } from "../../App";
import MovieItemButtons from "./MovieItemButtons";
import { Button, Divider, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteMovie } from "../../services/MovieService";
import WatchedContext from "../../store/WatchedContext";
import { useContext } from "react";
import MovieTitle from "./MovieTitle";
import MovieYear from "./MovieYear";
import MovieDescription from "./MovieDescription";
import UserContext from "../../store/UserContext";

function MovieItemMini(props) {
    const navigate = useNavigate();
    const watchedContext = useContext(WatchedContext);
    const userContext = useContext(UserContext);

    function editHandler() {
        navigate("/movies/edit/" + props.movie.id);
    }

    function deleteHandler() {
        watchedContext.setDeleting(true);
        deleteMovie(props.movie.id).then(() => {
            watchedContext.setDeleting(false);
        });
    }

    function openItemHandler() {
        navigate("/movies/" + props.movie.id)
    }

    return (
        <li className={classes.item}>
            <Paper sx={{ marginBottom: "4px" }} onClick={openItemHandler}>
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
                    <div className={classes.contentContainer}>
                        <div className={classes.content}>
                            <Typography
                                variant="p"
                                component="div"
                                sx={{ whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden", marginTop: "10px" }}
                            >
                                {props.movie.title}
                            </Typography>
                            <Typography variant="p" component="div" sx={{}}>
                                {props.movie.year
                                    ? "(" + props.movie.year + ")"
                                    : null}
                            </Typography>
                        </div>
                        <div className={classes.buttons}>
                            {userContext.user?.roles.includes("ROLE_ADMIN") && (
                                <div>
                                    <Button
                                        sx={{ minWidth:"0px", width:"50px",fontSize:"0.5rem",padding:"2px 10px", margin: "5px 0" }}
                                        size="small"
                                        variant="outlined"
                                        onClick={editHandler}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        sx={{minWidth:"0px", width:"50px",fontSize:"0.5rem",padding:"2px 10px", margin: "5px 0" }}
                                        size="small"
                                        variant="outlined"
                                        color="error"
                                        onClick={deleteHandler}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Paper>
        </li>
    );
}

export default MovieItemMini;
