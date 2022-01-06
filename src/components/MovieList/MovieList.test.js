import { render, screen, waitFor } from '@testing-library/react';
import MovieList from './MovieList';

describe('MovieList', () => {
    const movies = [{ title: 'Movie1', imdbID: '1234', imdbRating: '8.2' }, { title: 'Movie2', imdbID: '5678', imdbRating: '2.2' }, { title: 'Movie3', imdbID: '9112',imdbRating: '5.2' }];
    const movieState = {
        movies: movies,
        error: null,
    };

    it('displays movies correctly', async () => {
        render(<MovieList movieState={movieState} />);

        expect(screen.getByText('Movie1 (8.2)')).toBeInTheDocument();
        expect(screen.getByText('Movie2 (2.2)')).toBeInTheDocument();
        expect(screen.getByText('Movie3 (5.2)')).toBeInTheDocument();
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
        }

        render(<MovieList movieState={movieState} />);

        expect(screen.getByText('Error message')).toBeInTheDocument();
    });
});
