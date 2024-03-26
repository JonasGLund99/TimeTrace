import { LogFormatter } from '../../models/LogFormatter';


describe('LogFormatter', () => {
    describe('formatLog', () => {
        test('Should return file object with mapped and formatted events', () => {
            // Arrange
            // Act
            // Assert
            
        });
    });
    describe('convertLines', () => {
        test('something', () => {
            // Arrange
            // Act
            // Assert
        });
    });
    describe('getMappedValue', () => {
        test('Given an event A and mappings, return the mapped value', () => {
            // Arrange
            const logFormatter = new LogFormatter();
            const event: string = "Edit";

            const mappings: Map<string, string> = new Map<string, string>();
            mappings.set('Login', 'B').set('Logout', 'C').set('Update', '').set('Update', '').set('Login', 'B').set('Logout', 'C').set('Edit', 'A');
            
            const ExpectedMapValue: string = "A";
            // Act
            const mappedValue = logFormatter.getMappedValue(event, mappings);
            // Assert
            expect(mappedValue).toEqual(ExpectedMapValue);
        });
        test('Non mapped events should map to Z', () => {
            // Arrange
            const logFormatter = new LogFormatter();
            const event: string = "Logout";

            const mappings: Map<string, string> = new Map<string, string>();
            mappings.set('Login', 'B').set('Logout', '').set('Update', 'C').set('Update', 'C').set('Login', 'B').set('Logout', '').set('Edit', 'A');
            
            const ExpectedMapValue: string = "Z";
            // Act
            const mappedValue = logFormatter.getMappedValue(event, mappings);
            // Assert
            expect(mappedValue).toEqual(ExpectedMapValue);
        });
    });
    describe('convertDateformat', () => {
        test('Should take a timstamp as string and convert it into EPOK time in string ', () => {
            // Arrange
            const logFormatter = new LogFormatter();
            const timestamp: string = "2024-02-26T08:22:36.677645Z";

            const expectedEPOKTime: string = "1708935756677";
            // Act
            const timestampInMiliseconds = logFormatter.convertDateformat(timestamp);
            // Assert
            expect(timestampInMiliseconds).toEqual(expectedEPOKTime);
        });
        test('Expect not equal, assert a wrong expected EPOK time', () => {
            // Arrange
            const logFormatter = new LogFormatter();
            const timestamp: string = "2024-02-26T08:22:36.677645Z";

            const expectedEPOKTime: string = "1708935756678";
            // Act
            const timestampInMiliseconds = logFormatter.convertDateformat(timestamp);
            // Assert
            expect(timestampInMiliseconds).not.toEqual(expectedEPOKTime);
        });
    });

    // describe('extractSearchIntervals', () => {
    //     test('should return an array of searchIntervals', () => {
    //         // Arrange
    //         const logHandler = new LogHandler();
    //         const monaaOutput = [
    //             "-0.000000      <= t <   0.500000 ",
    //             "0.800000        < t' <=   1.500000 ",
    //             "0.300000        < t' - t <=   1.500000 ",
    //             "=========================== ",
    //             "1.500000       <= t <   2.000000 ",
    //             "3.200000        < t' <=   3.500000 ",
    //             "1.200000        < t' - t <=   2.000000 ",
    //             "==========================="
    //         ];
    //         const expectedSearchIntervals : SearchInterval[] = [
    //             {start: 0.5, end: 0.8},
    //             {start: 2.0, end: 3.2}
    //         ]

    //         // Act
    //         const searchIntervals = logHandler.extractSearchIntervals(monaaOutput);
            
    //         // Assert
    //         expect(searchIntervals).toEqual(expectedSearchIntervals);
    //     });
    // });
});