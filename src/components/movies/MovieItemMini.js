import classes from "./MovieItemMini.module.css";
import { BACKEND_HOST } from "../../App";
import { Button, Chip, Divider, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteMovie } from "../../services/MovieService";
import WatchedContext from "../../store/WatchedContext";
import { useContext } from "react";
import UserContext from "../../store/UserContext";

function MovieItemMini(props) {
    const navigate = useNavigate();
    const watchedContext = useContext(WatchedContext);
    const userContext = useContext(UserContext);

    function editHandler(event) {
        event.stopPropagation();
        navigate("/movies/edit/" + props.movie.id);
    }

    function deleteHandler() {
        watchedContext.setDeleting(true);
        deleteMovie(props.movie.id).then(() => {
            watchedContext.setDeleting(false);
        });
    }

    function openItemHandler() {
        navigate("/movies/" + props.movie.id);
    }

    return (
        <li className={classes.item} onClick={openItemHandler}>
            <Paper sx={{ marginBottom: "4px" }} >
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
                        <div className={classes.content} >
                            <Typography
                                variant="p"
                                component="div"
                                sx={{
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    margin: "5px 0",
                                    fontSize: "19px",
                                }}
                            >
                                {props.movie.title}
                            </Typography>
                            <div className={classes.genresLines}>
                                <Typography
                                    variant="p"
                                    component="div"
                                    sx={{
                                        fontSize: "15px",
                                        display: "inline",
                                        marginRight: "10px",
                                    }}
                                >
                                    {props.movie.year ? props.movie.year : null}
                                </Typography>
                                {props.movie.genres.map(function (value) {
                                    return (
                                        <Chip
                                            sx={{
                                                fontSize: "12px",
                                                height: "20px",
                                                marginRight: "10px",
                                                backgroundColor: "#efefef"
                                            }}
                                            key={value.name}
                                            variant="outlined"
                                            size="small"
                                            label={value.name}
                                        />
                                    );
                                })}
                            </div>
                            <Typography
                                variant="p"
                                component="div"
                                sx={{
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    fontSize: "14px",
                                    marginTop: "6px",
                                }}
                            >
                                Título original: {props.movie.originalTitle}
                            </Typography>
                        </div>
                        <div className={classes.buttons}>
                            {userContext.user?.roles.includes("ROLE_ADMIN") && (
                                <div>
                                    <Button
                                        sx={{
                                            minWidth: "0px",
                                            width: "50px",
                                            fontSize: "0.5rem",
                                            padding: "2px 10px",
                                            margin: "5px 0",
                                        }}
                                        size="small"
                                        variant="outlined"
                                        onClick={editHandler}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        sx={{
                                            minWidth: "0px",
                                            width: "50px",
                                            fontSize: "0.5rem",
                                            padding: "2px 10px",
                                            margin: "5px 0",
                                        }}
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
