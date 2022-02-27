import { fireEvent, render, screen } from "@testing-library/react";
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

    it('should trigger onClick function on click', () => {
        const onClickMock = jest.fn();

        render(<IconButton icon="home" onClick={onClickMock} />);

        const button = screen.getByRole('button') as HTMLButtonElement;
        fireEvent.click(button);

        expect(onClickMock).toHaveBeenCalledTimes(1);
    });
});