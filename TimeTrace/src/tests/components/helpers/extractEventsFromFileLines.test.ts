import { extractEventsFromFileLines } from "../../../models/helpers/extractEventsFromFileLines";
import * as extractor from "../../../models/helpers/extractTimeStamp";

test("extractEventsFromFileLines", () => {
    const timestamp = "2024-02-26T11:07:29.791645Z";
    const mockExtractTimeStamp = jest.spyOn(extractor, 'extractTimeStamp').mockReturnValue(timestamp);
    const fileLines = [
        `${timestamp} login from a cool user`,
        `${timestamp} login from an uncool user`
    ];
    const result = extractEventsFromFileLines(fileLines);
    const expected = [
        "login from a cool user",
        "login from an uncool user"
    ];
    expect(result).toEqual(expect.arrayContaining(expected));
    expect(mockExtractTimeStamp).toHaveBeenCalledTimes(2);
});