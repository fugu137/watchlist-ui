import { useRef, useState } from 'react';
import '../../index.css';
import '../SearchBar/SearchBar.css';

function SearchBar () {
    const [query, setQuery] = useState('');
    const [active, setSearchActive] = useState(false);
    const [results, setResults] = useState([]);
    const inputRef = useRef();

    const handleSearchButtonClick = (event) => {
        event.preventDefault();
        setSearchActive(true);
        setResults((old) => [...old, query]);
    };

    return (
        <section className={active ? "SearchBar SearchBar--active" : "SearchBar"}>
            <input
                ref={inputRef}
                className="SearchBar__input"
                type="text"
                placeholder="Search for a movie to add to your watchlist..."
                onChange={(event) => setQuery(event.target.value)}
            />
            <button
                className="SearchBar__button"
                onClick={handleSearchButtonClick}
            >
                Search
            </button>
            {results.length > 0 && (
                <ul className="SearchBar__results">
                    {results.map((result, index) => (
                        <li className="SearchBar__resultsItem" key={index}>
                            {result}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default SearchBar;