import { useEffect, useRef, useState } from 'react';
import '../../index.css';
import '../SearchBar/SearchBar.css';

function SearchBar () {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearchButtonClick = (event) => {
        event.preventDefault();
        setResults((old) => [...old, query]);

        document.addEventListener('click', windowClickListener);
    };

    const closeSearchResults = () => {
        setResults([]);
        setQuery('');
        document.removeEventListener('click', windowClickListener);
    };

    const windowClickListener = (event) => {
        const classes = event.target.classList;

        if (!classes.contains('SearchBar__button') && !classes.contains('SearchBar__resultsItem')) {
            closeSearchResults();
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
                    onChange={(event) => setQuery(event.target.value)}
                />
                {results.length > 0 && (
                    <ul className="SearchBar__results">
                        {results.map((result, index) => (
                            <li className="SearchBar__resultsItem" key={index}>
                                {result}
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
