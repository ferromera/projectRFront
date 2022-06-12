import MovieList from "../components/movies/MovieList";
import {useEffect, useState} from "react";
import axios from "axios";
import {getMovies} from "../services/MovieService";

const DUMMY_DATA = [
    {
        id: '1',
        title: 'Titanic',
        image: 'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg',
        description:
            'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.',
    },
    {
        id: '2',
        title: 'Avatar',
        image:
            'https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg',
        description:
            'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
    },
]

function AllMoviesPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedMovies, setLoadedMovies] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        let mounted = true;
        getMovies()
            .then(res => {
                setIsLoading(false);
                setLoadedMovies(res.data);
            })
        return () => { mounted = false; }
    }, []);

    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        );
    }

    return (
        <section>
            <h1>All Movies</h1>
            <MovieList movies={loadedMovies} />
        </section>
    );
}

export default AllMoviesPage;