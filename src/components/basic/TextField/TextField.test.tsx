import { render, screen } from "@testing-library/react";
import TextField from './TextField';

describe('TextField', () => {
    it('should render input element', () => {
        render(<TextField type="text" />);

        expect(screen.getByRole('textbox')).toBeInTheDocument();
    }); 
    
    it('should display a label if one is provided', () => {
        render(<TextField type="text" label="Label:" />);

        expect(screen.getByText('Label:')).toBeInTheDocument();
    });
});