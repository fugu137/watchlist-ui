import axios from 'axios';


const MovieApi = {

    getMovies: async () => {
        const url = '/movies';

        return await axios.post(url)
            .then(response => ({
                movies: response.movies,
                error: null,
            }))
            .catch(() => ({
                movies: [],
                error: 'Something went wrong. Unable to retrieve movie list.',
            }));
    }
};

export default MovieApi;
