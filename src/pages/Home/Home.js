import '../../App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import MovieApi from '../../api/Movies/movieApi';


function Home({loggedIn}) {

    const [movies, setMovies] = useState(null);

    useEffect(() => {
        MovieApi.getMovies().then(response => {
            setMovies(response.movies); 
        })

    }, [loggedIn]);

    return (
        <div className="Home">
            <h1>Home Page</h1>
            {!loggedIn
                ? <p>Not logged in...</p>
                : <MovieList movies={movies} />
            }
        </div>
    );
}

function MovieList({ movies }) {

    if (!movies) {
        return <p>"Loading..."</p>;

    } else {
        return (
            <>
                {movies.length === 0
                    ? <p>No movies found...</p>
                    : movies.map((movie, index) => <p key={index}>{movie.title}</p>)}
            </>
        );
    }
}

export default Home;
