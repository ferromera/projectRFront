import classes from './MovieList.module.css'
import MovieItem from "./MovieItem";

function MovieList(props) {
    return (
        <ul className={classes.list}>
            {props.movies.map((movie) => (
                <MovieItem
                    key={movie.movie.id}
                    movie={movie.movie}
                    userData={movie.userData}
                />
            ))}
        </ul>
    )
}

export default MovieList;