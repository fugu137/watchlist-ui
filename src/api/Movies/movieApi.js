import axios from 'axios';

const MovieApi = {
    getMovies: async () => {
        const url = '/movies';

        return await axios
            .get(url)
            .then((response) => ({
                movies: response.data,
                error: null,
            }))
            .catch(() => ({
                movies: null,
                error: 'Something went wrong. Unable to retrieve movie list.',
            }));
    },
    search: async (query) => {
        const url = '/omdb';

        return await axios
            .get(url, { params: { movieTitle: query } })
            .then((response) => ({
                movies: response.data,
                error: null,
            }))
            .catch(() => ({
                movies: null,
                error: 'Something went wrong. Unable to get search results.',
            }));
    },
};

export default MovieApi;
