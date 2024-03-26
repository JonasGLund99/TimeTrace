import { extractTimeStamp } from "../../../models/helpers/extractTimeStamp";

test("extractTimeStamp", () => {
    const line = "2024-02-26T11:07:29.791645Z login from a cool user";
    const result = extractTimeStamp(line);
    expect(result).toBe("2024-02-26T11:07:29.791645Z");
});

test("extractTimeStamp - too many decimals", () => {
    const line = "2024-50-26T11:07:29.79112313123123Z login from an uncool user";
    expect(() => extractTimeStamp(line)).toThrowError();
});

test("extractTimeStamp - no timestamp", () => {
    const line = "no timestamp here";
    expect(() => extractTimeStamp(line)).toThrowError();
});
