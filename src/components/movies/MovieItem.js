import classes from "./MovieItem.module.css";
import Card from "../ui/Card";
import { BACKEND_HOST } from "../../App";
import MovieItemButtons from "./MovieItemButtons";
import { Button, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteMovie } from "../../services/MovieService";
import WatchedContext from "../../store/WatchedContext";
import { useContext, useState } from "react";
import MovieTitle from "./MovieTitle";
import MovieYear from "./MovieYear";
import MovieDescription from "./MovieDescription";
import UserContext from "../../store/UserContext";
import MovieOriginalTitle from "./MovieOriginalTitle";
import { Box } from "@mui/system";

function MovieItem(props) {
    const navigate = useNavigate();
    const watchedContext = useContext(WatchedContext);
    const userContext = useContext(UserContext);
    const [review, setReview] = useState(
        props.userData && props.userData.review
            ? props.userData.review.content
            : ""
    );

    function editHandler() {
        navigate("/movies/edit/" + props.movie.id);
    }

    function deleteHandler() {
        watchedContext.setDeleting(true);
        deleteMovie(props.movie.id).then(() => {
            watchedContext.setDeleting(false);
        });
    }

    const boxStyle = {
        backgroundColor: "white",
        borderRadius: "6px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
        paddingBottom: review ? "20px" : "0px"
    };

    return (
        <Box sx={boxStyle}>
            {userContext.user?.roles.includes("ROLE_ADMIN") && (
                <div>
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
                </div>
            )}

            <div className={classes.container}>
                <div className={classes.image}>
                    <img
                        src={BACKEND_HOST + "/movies/images/" + props.movie.id}
                        alt={props.movie.title}
                    />
                </div>
                <div className={classes.content}>
                    <MovieTitle text={props.movie.title}></MovieTitle>
                    <MovieYear year={props.movie.year}></MovieYear>
                    <MovieOriginalTitle
                        text={props.movie.originalTitle}
                    ></MovieOriginalTitle>
                    <MovieDescription
                        text={props.movie.description}
                    ></MovieDescription>
                </div>
                <MovieItemButtons
                    movie={props.movie}
                    userData={props.userData}
                />
            </div>

            {review && (
                <div>
                    <Divider />
                    <Box sx={{ margin: "20px 120px" }}>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{ marginBottom: "20px", textAlign: "center" }}
                        >
                            Your review
                        </Typography>
                        <Typography
                            variant="p"
                            component="div"
                            sx={{
                                marginBottom: "20px",
                                p: 2,
                                border: "1px solid #aaa",
                                borderRadius: "6px",
                                backgroundColor: "#dcecfb",
                            }}
                        >
                            {'"' + review + '"'}
                        </Typography>
                    </Box>
                </div>
            )}
        </Box>
    );
}

export default MovieItem;
