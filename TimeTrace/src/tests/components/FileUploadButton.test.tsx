import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import FileUploadButton from '../../components/FileUpload';

// Mocking useContext hook
// jest.mock('react', () => ({
//     ...jest.requireActual('react'),
//     useContext: jest.fn(),
// }));

describe('FileUploadButton', () => {
    // const mockSetFileLines = jest.fn();
    // const mockSetUploadedFile = jest.fn();
    // const mockSetMappings = jest.fn();
    // const mockSetError = jest.fn();
    // const mockSetEvents = jest.fn();

    // jest.mock('react', () => ({
    //     ...jest.requireActual('react'),
    //     useContext: jest.fn().mockReturnValue({
    //         setFileLines: mockSetFileLines,
    //         setUploadedFile: mockSetUploadedFile,
    //         setMappings: mockSetMappings,
    //         setError: mockSetError,
    //         setEvents: mockSetEvents,
    //     }),
    // }));

    test('should handle file upload', async () => {
        // Mock file
        // const file = new File(['dummy file content'], 'test.txt', {
        //     type: 'text/plain',
        // });

        // render(<FileUploadButton />);
        // const input = screen.getByLabelText('Upload file');

        // fireEvent.change(input, { target: { files: [file] } });

        // // Wait for the file to be uploaded
        // await waitFor(() => {
        //     expect(mockSetUploadedFile).toHaveBeenCalledWith(file);
        // });

        // expect(mockSetFileLines).toHaveBeenCalled();
        // expect(mockSetMappings).toHaveBeenCalled();
        // expect(mockSetEvents).toHaveBeenCalled();
    });

    // test('should handle file remove', () => {
    //     render(<FileUploadButton />);
    //     const removeButton = screen.getByTestId('remove-button');

    //     fireEvent.click(removeButton);

    //     expect(mockSetUploadedFile).toHaveBeenCalledWith(null);
    //     expect(mockSetFileLines).toHaveBeenCalled();
    //     expect(mockSetMappings).toHaveBeenCalled();
    //     expect(mockSetEvents).toHaveBeenCalled();
    // });
});

// describe('FileUploadButton component', () => {
//     describe('fileUpload', () => {
//         test('onFileChange has a file when a file is uploaded', () => {
//             const handleFileChangeMock = jest.fn();
//             render(<FileUploadButton/>);
//             const fileInput = screen.getByLabelText('Upload file');

//             const file = new File(['file content'], 'example.txt', { type: 'text/plain' });
//             fireEvent.change(fileInput, { target: { files: [file] } });

//             expect(handleFileChangeMock).toHaveBeenCalledWith(file);
//         });
//     });

//     describe('fileRemove', () => {
//         test('onFileChange set to null when file is removed', () => {
//             const handleFileChangeMock = jest.fn();
//             render(<FileUploadButton />);
//             const fileInput = screen.getByLabelText('Upload file');

//             const file = new File(['file content'], 'example.txt', { type: 'text/plain' });
//             fireEvent.change(fileInput, { target: { files: [file] } });

//             const removeButton = screen.getByTestId('remove-button');
//             fireEvent.click(removeButton);

//             expect(handleFileChangeMock).toHaveBeenCalledWith(null);
//         });
//     });
// });

