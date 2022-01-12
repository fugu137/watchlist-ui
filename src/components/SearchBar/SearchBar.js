import { useEffect, useState, useCallback } from 'react';
import MovieApi from '../../api/Movies/movieApi';
import '../../index.css';
import '../SearchBar/SearchBar.css';

function SearchBar ({ clickEvent, onMovieSave }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const search = async () => {
        const response = await MovieApi.search(query.trim());

        if (response.movies) {
            setResults(response.movies);
        }
    };

    const closeSearchResults = useCallback(() => {
        setResults([]);
        setQuery('');
    }, []);

    const handleSearchQueryChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearchButtonClick = (event) => {
        event.preventDefault();
        search();
    };

    const handleSearchInputKeyPress = (event) => {
        if (event.key === 'Enter') {
            search();
        }
    };

    const handleSearchItemClick = async (event) => {
        closeSearchResults();
        
        const imdbID = event.target.id;
        const response = await MovieApi.addMovie(imdbID);
        console.log(response)

        onMovieSave();
    };

    useEffect(() => {
        if (clickEvent) {
            const classes = clickEvent.target.classList;

            if (!classes.contains('SearchBar__button') && !classes.contains('SearchBar__resultsItem')) {
                closeSearchResults();
            }
        }
    }, [clickEvent, closeSearchResults]);

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
                        {results.map((result) => (
                            <li
                                className="SearchBar__resultsItem"
                                key={result.imdbID}
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
