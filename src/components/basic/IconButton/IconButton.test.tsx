import { render, screen } from "@testing-library/react";
import IconButton from './IconButton';


describe('IconButton', () => {
    it('should render button', () => {
        render(<IconButton icon="delete" />)

        expect(screen.getByRole('button')).toBeInTheDocument();
    });   
    
    it('should render icon accessibility text', () => {
        render(<IconButton icon="delete" />)

        expect(screen.getByTitle("delete button")).toBeInTheDocument();
    });
});