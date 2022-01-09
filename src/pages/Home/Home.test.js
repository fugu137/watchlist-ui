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
        it('displays search bar', async () => {
            MovieApi.getMovies.mockResolvedValueOnce({
                movies: [],
                error: null,
            });

            render(<Home loggedIn={'username'} />);

            expect(await screen.findByRole('textbox', { type: 'text' })).toBeInTheDocument();
            expect(await screen.findByRole('button', { name: 'Search' })).toBeInTheDocument();
        });

        it('displays section for list of movies', async () => {
            MovieApi.getMovies.mockResolvedValueOnce({
                movies: [],
                error: null,
            });

            render(<Home loggedIn={'username'} />);

            expect(await screen.findByText('No movies found...')).toBeInTheDocument();
        });

        it('displays list of movies', async () => {
            MovieApi.getMovies.mockResolvedValueOnce({
                movies: [
                    {
                        title: 'Movie1',
                        imdbID: '1234',
                        imdbRating: '6.6',
                        year: 2000,
                        tomatoesRating: '66%',
                        metacriticRating: '60%',
                    },
                    {
                        title: 'Movie2',
                        imdbID: '5678',
                        year: 2001,
                        imdbRating: '8.6',
                        tomatoesRating: '86%',
                        metacriticRating: '80%',
                    },
                    {
                        title: 'Movie3',
                        imdbID: '9112',
                        year: 2002,
                        imdbRating: '9.1',
                        tomatoesRating: '98%',
                        metacriticRating: '90%',
                    },
                ],
                error: null,
            });

            render(<Home loggedIn={'username'} />);

            expect(await screen.findByText('Movie1')).toBeInTheDocument();
            expect(await screen.findByText('2000')).toBeInTheDocument();
            expect(await screen.findByText('IMDB: 6.6')).toBeInTheDocument();
            expect(await screen.findByText('TOMATOES: 66%')).toBeInTheDocument();
            expect(await screen.findByText('METACRITIC: 60%')).toBeInTheDocument();

            expect(await screen.findByText('Movie2')).toBeInTheDocument();
            expect(await screen.findByText('2001')).toBeInTheDocument();
            expect(await screen.findByText('IMDB: 8.6')).toBeInTheDocument();
            expect(await screen.findByText('TOMATOES: 86%')).toBeInTheDocument();
            expect(await screen.findByText('METACRITIC: 80%')).toBeInTheDocument();

            expect(await screen.findByText('Movie3')).toBeInTheDocument();
            expect(await screen.findByText('2002')).toBeInTheDocument();
            expect(await screen.findByText('IMDB: 9.1')).toBeInTheDocument();
            expect(await screen.findByText('TOMATOES: 98%')).toBeInTheDocument();
            expect(await screen.findByText('METACRITIC: 90%')).toBeInTheDocument();

        });

        it('displays error message if movie list cannot be retrieved', async () => {
            const response = {
                movies: null,
                error: 'Something went wrong. Unable to retrieve movie list',
            };

            MovieApi.getMovies.mockResolvedValueOnce(response);

            render(<Home loggedIn={'username'} />);

            expect(await screen.findByText(response.error)).toBeInTheDocument();
        });
    });
});
