import { LogHandler } from "../../models/LogHandler";
import { SearchInterval } from "../../models/SearchInterval";
import { MonaaZone } from "../../models/MonaaZone";
import { DateFormat } from "../../models/helpers/dateFormats";
import { LogFormatter } from "../../models/LogFormatter";
import { LogSearcher } from "../../models/LogSearcher";
import { extractTimeStamp } from "../../models/helpers/extractTimeStamp";

describe('LogHandler', () => {
    LogFormatter.dateFormat = DateFormat.ISO_8601;

    describe('mapMonaaOutputToSearchIntervals', () => {
        test('should return an array of MonaaZones', () => {
            // Arrange
            const logFile = [
                "2024-02-26T08:22:34.000645Z login", 
                "2024-02-26T08:22:34.504645Z login", 
                "2024-02-26T08:22:35.082645Z delete",
                "2024-02-26T08:22:36.034645Z login",
                "2024-02-26T08:22:36.612645Z login",
                "2024-02-26T08:22:36.677645Z logout"
            ];
            LogSearcher.updateTimestampInfo(logFile)
            LogSearcher.hashMap.clear() //clear current entries
            for (let i = 0; i < logFile.length; i++) {
                let timestamp: string = LogFormatter.convertDateToMs(extractTimeStamp(logFile[i]));
                LogSearcher.hashMap.set(timestamp, i)
            }
            // Converted to Monaa format:
            // A 1708935754000
            // A 1708935754504
            // Z 1708935755082
            // A 1708935756034
            // A 1708935756612
            // B 1708935756677

            //TRE: '(A(Z|A)*B)%(2400,2700)$'
            const monaaOutput = [
                "1708935753977.000000        < t < 1708935754000.000000",
                "1708935756677.000000        < t' <=        inf",
                "2677.000000        < t' - t <        inf",
                "=============================",
                "1708935754000.000000       <= t < 1708935754277.000000",
                "1708935756677.000000        < t' <=        inf",
                "2400.000000        < t' - t <=        inf",
                "============================="
            ];
            const expectedZones: MonaaZone[] = [
                {lineMatches: [0, 1, 2, 3, 4, 5]},
                {lineMatches: [1, 2, 3, 4, 5]}
            ]

            // Act
            const result = LogHandler.mapMonaaOutputToEvent(monaaOutput);
            console.log("test result")
            console.log(result)
            // Assert
            expect(result).toEqual(expectedZones);
        });
    });

    describe('extractSearchIntervals', () => {
        test('should return an array of searchIntervals', () => {
            // Arrange
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
            const searchIntervals = LogHandler.extractSearchIntervals(monaaOutput);
            
            // Assert
            expect(searchIntervals).toEqual(expectedSearchIntervals);
        });
    });
});