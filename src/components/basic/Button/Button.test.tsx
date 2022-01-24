import { render, screen } from "@testing-library/react";
import Button from './Button';

describe('Button', () => {
    it('should render button text', () => {
        render(<Button text="text"/>)

        expect(screen.getByText("text")).toBeInTheDocument();
    });
});