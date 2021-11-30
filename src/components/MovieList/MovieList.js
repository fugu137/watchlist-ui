import '../MovieList/MovieList.css';

function MovieList ({ moviesStatus }) {
    if (!moviesStatus) {
        return <p>"Loading..."</p>;
    }

    const movies = moviesStatus.movies;
    const error = moviesStatus.error;

    if (!movies) {
        return <p>{error}</p>
    }

    return (
        <section className="MovieList">
            {movies.length === 0 ? (
                <p>No movies found...</p>
            ) : (
                <ul className="MovieList__list">
                    {movies.map((movie, index) => (
                        <li className="MovieList__listItem" key={index}>
                            {movie.title}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default MovieList;
