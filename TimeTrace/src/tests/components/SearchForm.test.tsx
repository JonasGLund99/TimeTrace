import { fireEvent, render, screen } from '@testing-library/react';
import SearchForm from '../../components/SearchForm'

describe('Test SearchForm component', () => {
    test('Renders correctly', () => {
        const onSubmit = jest.fn();
        render(<SearchForm onSubmit={onSubmit} />);

        //Input field with placeholder text rendered? 
        expect(screen.getByPlaceholderText('Enter TRE string')).toBeInTheDocument();
        //Search button rendered?
        expect(screen.getByText('Search')).toBeInTheDocument();

    });
    test('Submit with correct value', () => {
        const onSubmit = jest.fn();
        render(<SearchForm onSubmit={onSubmit} />);

        fireEvent.change(screen.getByPlaceholderText('Enter TRE string'), {
            target: { value: 'AB%(10,20)' },
        });

        fireEvent.click(screen.getByText('Search'));

        expect(onSubmit).toHaveBeenCalledWith('AB%(10,20)');

    })

});





