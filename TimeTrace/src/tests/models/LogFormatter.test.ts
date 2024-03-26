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
        test('Take lines from log file and mapping and return mapped rows', () => {
            // Arrange
            const logFormatter = new LogFormatter();
            const lines: string[] = [
                "2024-02-26T08:22:34.000645Z login", 
                "2024-02-26T08:22:34.504645Z login", 
                "2024-02-26T08:22:36.034645Z login",
                "2024-02-26T08:22:36.612645Z login",
                "2024-02-26T08:22:36.677645Z logout", 
                "2024-02-26T08:22:36.898645Z login",
                "2024-02-26T08:22:36.943645Z logout",
                "2024-02-26T08:22:37.801645Z login",
                "2024-02-26T08:22:38.584645Z edited",
                "2024-02-26T08:22:39.473645Z updated",
            ] 
            const mappings: Map<string, string> = new Map<string, string>();
            mappings.set('login', 'B').set('logout', 'C').set('updated', '').set('updated', '').set('login', 'B').set('logout', 'C').set('edited', 'A');

            const expectedMappedRows: string[] = [
                "B 1708935754000", 
                "B 1708935754504", 
                "B 1708935756034",
                "B 1708935756612",
                "C 1708935756677", 
                "B 1708935756898",
                "C 1708935756943",
                "B 1708935757801",
                "A 1708935758584",
                "Z 1708935759473",
            ] 
            
            // Act
            const actualMappeRows = logFormatter.convertLines(lines, mappings);
            // Assert

            expect(actualMappeRows).toEqual(expectedMappedRows);
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
});