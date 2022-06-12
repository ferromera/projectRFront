import classes from './MovieList.module.css'
import MovieItem from "./MovieItem";

function MovieList(props) {
    return (
        <ul className={classes.list}>
            {props.movies.map((movie) => (
                <MovieItem
                    key={movie.id}
                    id={movie.id}
                    image={movie.image}
                    title={movie.title}
                    description={movie.description}
                />
            ))}
        </ul>
    )
}

export default MovieList;