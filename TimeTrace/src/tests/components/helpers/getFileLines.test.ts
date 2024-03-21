import { getFileLines } from "../../../models/helpers/getFileLines";

test('getFileLines', async () => {
    const file = new File(["line1\nline2\nline3"], "test.txt");
    const result = await getFileLines(file);
    expect(result).toEqual(["line1", "line2", "line3"]);
});