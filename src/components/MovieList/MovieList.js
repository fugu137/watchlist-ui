import '../MovieList/MovieList.css';

function MovieList ({ movies }) {
    if (!movies) {
        return <p>"Loading..."</p>;
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
