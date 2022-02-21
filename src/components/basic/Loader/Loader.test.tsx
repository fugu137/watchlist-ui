import { screen, render } from '@testing-library/react';
import Loader from './Loader';


describe('Loader', () => {
    it('should display loader', () => {
        render(
            <Loader/>
        );

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
});