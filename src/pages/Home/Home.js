import '../../App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';


function Home(props) {

    const [movies, setMovies] = useState(null);

    useEffect(() => {
        console.log("login status changed...")
        console.log(props.loggedIn)

        if (!props.loggedIn) {
            return;
        }

        const loadMovies = async () => {
            await axios({
                method: 'GET',
                url: "http://localhost:8080/movies",
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            })
                .then(response => {
                    console.log(response.data)
                    setMovies(response.data);
                })
                .catch(error => {
                    console.error("Movies error: ", error.response)
                    setMovies([]);
                })
        }
        loadMovies();

    }, [props.loggedIn])

    return (
        <div className="Home">
            <h1>Home Page</h1>
            {props.loggedIn === null
                ? <StatusMessage />
                : <MovieList movies={movies} />}
        </div>
    );
}

function StatusMessage() {
    return <p>"Not logged in..."</p>;
}

function MovieList({ movies }) {

    if (!movies) {
        return "Loading...";

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
