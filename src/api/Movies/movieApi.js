import baseURL from "../baseUrl";


const MovieApi = {

    loadMovies: async () => {
        const url = `${baseURL}/movies`

        const options = {
            method: 'GET',
            url: url,
            withCredentials: true,
        }

        return await axios(options);
    }
};

export default MovieApi;
