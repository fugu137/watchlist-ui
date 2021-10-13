import '../../App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';


function Home(props) {

    const [movies, setMovies] = useState(null);

    const setLoggedIn = props.statusHandler;

    // useEffect(() => {
    //     const getPrincipal = async () => {
    //         const url = 'http://localhost:8080/accounts/principal';

    //         axios({
    //             method: 'GET',
    //             url: url,
    //             withCredentials: true,
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Access-Control-Allow-Origin': '*',
    //             }
    //         })  
    //             .then(response => {
    //                 if (response === 204) {
    //                     setLoggedIn(false);
    //                 } 
    //                 if (response === 200) {
    //                     setLoggedIn(true);
    //                 }
    //             })
    //             .catch(error => console.error("Principal Error:", error));
    //     }

    //     getPrincipal();

    // }, [setLoggedIn]);


    // useEffect(() => {
    //     console.log(document.cookie);
    //     console.log(document.location.href);
    // });

    useEffect(() => {
        console.log("login status changed...", props.loggedIn)

        // if (!props.loggedIn) {
        //     setMovies(null);
        //     return;
        // }

        const loadMovies = async () => {
            axios({
                method: 'GET',
                url: "http://localhost:8080/movies",
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            })
                .then(response => {
                    console.log(response.data)
                    setMovies(response.data);
                })
                .catch(error => {
                    console.error("Movies error: ", error.response)
                    setMovies([]);
                })
        }
        loadMovies();

    }, [props.loggedIn])

    return (
        <div className="Home">
            <h1>Home Page</h1>
            {/* {props.loggedIn === null
                ? <StatusMessage />
                : <MovieList movies={movies} />} */}
                <MovieList movies={movies} />
        </div>
    );
}

function StatusMessage() {
    return <p>"Not logged in..."</p>;
}

function MovieList({ movies }) {

    if (!movies) {
        return <p>"Not logged in..."</p>;

    } else {
        return (
            <>
                {movies.length === 0 
                    ? <p>No movies found...</p> 
                    : movies.map((movie, index) => <p key={index}>{movie.name}</p>)}
            </>
        );
    }
}

export default Home;
