import axios from 'axios';
import MovieApi from './movieApi';

jest.mock('axios');


describe('MovieApi', () => {
    describe('getMovies', () => {
        it('makes call to correct endpoint', async () => {
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
});