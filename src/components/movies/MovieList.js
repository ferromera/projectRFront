import classes from "./MovieList.module.css";
import MovieItem from "./MovieItem";
import { Typography } from "@mui/material";
import MovieItemMini from "./MovieItemMini";

function MovieList(props) {
    if (props.movies.length == 0)
        return (
            <Typography sx={{ textAlign: "center" }}>
                No movies in this category
            </Typography>
        );
    return (
        <ul className={classes.list}>
            {props.movies.map((movie) => (
                <MovieItemMini
                    key={movie.movie.id}
                    movie={movie.movie}
                />
            ))}
        </ul>
    );
}

export default MovieList;
