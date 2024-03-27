import { render, fireEvent, getByTestId } from '@testing-library/react';
import FileUploadButton from '../../components/FileUploadButton';

describe('FileUploadButton component', () => {
    describe('fileUpload', () => {
        test('onFileChange has a file when a file is uploaded', () => {
            const onFileChangeMock = jest.fn();
            const { getByLabelText } = render(<FileUploadButton onFileChange={onFileChangeMock} />);
            const fileInput = getByLabelText('Upload file');

            const file = new File(['file content'], 'example.txt', { type: 'text/plain' });
            fireEvent.change(fileInput, { target: { files: [file] } });

            expect(onFileChangeMock).toHaveBeenCalledWith(file);
        });
    });

    describe('fileRemove', () => {
        test('onFileChange set to null when file is removed', () => {
            const onFileChangeMock = jest.fn();
            const { getByLabelText } = render(<FileUploadButton onFileChange={onFileChangeMock} />);
            const fileInput = getByLabelText('Upload file');

            const file = new File(['file content'], 'example.txt', { type: 'text/plain' });
            fireEvent.change(fileInput, { target: { files: [file] } });

            const removeButton = getByTestId(document.body, 'remove-button');
            fireEvent.click(removeButton);

            expect(onFileChangeMock).toHaveBeenCalledWith(null);
        });
    });
});

