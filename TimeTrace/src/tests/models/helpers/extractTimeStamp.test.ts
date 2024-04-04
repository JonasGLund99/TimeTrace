import { extractTimeStamp } from "../../../models/helpers/extractTimeStamp";

// ISO 8601 formatted timestamps with time zone offsets || 2024-04-04T12:30:45.123456+05:30
// /\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{1,6}(Z|[+-]\d{2}:\d{2})\b/g;

// DDMMYY HH.MM.SS || 240108 14.13.52
// /\b\d{6} \d{2}\.\d{2}\.\d{2}\b/g

// DD/MM/YYYY HH:MM:SS ||  08/01/2024 14:48:50
// /\b\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}\b/g

describe('ExtractTimeStamp', () => {
    describe('ISO 8601 formatted timestamps', () => {
        const timeStampRegex = /\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{1,6}(Z|[+-]\d{2}:\d{2})\b/g;

        test("extracts timestamp from a line", () => {
            // Arrange
            const timestamp = "2024-02-26T11:07:29.791645Z";
            const line = `${timestamp} login from a cool user`;
            // Act
            const result = extractTimeStamp(line, timeStampRegex);

            // Assert
            expect(result).toBe(timestamp);
        });
        test("throws error when ISO 8601 timestamp has too many decimals", () => {
            // Arrange
            const line = "2024-50-26T11:07:29.79112313123123Z login from an uncool user";

            // Act + Assert
            expect(() => extractTimeStamp(line, timeStampRegex)).toThrowError();
        });
        test("throws error when a line of a log file has no timestamp", () => {
            // Arrange
            const line = "no timestamp here";

            // Act + Assert
            expect(() => extractTimeStamp(line, timeStampRegex)).toThrowError();
        });
    })

    describe('DDMMYY HH.MM.SS formatted timestamps', () => {
        const timeStampRegex = /\b\d{6} \d{2}\.\d{2}\.\d{2}\b/g;

        test("extracts timestamp from a line", () => {
            // Arrange
            const timestamp = "240108 14.13.52";
            const line = `${timestamp} Added alarmcriteria - node 'STAT6', areas '{[SMS_TEST]}', priority 'LOLO;LOW;MEDIUM;HIGH;HIHI'`;

            // Act
            const result = extractTimeStamp(line, timeStampRegex);

            // Assert
            expect(result).toBe(timestamp);
        });
        test("throws error when a line of a log file has no timestamp", () => {
            // Arrange
            const line = "no timestamp here";

            // Act + Assert
            expect(() => extractTimeStamp(line, timeStampRegex)).toThrowError();
        });
    })

    describe('DD/MM/YYYY HH:MM:SS formatted timestamps', () => {
        const timeStampRegex = /\b\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}\b/g;

        test("extracts timestamp from a line", () => {
            // Arrange
            const timestamp = "08/01/2024 14:48:50";
            const line = `${timestamp} CommManagerTcp Initializing: '192.168.23.8:4001'`;

            // Act
            const result = extractTimeStamp(line, timeStampRegex);

            // Assert
            expect(result).toBe(timestamp);
        });
        test("throws error when a line of a log file has no timestamp", () => {
            // Arrange
            const line = "no timestamp here";

            // Act + Assert
            expect(() => extractTimeStamp(line, timeStampRegex)).toThrowError();
        });
    })
})