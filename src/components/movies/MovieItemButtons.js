import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
} from "@mui/material";
import { useContext, useState } from "react";
import WatchedContext from "../../store/WatchedContext";
import { USER_ID } from "../../App";
import { postUserMovie } from "../../services/UserMovieService";
import StarIcon from '@mui/icons-material/Star';

function MovieItemButtons(props) {
    const watchedContext = useContext(WatchedContext);
    const itemIsWatched = watchedContext.itemIsWatched(props.movie.id);
    const itemIsWantToWatch = watchedContext.itemIsWantToWatch(props.movie.id);
    const [rating, setRating] = useState(props.userData && props.userData.rating ? props.userData.rating : '');
    const [tempRating, setTempRating] = useState(props.userData && props.userData.rating ? props.userData.rating : '');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    
    function updateWatchedCall() {
        watchedContext.setUpdated(false);
        const json = {
            userId: USER_ID,
            movieId: props.movie.id,
            watched: !itemIsWatched,
            wantToWatch: false,
            rating: 0
        };
        postUserMovie(json).then((res) => watchedContext.setUpdated(true));
    }

    function updateRatingCall() {
        watchedContext.setUpdated(false);
        const json = {
            userId: USER_ID,
            movieId: props.movie.id,
            watched: tempRating ? true: itemIsWatched,
            wantToWatch: tempRating ? false : itemIsWantToWatch,
            rating: tempRating ? tempRating : 0
        };
        postUserMovie(json).then((res) => {
            setModalIsOpen(false);
            watchedContext.setUpdated(true);
        });
    }

    function watchedHandler() {
        updateWatchedCall();
        setTempRating('');
        setRating('');
        if (itemIsWatched) {
            watchedContext.removeWatched(props.movie.id);
        } else {
            watchedContext.addWatched(props.movie);
            watchedContext.removeWantToWatch(props.movie.id);
        }
    }

    function updateWantToWatchCall() {
        watchedContext.setUpdated(false);
        const json = {
            userId: USER_ID,
            movieId: props.movie.id,
            watched: false,
            wantToWatch: !itemIsWantToWatch,
            rating: 0
        };
        postUserMovie(json).then((res) => watchedContext.setUpdated(true));
    }

    function wantToWatchHandler() {
        updateWantToWatchCall();
        setTempRating('');
        setRating('');
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

    function handleClose() {
        setModalIsOpen(false);
        setTempRating(rating);
    }

    function handleOpen() {
        setModalIsOpen(true);
    }

    function rateSaveHandler() {
        updateRatingCall();
        setRating(tempRating);
        if (!itemIsWatched && tempRating) {
            watchedContext.addWatched(props.movie);
            watchedContext.removeWantToWatch(props.movie.id);
        }
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
                { rating ? (<div>
                    <span style={{ fontSize: "1.2rem", lineHeight: 1 }}>{rating}</span>
                    <StarIcon sx={{ verticalAlign: "sub", marginLeft: "5px" }} /></div>) : "Rate"
                }
            </Button>
            <Modal
                open={modalIsOpen}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={modalStyle}>
                    <FormControl
                        size="small"
                        sx={{ m: 1, minWidth: 120 }}
                    >
                        <InputLabel id="rating">
                            Rating
                        </InputLabel>
                        <Select
                            labelId="rating"
                            id="rating-select"
                            value={tempRating}
                            label="rating"
                            onChange={ratingChangeHandler}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>1 <StarIcon sx={{verticalAlign: "sub", verticalAlign: "sub", marginLeft: "5px" }}/></MenuItem>
                            <MenuItem value={2}>2 <StarIcon sx={{verticalAlign: "sub", marginLeft: "5px" }}/></MenuItem>
                            <MenuItem value={3}>3 <StarIcon sx={{verticalAlign: "sub", marginLeft: "5px" }}/></MenuItem>
                            <MenuItem value={4}>4 <StarIcon sx={{verticalAlign: "sub", marginLeft: "5px" }}/></MenuItem>
                            <MenuItem value={5}>5 <StarIcon sx={{verticalAlign: "sub", marginLeft: "5px" }}/></MenuItem>
                            <MenuItem value={6}>6 <StarIcon sx={{verticalAlign: "sub", marginLeft: "5px" }}/></MenuItem>
                            <MenuItem value={7}>7 <StarIcon sx={{verticalAlign: "sub", marginLeft: "5px" }}/></MenuItem>
                            <MenuItem value={8}>8 <StarIcon sx={{verticalAlign: "sub", marginLeft: "5px" }}/></MenuItem>
                            <MenuItem value={9}>9 <StarIcon sx={{verticalAlign: "sub", marginLeft: "5px" }}/></MenuItem>
                            <MenuItem value={10}>10 <StarIcon sx={{verticalAlign: "sub", marginLeft: "5px" }}/></MenuItem>
                        </Select>
                    </FormControl>
                    <Button sx={buttonStyle} variant="outlined" onClick={rateSaveHandler}>
                Save
            </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default MovieItemButtons;
