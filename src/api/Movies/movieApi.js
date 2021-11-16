import axios from 'axios';


const MovieApi = {

    getMovies: async () => {
        const url = '/movies';

        return await axios.get(url)
            .then(response => ({
                movies: response.data,
                error: null,
            }))
            .catch(() => ({
                movies: [],
                error: 'Something went wrong. Unable to retrieve movie list.',
            }));
    }
};

export default MovieApi;
