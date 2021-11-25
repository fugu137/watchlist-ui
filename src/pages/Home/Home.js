import { useEffect, useState } from 'react';
import MovieApi from '../../api/Movies/movieApi';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import '../Home/Home.css';

function Home ({ loggedIn, clickEvent }) {
    const [movies, setMovies] = useState(null);

    useEffect(() => {
        if (loggedIn) {
            MovieApi.getMovies().then((response) => {
                setMovies(response.movies);
            });
        }
    }, [loggedIn]);

    return (
        <main className="Home">
            <h1>Movie Watchlist</h1>
            {!loggedIn ? (
                <section>
                    <p>Not logged in...{loggedIn}</p>
                </section>
            ) : (
                <>
                    <SearchBar clickEvent={clickEvent} />
                    <MovieList movies={movies} />
                </>
            )}
        </main>
    );
}

export default Home;
