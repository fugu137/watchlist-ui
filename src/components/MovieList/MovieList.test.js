import { render, screen, waitFor, within } from '@testing-library/react';
import MovieList from './MovieList';

describe('MovieList', () => {
    const movies = [
        {
            title: 'Movie1',
            imdbID: '1234',
            year: 2000,
            synopsis: 'Synopsis for Movie1',
            imdbRating: '8.2',
            tomatoesRating: '80%',
            metacriticRating: '78%',
            posterURL: 'www.movie1.posterURL.com',
        },
        {
            title: 'Movie2',
            imdbID: '5678',
            year: 2001,
            synopsis: 'Synopsis for Movie1',
            imdbRating: '2.2',
            tomatoesRating: '31%',
            metacriticRating: '20%',
            posterURL: 'www.movie2.posterURL.com',
        },
        {
            title: 'Movie3',
            imdbID: '9112',
            year: 2002,
            synopsis: 'Synopsis for Movie1',
            imdbRating: '5.3',
            tomatoesRating: '40%',
            metacriticRating: '48%',
            posterURL: 'www.movie3.posterURL.com',
        },
    ];
    const movieState = {
        movies: movies,
        error: null,
    };

    it('displays movies correctly', async () => {
        render(<MovieList movieState={movieState} />);

        const movieList = screen.getAllByRole('list')[0];

        expect(within(movieList).getByRole('heading', { level: 2, name: 'Movie1' })).toBeInTheDocument();
        expect(within(movieList).getByRole('heading', { level: 2, name: 'Movie2' })).toBeInTheDocument();
        expect(within(movieList).getByRole('heading', { level: 2, name: 'Movie3' })).toBeInTheDocument();

        expect(within(movieList).getByAltText('Poster from www.movie1.posterURL.com')).toBeInTheDocument();
        expect(within(movieList).getByAltText('Poster from www.movie2.posterURL.com')).toBeInTheDocument();
        expect(within(movieList).getByAltText('Poster from www.movie3.posterURL.com')).toBeInTheDocument();

        const movie1Details = within(movieList).getAllByRole('list')[0];
        expect(within(movie1Details).getByText('IMDB: 8.2')).toBeInTheDocument();
        expect(within(movie1Details).getByText('TOMATOES: 80%')).toBeInTheDocument();
        expect(within(movie1Details).getByText('METACRITIC: 78%')).toBeInTheDocument();

        const movie2Details = within(movieList).getAllByRole('list')[1];
        expect(within(movie2Details).getByText('IMDB: 2.2')).toBeInTheDocument();
        expect(within(movie2Details).getByText('TOMATOES: 31%')).toBeInTheDocument();
        expect(within(movie2Details).getByText('METACRITIC: 20%')).toBeInTheDocument();

        const movie3Details = within(movieList).getAllByRole('list')[2];
        expect(within(movie3Details).getByText('IMDB: 5.3')).toBeInTheDocument();
        expect(within(movie3Details).getByText('TOMATOES: 40%')).toBeInTheDocument();
        expect(within(movie3Details).getByText('METACRITIC: 48%')).toBeInTheDocument();
    });

    it('displays loading message if moviesStatus not defined', async () => {
        render(<MovieList movieState={undefined} />);

        waitFor(() => {
            expect(screen.getByText('Loading...')).toBeInTheDocument();
        });
    });

    it('displays error message if movies is null', async () => {
        const movieState = {
            movies: null,
            error: 'Error message',
        };

        render(<MovieList movieState={movieState} />);

        expect(screen.getByText('Error message')).toBeInTheDocument();
    });
});
