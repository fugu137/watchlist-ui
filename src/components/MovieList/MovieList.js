import '../MovieList/MovieList.css';

function MovieList ({ movieState }) {
    if (!movieState) {
        return <p>"Loading..."</p>;
    }

    const movies = movieState.movies;
    const error = movieState.error;

    if (!movies) {
        return <p>{error}</p>;
    }

    return (
        <section className="MovieList">
            {movies.length === 0 ? (
                <p>No movies found...</p>
            ) : (
                <ul className="MovieList__list">
                    {movies.map((movie) => (
                        <li className="MovieList__listItem" key={movie.imdbID}>
                            <img
                                key={movie.imdbID + 'poster'}
                                className="MovieList__poster"
                                src={movie.posterURL}
                                alt={'Poster from ' + movie.posterURL}
                            />
                            <article className="MovieList__listItem_content" key={movie.title + 'details'}>
                                <h2 className="MovieList__listItem_heading">{movie.title}</h2>
                                <ul>
                                    <li className="MovieList__listItem_content_listItem" key={movie.imdbID + 'year'}>
                                        {movie.year}
                                    </li>
                                    <li
                                        className="MovieList__listItem_content_listItem"
                                        key={movie.imdbID + 'synopsis'}
                                    >
                                        {movie.synopsis}
                                    </li>
                                    <li
                                        className="MovieList__listItem_content_listItem"
                                        key={movie.imdbID + 'imdbRating'}
                                    >
                                        {'IMDB: ' + movie.imdbRating}
                                    </li>
                                    <li
                                        className="MovieList__listItem_content_listItem"
                                        key={movie.imdbID + 'tomatoesRating'}
                                    >
                                        {'TOMATOES: ' + movie.tomatoesRating}
                                    </li>
                                    <li
                                        className="MovieList__listItem_content_listItem"
                                        key={movie.imdbID + 'metacriticRating'}
                                    >
                                        {'METACRITIC: ' + movie.metacriticRating}
                                    </li>
                                </ul>
                            </article>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default MovieList;
