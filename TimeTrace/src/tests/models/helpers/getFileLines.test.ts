import { getFileLines } from "../../../models/helpers/getFileLines";

test('getFileLines', async () => {
    //Arrange
    const file = new File(["line1\nline2\nline3"], "test.txt");
    
    //Act
    const result = await getFileLines(file);
    
    //Assert
    expect(result).toEqual(["line1", "line2", "line3"]);
});