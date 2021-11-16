import axios from 'axios';
import MovieApi from './movieApi';

jest.mock('axios');


describe('MovieApi', () => {
    describe('getMovies', () => {
        it('makes call to correct endpoint', async () => {
            const url = '/movies';

            axios.post.mockResolvedValueOnce({});
            await MovieApi.getMovies();

            expect(axios.post).toHaveBeenCalledWith(url);
        });

        it('returns correct response if api call successful', async () => {
            const payload = {
                movies: ['Movie1', 'Movie2', 'Movie3'],
            };

            const expectedResponse = { ...payload, error: null };

            axios.post.mockResolvedValue(payload);
            const response = await MovieApi.getMovies();

            expect(response).toStrictEqual(expectedResponse);
        });

        it('returns correct response if api call not successful', async () => {
            const expectedResponse = {
                movies: [],
                error: 'Something went wrong. Unable to retrieve movie list.',
            };

            axios.post.mockRejectedValue({ response: { status: 500 } });
            const response = await MovieApi.getMovies();

            expect(response).toStrictEqual(expectedResponse);
        });
    });
});