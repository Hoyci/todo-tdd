import { fireEvent, render, screen } from "@testing-library/react";
import Input from ".";

describe('Input', () => {
    const mockFn = vitest.fn()

    it('should render a form when data is not provided', () => {
        render(<Input onClick={mockFn}/>)

        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.queryByRole('heading')).toBeNull();
    })

    it('should update title when input changes', () => {
        render(<Input onClick={mockFn}/>)       

        const input = screen.getByRole('textbox') as HTMLInputElement;

        fireEvent.change(input, { target: { value: 'New Title' } });
    
        expect(input.value).toBe('New Title');
    })

    it('should create a card when the "Create" button is clicked', () => {
        render(<Input onClick={mockFn} />);
    
        const input = screen.getByRole('textbox') as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'New Card Title' } });
    
        const button = screen.getByRole('button', { name: 'Create' });
        fireEvent.click(button);
    
        expect(mockFn).toHaveBeenCalledWith({ title: 'New Card Title' });
    });
})