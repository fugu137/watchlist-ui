import { render, screen } from '@testing-library/react';
import MovieApi from '../../api/Movies/movieApi';
import Home from '../Home/Home';

jest.mock('../../api/Movies/movieApi');


describe('Home', () => {
    it('displays homepage heading', async () => {
        render(<Home />);

        expect(screen.getByRole('heading', { level: 1, name: 'Movie Watchlist' })).toBeInTheDocument();
    });

    describe('Not logged in', () => {
        it('displays "not logged in" message ', async () => {
            render(<Home />);

            expect(screen.getByText('Not logged in...')).toBeInTheDocument();
            expect(screen.queryByText('No movied found...')).not.toBeInTheDocument();
            expect(screen.queryAllByRole('listitem')).toHaveLength(0);
        });
    });

    describe('Logged in', () => {
        it('displays SearchBar component', async () => {
            MovieApi.getMovies.mockResolvedValueOnce({
                movies: [],
                error: null,
            });

            render(<Home loggedIn={'username'} />);

            expect(await screen.findByRole('textbox', { type: 'text' })).toBeInTheDocument();
            expect(await screen.findByRole('button', { name: 'Search' })).toBeInTheDocument();
        });

        it('displays MovieList component', async () => {
            MovieApi.getMovies.mockResolvedValueOnce({
                movies: [],
                error: null,
            });

            render(<Home loggedIn={'username'} />);

            expect(await screen.findByText('No movies found...')).toBeInTheDocument();
        });

        it('displays list of movies', async () => {
            MovieApi.getMovies.mockResolvedValueOnce({
                movies: [{ title: 'Movie1' }, { title: 'Movie2' }, { title: 'Movie3' }],
                error: null,
            });

            render(<Home loggedIn={'username'} />);

            expect(await screen.findByText('Movie1')).toBeInTheDocument();
            expect(await screen.findByText('Movie2')).toBeInTheDocument();
            expect(await screen.findByText('Movie3')).toBeInTheDocument();
        });
    });
});
