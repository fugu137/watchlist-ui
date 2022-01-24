import { fireEvent, render, screen } from "@testing-library/react";
import Button from './Button';

const onClickMock = jest.fn();

describe('Button', () => {
    it('should render text', () => {
        render(<Button text="text" variant="primary" />)

        expect(screen.getByRole('button')).toHaveTextContent("text");
    });

    it('should not be disabled by default', () => {
        render(<Button text="text" variant="primary" />)

        expect(screen.getByRole('button')).not.toBeDisabled();
    });

    it('should be disabled if disabled = true', () => {
        render(<Button text="text" variant="primary" disabled />)

        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should trigger onClick function on click', () => {
        render(<Button text="text" variant="primary" onClick={onClickMock} />);

        const button = screen.getByRole('button') as HTMLButtonElement;
        fireEvent.click(button);

        expect(onClickMock).toHaveBeenCalledTimes(1);
    });
});