import { useRef, useState } from 'react';
import '../../index.css';
import '../SearchBar/SearchBar.css';

function SearchBar () {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const inputRef = useRef();

    const handleSearchButtonClick = (event) => {
        event.preventDefault();
        setResults((old) => [...old, query]);
    };

    return (
        <section className="SearchBar">
            {/* <form className="SearchBar__search"> */}
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
            {/* </form> */}
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
