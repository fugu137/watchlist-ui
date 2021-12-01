import { useEffect, useState } from 'react';
import MovieApi from '../../api/Movies/movieApi';
import '../../index.css';
import '../SearchBar/SearchBar.css';

function SearchBar ({ clickEvent }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (clickEvent) {
            const classes = clickEvent.target.classList;

            if (!classes.contains('SearchBar__button') && !classes.contains('SearchBar__resultsItem')) {
                closeSearchResults();
            }
        }
    }, [clickEvent]);

    const handleSearchButtonClick = (event) => {
        event.preventDefault();
        search();
    };

    const handleSearchQueryChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearchInputKeyPress = (event) => {
        if (event.key === 'Enter') {
            search();
        }
    };

    const handleSearchItemClick = (event) => {
        const imdbID = event.target.id;
        MovieApi.addMovie(imdbID);

        closeSearchResults();
    };

    const search = async () => {
        const response = await MovieApi.search(query);

        if (response.movies) {
            setResults(response.movies);
        }
    };

    const closeSearchResults = () => {
        if (results.length > 0) {
            setResults([]);
            setQuery('');
        }
    };

    return (
        <section className="SearchBar">
            <span className="SearchBar__wrapper">
                <input
                    className="SearchBar__input"
                    type="text"
                    placeholder="Search for a movie to add to your watchlist..."
                    value={query}
                    onChange={handleSearchQueryChange}
                    onKeyUp={handleSearchInputKeyPress}
                />
                {results.length > 0 && (
                    <ul className="SearchBar__results">
                        {results.map((result, index) => (
                            <li
                                className="SearchBar__resultsItem"
                                key={index}
                                id={result.imdbID}
                                onClick={handleSearchItemClick}
                            >
                                {result.title + ' (' + result.year + ')'}
                            </li>
                        ))}
                    </ul>
                )}
            </span>
            <button className="SearchBar__button" onClick={handleSearchButtonClick}>
                Search
            </button>
        </section>
    );
}

export default SearchBar;
