import { render, screen, waitFor } from '@testing-library/react';
import MovieList from './MovieList';

describe('MovieList', () => {
    const movies = [{ title: 'Movie1' }, { title: 'Movie2' }, { title: 'Movie3' }];
    const moviesStatus = {
        movies: movies,
        error: null,
    };

    it('displays movies correctly', async () => {
        render(<MovieList moviesStatus={moviesStatus} />);

        expect(screen.getByText('Movie1')).toBeInTheDocument();
        expect(screen.getByText('Movie2')).toBeInTheDocument();
        expect(screen.getByText('Movie3')).toBeInTheDocument();
    });

    it('displays loading message if moviesStatus not defined', async () => {
        render(<MovieList moviesStatus={undefined} />);

        waitFor(() => {
            expect(screen.getByText('Loading...')).toBeInTheDocument();
        });
    });

    it('displays error message if movies is null', async () => {
        const moviesStatus = {
            movies: null,
            error: 'Error message',
        }

        render(<MovieList moviesStatus={moviesStatus} />);

        expect(screen.getByText('Error message')).toBeInTheDocument();
    });
});
