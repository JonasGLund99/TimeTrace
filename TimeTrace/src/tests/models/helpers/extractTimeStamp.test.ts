import { extractTimeStamp } from "../../../models/helpers/extractTimeStamp";

describe('ExtractTimeStamp', () => { 
    test("extracts timestamp from a line", () => {
        //Arrange
        const line = "2024-02-26T11:07:29.791645Z login from a cool user";
        
        //Act
        const result = extractTimeStamp(line);

        //Assert
        expect(result).toBe("2024-02-26T11:07:29.791645Z");
    });
    
    test("throws error when timestamp has too many decimals", () => {
        //Arrange
        const line = "2024-50-26T11:07:29.79112313123123Z login from an uncool user";

        //Act + Assert
        expect(() => extractTimeStamp(line)).toThrowError();
    });
    
    test("throws error when a line of a log file has no timestamp", () => {
        //Arrange
        const line = "no timestamp here";
        
        //Act + Assert
        expect(() => extractTimeStamp(line)).toThrowError();
    });
 })
