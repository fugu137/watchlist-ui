import { fireEvent, render, screen } from "@testing-library/react";
import TextField from './TextField';

const changeHandlerMock = jest.fn();

describe('TextField', () => {
    it('should render input element', () => {
        render(<TextField type="text" />);

        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should display a label if one is provided', () => {
        render(<TextField type="text" label="Label:" />);

        expect(screen.getByText('Label:')).toBeInTheDocument();
    });

    it('should display text content if value is provided', () => {
        render(<TextField type="text" value="test value" onChange={() => { }} />);

        expect(screen.getByRole('textbox')).toHaveValue("test value");
    });

    it('should display error message if one is provided', () => {
        render(<TextField type="text" error="error message" />);

        expect(screen.getByText("error message")).toBeInTheDocument();
    });

    it('should call provided change handler on change', () => {
        render(<TextField type="text" onChange={changeHandlerMock} />);

        const input = screen.getByRole('textbox');

        fireEvent.change(input, { target: { value: 'h' } });
        expect(changeHandlerMock).toHaveBeenCalledTimes(1);
    });
});