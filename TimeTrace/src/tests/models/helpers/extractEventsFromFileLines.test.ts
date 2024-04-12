import { extractEventsFromFileLines } from "../../../models/helpers/extractEventsFromFileLines";
import * as extractor from "../../../models/helpers/extractTimeStamp";

describe("extractEventsFromFileLines", () => {
    test("with default ISO 8601 timeStampRegex (Z)", () => {
        //Arrange
        const timestamp = "2024-02-26T11:07:29.791645Z";
    
        const mockExtractTimeStamp = jest.spyOn(extractor, 'extractTimeStamp').mockReturnValue(timestamp);
        const fileLines = [
            `${timestamp} login from a cool user`,
            `${timestamp} login from an uncool user`
        ];
        const expected = [
            "login from a cool user",
            "login from an uncool user"
        ];
    
        //Act
        const result = extractEventsFromFileLines(fileLines);
        
        //Assert
        expect(result).toEqual(expected);
        expect(mockExtractTimeStamp).toHaveBeenCalledTimes(2);
    });
    test("with default ISO 8601 timeStampRegex (+)", () => {
        //Arrange
        const timestamp = "2024-04-04T12:30:45.123456+05:30";
    
        const mockExtractTimeStamp = jest.spyOn(extractor, 'extractTimeStamp').mockReturnValue(timestamp);
        const fileLines = [
            `${timestamp} login from a cool user`,
            `${timestamp} login from an uncool user`
        ];
        const expected = [
            "login from a cool user",
            "login from an uncool user"
        ];
    
        //Act
        const result = extractEventsFromFileLines(fileLines);
        
        //Assert
        expect(result).toEqual(expected);
        expect(mockExtractTimeStamp).toHaveBeenCalledTimes(2);
    });
});