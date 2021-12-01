import axios from 'axios';
import MovieApi from './movieApi';

jest.mock('axios');

describe('MovieApi', () => {
    describe('getMovies', () => {
        it('makes call to /movies endpoint', async () => {
            const url = '/movies';

            axios.get.mockResolvedValueOnce({});
            await MovieApi.getMovies();

            expect(axios.get).toHaveBeenCalledWith(url);
        });

        it('returns correct response if api call successful', async () => {
            const payload = {
                data: ['Movie1', 'Movie2', 'Movie3'],
            };
            const expectedResponse = { movies: payload.data, error: null };

            axios.get.mockResolvedValue(payload);
            const response = await MovieApi.getMovies();

            expect(response).toStrictEqual(expectedResponse);
        });

        it('returns correct response if api call not successful', async () => {
            const expectedResponse = {
                movies: null,
                error: 'Something went wrong. Unable to retrieve movie list.',
            };

            axios.get.mockRejectedValue(new Error());
            const response = await MovieApi.getMovies();

            expect(response).toStrictEqual(expectedResponse);
        });
    });

    describe('search', () => {
        it('makes call to /omdb endpoint', async () => {
            const url = '/omdb';
            const query = 'searchTerm';

            axios.get.mockResolvedValueOnce({});
            await MovieApi.search(query);

            expect(axios.get).toHaveBeenCalledWith(url, { params: { movieTitle: query } });
        });

        it('returns correct response if api call successful', async () => {
            const query = 'searchTerm';
            const payload = {
                data: ['Movie1', 'Movie2', 'Movie3'],
            };

            const expectedResponse = { movies: payload.data, error: null };

            axios.get.mockResolvedValue(payload);
            const response = await MovieApi.search(query);

            expect(response).toStrictEqual(expectedResponse);
        });

        it('returns correct response if api call not successful', async () => {
            const query = 'searchTerm';

            const expectedResponse = {
                movies: null,
                error: 'Something went wrong. Unable to get search results.',
            };

            axios.get.mockRejectedValue(new Error());
            const response = await MovieApi.search(query);

            expect(response).toStrictEqual(expectedResponse);
        });
    });

    describe('addMovie', () => {
        const url = '/movies';
        const id = '1234abc';

        it('makes call to /movies endpoint', async () => {
            axios.post.mockResolvedValueOnce({ status: 200 });
            await MovieApi.addMovie(id);

            expect(axios.post).toHaveBeenCalledWith(url, { imdbID: id });
        });

        it('returns no error on success', async () => {
            axios.post.mockResolvedValueOnce({ status: 200 });
            const response = await MovieApi.addMovie(id);

            expect(response.error).toBeNull();
        });  
        
        it('returns `movie already added` if movie already in watchlist', async () => {
            axios.post.mockRejectedValue( { response: { status: 409 } } );
            const response = await MovieApi.addMovie(id);

            expect(response.error).toBe('Movie already added to watchlist.');
        });

        it('returns general error if movie cannot be added', async () => {
            axios.post.mockRejectedValue( { response: { status: 500 } } );
            const response = await MovieApi.addMovie(id);

            expect(response.error).toBe('Something went wrong. Movie cannot be added to watchlist.');
        });
    });
});
