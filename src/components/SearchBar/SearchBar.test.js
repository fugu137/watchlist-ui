import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar/SearchBar';
import movieApi from '../../api/Movies/movieApi';

jest.mock('../../api/Movies/movieApi');

describe('SearchBar', () => {
    it('displays search results', async () => {
        const response = {
            movies: [ 
                { title: 'Result1' },
                { title:  'Result2' },
                { title: 'Result3' },
            ],
            error: null,
        };

        movieApi.search.mockResolvedValueOnce(response);

        render(<SearchBar/>);

        const input = screen.getByPlaceholderText('Search for a movie to add to your watchlist...');
        const button = screen.getByRole('button', { name: 'Search' });

        fireEvent.focus(input);
        fireEvent.change(input, { target: { value: 'Search text' } });
        fireEvent.click(button);

        expect(movieApi.search).toHaveBeenCalled();
        
        expect(await screen.findByText('Result1')).toBeInTheDocument();
        expect(await screen.findByText('Result2')).toBeInTheDocument();
        expect(await screen.findByText('Result3')).toBeInTheDocument();
    });
});