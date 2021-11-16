import axios from 'axios';
import MovieApi from './movieApi';

jest.mock('axios');


describe('MovieApi', () => {
    describe('getMovies', () => {
        it('makes call to correct endpoint', async () => {
            const options = {
                method: 'GET',
                url: '/movies',
            }

            await MovieApi.getMovies();
            expect(axios).toHaveBeenCalledWith(options);
        });
    });
});