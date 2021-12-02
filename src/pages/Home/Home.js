import { useEffect, useState, useCallback } from 'react';
import MovieApi from '../../api/Movies/movieApi';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import '../Home/Home.css';

function Home ({ loggedIn, clickEvent }) {
    const [movieState, setMovieState] = useState();

    const loadMovies = useCallback(() => {
        MovieApi.getMovies().then((response) => {
            setMovieState(response);
        });
    }, []);

    useEffect(() => {
        if (loggedIn) {
            loadMovies();
        }
    }, [loggedIn, loadMovies]);

    return (
        <main className="Home">
            <h1>Movie Watchlist</h1>
            {!loggedIn ? (
                <section>
                    <p>Not logged in...{loggedIn}</p>
                </section>
            ) : (
                <>
                    <SearchBar clickEvent={clickEvent} onMovieSave={loadMovies} />
                    <MovieList movieState={movieState} />
                </>
            )}
        </main>
    );
}

export default Home;
