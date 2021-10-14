import axios from 'axios';


const MovieApi = {

    loadMovies: async () => {

        const options = {
            method: 'GET',
            url: '/movies',
        }

        return await axios(options);
    }
};

export default MovieApi;
