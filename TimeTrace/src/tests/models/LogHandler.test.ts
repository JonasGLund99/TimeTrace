import { LogHandler } from "../../models/LogHandler";
import { SearchInterval } from "../../models/SearchInterval";

describe('LogHandler', () => {
    describe('mapMonaaOutputToSearchIntervals', () => {
        test('should return an array of MonaaZones', () => {
            //TODO: Implement test
        });
    });

    describe('extractSearchIntervals', () => {
        test('should return an array of searchIntervals', () => {
            // Arrange
            const logHandler = new LogHandler();
            const monaaOutput = [
                "-0.000000      <= t <   0.500000 ",
                "0.800000        < t' <=   1.500000 ",
                "0.300000        < t' - t <=   1.500000 ",
                "=========================== ",
                "1.500000       <= t <   2.000000 ",
                "3.200000        < t' <=   3.500000 ",
                "1.200000        < t' - t <=   2.000000 ",
                "==========================="
            ];
            const expectedSearchIntervals : SearchInterval[] = [
                {start: 0.5, end: 0.8},
                {start: 2.0, end: 3.2}
            ]

            // Act
            const searchIntervals = logHandler.extractSearchIntervals(monaaOutput);
            
            // Assert
            expect(searchIntervals).toEqual(expectedSearchIntervals);
        });
    });
});