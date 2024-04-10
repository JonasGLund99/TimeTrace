import { DateFormat } from "../../../models/helpers/dateFormats";
import { extractTimeStamp } from "../../../models/helpers/extractTimeStamp";
import { LogFormatter } from "../../../models/LogFormatter";

describe('ExtractTimeStamp', () => {
    describe('ISO 8601 formatted timestamps', () => {
        test("extracts timestamp from a line", () => {
            // Arrange
            LogFormatter.dateFormat = DateFormat.ISO_8601;
            const timestamp = "2024-02-26T11:07:29.791645Z";
            const line = `${timestamp} login from a cool user`;
            // Act
            const result = extractTimeStamp(line);

            // Assert
            expect(result).toBe(timestamp);
        });

        test("throws error when ISO 8601 timestamp has too many decimals", () => {
            // Arrange
            LogFormatter.dateFormat = DateFormat.ISO_8601;
            const line = "2024-50-26T11:07:29.79112313123123Z login from an uncool user";

            // Act + Assert
            expect(() => extractTimeStamp(line)).toThrowError();
        });
        test("throws error when a line of a log file has no timestamp", () => {
            // Arrange
            LogFormatter.dateFormat = DateFormat.ISO_8601;
            const line = "no timestamp here";

            // Act + Assert
            expect(() => extractTimeStamp(line)).toThrowError();
        });
    })

    describe('YYMMDD HH.MM.SS formatted timestamps', () => {
        test("extracts timestamp from a line", () => {
            LogFormatter.dateFormat = DateFormat.YYMMDD_HH_MM_SS;
            // Arrange
            const timestamp = "240108 14.13.52";
            const line = `${timestamp} Added alarmcriteria - node 'STAT6', areas '{[SMS_TEST]}', priority 'LOLO;LOW;MEDIUM;HIGH;HIHI'`;

            // Act
            const result = extractTimeStamp(line);

            // Assert
            expect(result).toBe(timestamp);
        });
        test("throws error when a line of a log file has no timestamp", () => {
            // Arrange
            const line = "no timestamp here";

            // Act + Assert
            expect(() => extractTimeStamp(line)).toThrowError();
        });
    })

    describe('DD/MM/YYYY HH:MM:SS formatted timestamps', () => {
        test("extracts timestamp from a line", () => {
            LogFormatter.dateFormat = DateFormat.DD_MM_YYYY_HH_MM_SS;
            // Arrange
            const timestamp = "08/01/2024 14:48:50";
            const line = `${timestamp} CommManagerTcp Initializing: '192.168.23.8:4001'`;

            // Act
            const result = extractTimeStamp(line);

            // Assert
            expect(result).toBe(timestamp);
        });
        test("throws error when a line of a log file has no timestamp", () => {
            // Arrange
            const line = "no timestamp here";

            // Act + Assert
            expect(() => extractTimeStamp(line)).toThrowError();
        });
    })

    describe('YYYY-MM-DD HH:MM:SS.MMM formatted timestamps', () => {
        test("extracts timestamp from a line", () => {
            LogFormatter.dateFormat = DateFormat.YYYY_MM_DD_HH_MM_SS_MMM;
            // Arrange
            const timestamp = "2024-08-01 12:48:45.002";
            const line = `${timestamp} CommManagerTcp Initializing: '192.168.23.8:4001'`;

            // Act
            const result = extractTimeStamp(line);

            // Assert
            expect(result).toBe(timestamp);
        });
        test("throws error when a line of a log file has no timestamp", () => {
            // Arrange
            const line = "no timestamp here";

            // Act + Assert
            expect(() => extractTimeStamp(line)).toThrowError();
        });
    })
})