import '../../App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import MovieApi from '../../api/Movies/movieApi';


function Home(props) {

    const [movies, setMovies] = useState(null);

    useEffect(() => {

        MovieApi.loadMovies()
                .then(response => {
                    setMovies(response.data);
                })
                .catch(error => {
                    console.error("Movies error: ", error.response)
                    setMovies([]);
                })

    }, [props.loggedIn]);

    return (
        <div className="Home">
            <h1>Home Page</h1>
            {/* {props.loggedIn === null
                ? <StatusMessage />
                : <MovieList movies={movies} />} */}
                <MovieList movies={movies} />
        </div>
    );
}

function StatusMessage() {
    return <p>"Not logged in..."</p>;
}

function MovieList({ movies }) {

    if (!movies) {
        return <p>"Not logged in..."</p>;

    } else {
        return (
            <>
                {movies.length === 0 
                    ? <p>No movies found...</p> 
                    : movies.map((movie, index) => <p key={index}>{movie.name}</p>)}
            </>
        );
    }
}

export default Home;
