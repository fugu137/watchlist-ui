import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar/SearchBar';
import movieApi from '../../api/Movies/movieApi';
import { act } from 'react-dom/test-utils';
import MovieApi from '../../api/Movies/movieApi';

jest.mock('../../api/Movies/movieApi');

describe('SearchBar', () => {
    beforeEach(() => {
        const response = {
            movies: [
                {
                    title: 'Result1',
                    imdbID: '1234',
                    year: '2001',
                },
                {
                    title: 'Result2',
                    imdbID: '5678',
                    year: '2002',
                },
                {
                    title: 'Result3',
                    imdbID: '9012',
                    year: '2003',
                },
            ],
            error: null,
        };

        movieApi.search.mockResolvedValueOnce(response);
        render(<SearchBar onMovieSave={() => {}} />);
    });

    it('displays search results on search button click', async () => {
        const input = screen.getByPlaceholderText('Search for a movie to add to your watchlist...');
        const searchButton = screen.getByRole('button', { name: 'Search' });

        fireEvent.change(input, { target: { value: 'Search text' } });
        fireEvent.click(searchButton);

        expect(movieApi.search).toHaveBeenCalled();

        expect(await screen.findByText('Result1 (2001)')).toBeInTheDocument();
        expect(await screen.findByText('Result2 (2002)')).toBeInTheDocument();
        expect(await screen.findByText('Result3 (2003)')).toBeInTheDocument();
    });

    it('displays search results on ENTER', async () => {
        const input = screen.getByPlaceholderText('Search for a movie to add to your watchlist...');

        fireEvent.change(input, { target: { value: 'Search text' } });
        fireEvent.keyUp(input, { key: 'Enter', code: 'Enter', charCode: 13 });

        expect(movieApi.search).toHaveBeenCalled();

        expect(await screen.findByText('Result1 (2001)')).toBeInTheDocument();
        expect(await screen.findByText('Result2 (2002)')).toBeInTheDocument();
        expect(await screen.findByText('Result3 (2003)')).toBeInTheDocument();
    });

    it('adds movie', async () => {
        const input = screen.getByPlaceholderText('Search for a movie to add to your watchlist...');
        const searchButton = screen.getByRole('button', { name: 'Search' });

        await act(async () => {
            fireEvent.change(input, { target: { value: 'Search text' } });
            fireEvent.click(searchButton);
        });

        const result = await screen.findByText('Result2 (2002)');
        await act(async () => fireEvent.click(result));

        expect(movieApi.addMovie).toHaveBeenCalled();
    });
});
