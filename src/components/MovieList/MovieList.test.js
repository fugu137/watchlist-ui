import { render, screen } from '@testing-library/react';
import MovieList from './MovieList';


describe('MovieList', () => {
    const movies = [{ title: 'Movie1' }, { title: 'Movie2' }, { title: 'Movie3' }];

    it('displays movies correctly', async () => {
        render(<MovieList movies={movies} />);

        expect(screen.getByText('Movie1')).toBeInTheDocument();
        expect(screen.getByText('Movie2')).toBeInTheDocument();
        expect(screen.getByText('Movie3')).toBeInTheDocument();
    });
});
