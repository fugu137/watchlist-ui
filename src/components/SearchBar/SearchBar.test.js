import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar/SearchBar';
import movieApi from '../../api/Movies/movieApi';

jest.mock('../../api/Movies/movieApi');

describe('SearchBar', () => {
    beforeEach(() => {
        const response = {
            movies: [{ title: 'Result1' }, { title: 'Result2' }, { title: 'Result3' }],
            error: null,
        };

        movieApi.search.mockResolvedValueOnce(response);
        render(<SearchBar />);
    });

    it('displays search results on search button click', async () => {
        const input = screen.getByPlaceholderText('Search for a movie to add to your watchlist...');
        const button = screen.getByRole('button', { name: 'Search' });

        fireEvent.change(input, { target: { value: 'Search text' } });
        fireEvent.click(button);

        expect(movieApi.search).toHaveBeenCalled();

        expect(await screen.findByText('Result1')).toBeInTheDocument();
        expect(await screen.findByText('Result2')).toBeInTheDocument();
        expect(await screen.findByText('Result3')).toBeInTheDocument();
    });

    it('displays search results on ENTER', async () => {
        const input = screen.getByPlaceholderText('Search for a movie to add to your watchlist...');

        fireEvent.change(input, { target: { value: 'Search text' } });
        fireEvent.keyUp(input, { key: 'Enter', code: 'Enter', charCode: 13 });

        expect(movieApi.search).toHaveBeenCalled();

        expect(await screen.findByText('Result1')).toBeInTheDocument();
        expect(await screen.findByText('Result2')).toBeInTheDocument();
        expect(await screen.findByText('Result3')).toBeInTheDocument();
    });
});
