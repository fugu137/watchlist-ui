import { render, screen } from '@testing-library/react';
import Heading from './Heading';

describe('Heading', () => {
    it('should display the correct text', () => {
        render(
            <Heading type="h1" text="Test"/>
        );

        expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('should display h1 element if heading type is h1', () => {
        render(
            <Heading type="h1" text="Test"/>
        );

        expect(screen.getByRole('heading',{ level: 1 })).toBeInTheDocument();
    }); 
    
    it('should display h2 element if heading type is h2', () => {
        render(
            <Heading type="h2" text="Test"/>
        );

        expect(screen.getByRole('heading',{ level: 2 })).toBeInTheDocument();
    }); 
    
    it('should display h3 element if heading type is h3', () => {
        render(
            <Heading type="h3" text="Test"/>
        );

        expect(screen.getByRole('heading',{ level: 3 })).toBeInTheDocument();
    });

});