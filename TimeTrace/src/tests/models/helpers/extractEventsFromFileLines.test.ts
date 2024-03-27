import { extractEventsFromFileLines } from "../../../models/helpers/extractEventsFromFileLines";
import * as extractor from "../../../models/helpers/extractTimeStamp";

test("extractEventsFromFileLines", () => {
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