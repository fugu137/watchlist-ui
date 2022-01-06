import '../MovieList/MovieList.css';

function MovieList ({ movieState }) {
    if (!movieState) {
        return <p>"Loading..."</p>;
    }

    const movies = movieState.movies;
    const error = movieState.error;

    if (!movies) {
        return <p>{error}</p>
    }

    return (
        <section className="MovieList">
            {movies.length === 0 ? (
                <p>No movies found...</p>
            ) : (
                <ul className="MovieList__list">
                    {movies.map((movie) => (
                        <li className="MovieList__listItem" key={movie.imdbID}>
                            {movie.title + " (" + movie.imdbRating + ")"}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default MovieList;
