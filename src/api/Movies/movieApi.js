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
    addMovie: async (id) => {
        const url = '/movies';

        return await axios
            .post(url, { imdbID: id })
            .then(() => ({ error: null }))
            .catch((error) => {
                if (error.response.status === 409) {
                    return { error: 'Movie already added to watchlist.' };
                }
                if (error.response.status === 404) {
                    return { error: 'Movie does not exist in OMDB database.' };
                }
                return { error: 'Something went wrong. Movie could not be added to watchlist.' };
            });
    },
    removeMovie: async (id) => {
        const url = '/movies/remove';

        return await axios
            .post(url, { imdbID: id })
            .then(() => {
                return { error: null };
            })
            .catch((error) => {
                if (error.response.status === 409) {
                    return { error: 'Bad request. Movie ID or account does not exist.' };
                }
                return { error: 'Something went wrong. Movie could not be removed from watchlist.' };
            });
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
