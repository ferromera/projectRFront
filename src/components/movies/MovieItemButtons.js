import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import WatchedContext from "../../store/WatchedContext";
import { postUserMovie } from "../../services/UserMovieService";
import StarIcon from "@mui/icons-material/Star";
import { getCurrentUser } from "../../services/AuthService";


function MovieItemButtons(props) {
    const watchedContext = useContext(WatchedContext);

    const itemIsWatched = watchedContext.itemIsWatched(props.movie.id);
    const itemIsWantToWatch = watchedContext.itemIsWantToWatch(props.movie.id);
    const [rating, setRating] = useState(
        props.userData && props.userData.rating ? props.userData.rating : ""
    );
    const [tempRating, setTempRating] = useState(
        props.userData && props.userData.rating ? props.userData.rating : ""
    );
    const [review, setReview] = useState(
        props.userData && props.userData.review
            ? props.userData.review.content
            : ""
    );
    const [noRatingError, setNoRatingError] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 2,
    };

    function updateWatchedCall() {
        const json = {
            userId: getCurrentUser().id,
            movieId: props.movie.id,
            watched: !itemIsWatched,
            wantToWatch: false,
            rating: 0,
        };
        postUserMovie(json).then((res) => {});
    }

    function updateRatingCall() {
        const json = {
            userId: getCurrentUser().id,
            movieId: props.movie.id,
            watched: tempRating ? true : itemIsWatched,
            wantToWatch: tempRating ? false : itemIsWantToWatch,
            rating: tempRating ? tempRating : 0,
            review: review,
        };
        postUserMovie(json).then((res) => {
            window.location.reload();
        });
    }

    function watchedHandler() {
        updateWatchedCall();
        setTempRating("");
        setRating("");
        if (itemIsWatched) {
            watchedContext.removeWatched(props.movie.id);
        } else {
            watchedContext.addWatched(props.movie);
            watchedContext.removeWantToWatch(props.movie.id);
        }
    }

    function updateWantToWatchCall() {
        const json = {
            userId: getCurrentUser().id,
            movieId: props.movie.id,
            watched: false,
            wantToWatch: !itemIsWantToWatch,
            rating: 0,
        };
        postUserMovie(json).then((res) => {});
    }

    function wantToWatchHandler() {
        updateWantToWatchCall();
        setTempRating("");
        setRating("");
        if (itemIsWantToWatch) {
            watchedContext.removeWantToWatch(props.movie.id);
        } else {
            watchedContext.addWantToWatch(props.movie);
            watchedContext.removeWatched(props.movie.id);
        }
    }

    function ratingChangeHandler(e) {
        setTempRating(e.target.value);
    }

    function reviewChangeHandler(e) {
        setReview(e.target.value);
    }

    function handleClose() {
        setModalIsOpen(false);
        setTempRating(rating);
    }

    function handleOpen() {
        setModalIsOpen(true);
    }

    function rateSaveHandler() {
        if (review && !tempRating) {
            setNoRatingError("You must rate to submit a review");
            return;
        }
        updateRatingCall();
    }

    const buttonStyle = {
        margin: "10px",
    };

    return (
        <div style={{ marginLeft: "350px" }}>
            {itemIsWatched ? (
                <Button
                    sx={buttonStyle}
                    variant="contained"
                    onClick={watchedHandler}
                >
                    Watched
                </Button>
            ) : (
                <Button
                    sx={buttonStyle}
                    variant="outlined"
                    onClick={watchedHandler}
                >
                    Watched
                </Button>
            )}
            {itemIsWantToWatch ? (
                <Button
                    sx={buttonStyle}
                    variant="contained"
                    onClick={wantToWatchHandler}
                >
                    Want to watch
                </Button>
            ) : (
                <Button
                    sx={buttonStyle}
                    variant="outlined"
                    onClick={wantToWatchHandler}
                >
                    Want to watch
                </Button>
            )}
            <Button sx={buttonStyle} variant="outlined" onClick={handleOpen}>
                {rating ? (
                    <div>
                        <span style={{ fontSize: "1.2rem", lineHeight: 1 }}>
                            {rating}
                        </span>
                        <StarIcon
                            sx={{ verticalAlign: "sub", marginLeft: "5px" }}
                        />
                    </div>
                ) : (
                    "Rate"
                )}
            </Button>
            <Modal
                open={modalIsOpen}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={modalStyle}>
                    <FormControl size="small" sx={{ m: 1, minWidth: 400 }}>
                
                        <Box sx={{ width: "100px", margin: "0 auto" }}>
                            <InputLabel
                                sx={{ left: "auto", right: "auto" }}
                                id="rating"
                                
                            >
                                Rating
                            </InputLabel>
                            <Select
                                sx={{ width: "100%" }}
                                labelId="rating"
                                id="rating-select"
                                value={tempRating}
                                label="rating"
                                onChange={ratingChangeHandler}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((i) => {
                                    return (
                                        <MenuItem key={i}  value={i}>
                                            {i + " "}
                                            <StarIcon
                                                sx={{
                                                    verticalAlign: "sub",
                                                    verticalAlign: "sub",
                                                    marginLeft: "5px",
                                                }}
                                            />
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </Box>
                        {noRatingError && <FormHelperText sx={{margin:"10px"}} error>{noRatingError}</FormHelperText>}
                        <TextField
                            sx={{ marginTop: "20px" }}
                            size="small"
                            onChange={reviewChangeHandler}
                            value={review}
                            fullWidth
                            label={"Review"}
                            variant="outlined"
                            multiline
                            minRows={4}
                            maxRows={10}
                        />
                        <Button
                            sx={{
                                width: "50px",
                                marginTop: "10px",
                                marginLeft: "auto",
                            }}
                            variant="outlined"
                            onClick={rateSaveHandler}
                        >
                            Save
                        </Button>
                    </FormControl>
                </Box>
            </Modal>
        </div>
    );
}

export default MovieItemButtons;
