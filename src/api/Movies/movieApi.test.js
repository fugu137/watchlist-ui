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
                movies: [],
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
            const query = 'searchTerm'

            axios.get.mockResolvedValueOnce({});
            await MovieApi.search(query);

            expect(axios.get).toHaveBeenCalledWith(url, { params: { movieTitle: query } });
        });

        it('returns correct response if api call successful', async () => {
            const query = 'searchTerm'
            const payload = {
                data: ['Movie1', 'Movie2', 'Movie3'],
            };

            const expectedResponse = { movies: payload.data, error: null };

            axios.get.mockResolvedValue(payload);
            const response = await MovieApi.search(query);

            expect(response).toStrictEqual(expectedResponse);
        });

        it('returns correct response if api call not successful', async () => {
            const query = 'searchTerm'
            const error = new Error({ message: 'Message' })

            const expectedResponse = {
                movies: null,
                error: 'Something went wrong. Unable to get search results. ' + error.message,
            };

            axios.get.mockRejectedValue(error);
            const response = await MovieApi.search(query);

            expect(response).toStrictEqual(expectedResponse);
        });
    });
});