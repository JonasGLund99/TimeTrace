import { fireEvent, render, screen } from '@testing-library/react';
import SearchForm from '../../components/SearchForm'

describe('SearchForm component', () => {
    test('Renders correctly', () => {
        // render(<SearchForm />);

        // //Input field with placeholder text rendered? 
        // expect(screen.getByPlaceholderText('Enter TRE string')).toBeInTheDocument();
        // //Search button rendered?
        // expect(screen.getByText('Search')).toBeInTheDocument();

    });
    // test('Submit with correct value', () => {
    //     render(<SearchForm/>);

    //     fireEvent.change(screen.getByPlaceholderText('Enter TRE string'), {
    //         target: { value: 'AB%(10,20)' },
    //     });

    //     fireEvent.click(screen.getByText('Search'));

    //     expect().toHaveBeenCalledWith('AB%(10,20)');
    // })
});