import { TREBuilder } from "../../models/TREBuilder";
import { CustomMap } from "../../models/Types/EventMapping";

describe('TREBuilder', () => {
    
    describe('convertTimeConstraint', () => {
        test('When no timeunit it should be interpretet as ms', ()=>{
            // Arrange
            const trimmedTRE = "(A|B)%(100,1000)";
            // Act
            const convertedTRE = TREBuilder.convertTimeConstraint(trimmedTRE)
            // Assert
            expect(convertedTRE).toEqual(trimmedTRE);

        });

        test('ms to still be ms', ()=>{
              // Arrange
              const trimmedTRE = "(A|B)%(100ms,1000ms)";
              const expectedConvertedTRE = "(A|B)%(100,1000)";
              // Act
              const convertedTRE = TREBuilder.convertTimeConstraint(trimmedTRE)
              // Assert
              expect(convertedTRE).toEqual(expectedConvertedTRE);
        });

        test('Should convert s to ms', ()=>{
                // Arrange
                const trimmedTRE = "(A|B)%(100s,1000s)";
                const expectedConvertedTRE = "(A|B)%(100000,1000000)";
                // Act
                const convertedTRE = TREBuilder.convertTimeConstraint(trimmedTRE)
                // Assert
                expect(convertedTRE).toEqual(expectedConvertedTRE);
            
        });

        test('Should convert m to ms', () => {
                // Arrange
                const trimmedTRE = "(A|B)%(100m,1000m)";
                const expectedConvertedTRE = "(A|B)%(6000000,60000000)";
                // Act
                const convertedTRE = TREBuilder.convertTimeConstraint(trimmedTRE)
                // Assert
                expect(convertedTRE).toEqual(expectedConvertedTRE);
        });

        test('Should convert h to ms', ()=>{
                // Arrange
                const trimmedTRE = "(A|B)%(100h,1000h)";
                const expectedConvertedTRE = "(A|B)%(360000000,3600000000)";
                // Act
                const convertedTRE = TREBuilder.convertTimeConstraint(trimmedTRE)
                // Assert
                expect(convertedTRE).toEqual(expectedConvertedTRE);
            
        });

        test('Should convert d to ms', ()=>{
                // Arrange
                const trimmedTRE = "(A|B)%(1d,10d)";
                const expectedConvertedTRE = "(A|B)%(86400000,864000000)";
                // Act
                const convertedTRE = TREBuilder.convertTimeConstraint(trimmedTRE)
                // Assert
                expect(convertedTRE).toEqual(expectedConvertedTRE);
            
        });

        test('Should convert both s in first to ms and d in second to ms ', ()=>{
                // Arrange
                const trimmedTRE = "(A|B)%(100s,1d)";
                const expectedConvertedTRE = "(A|B)%(100000,86400000)";
                // Act
                const convertedTRE = TREBuilder.convertTimeConstraint(trimmedTRE)
                // Assert
                expect(convertedTRE).toEqual(expectedConvertedTRE);
            
        });

        test('Should handle multiple constraint with different types', ()=>{
            // Arrange
            const trimmedTRE = "AB%(100s,1d)BC%(2h,1d)";
            const expectedConvertedTRE = "AB%(100000,86400000)BC%(7200000,86400000)";
            // Act
            const convertedTRE = TREBuilder.convertTimeConstraint(trimmedTRE)
            // Assert
            expect(convertedTRE).toEqual(expectedConvertedTRE);
    });
    });
    describe('buildTRE', () => {
        test('Correctly build tre from rawtre with unit and whitespace', ()=>{
            // Arrange
            const rawTRE = "(A|   Z)    %(     100 s,      1000 h    )";
            const expectedFinalActualTRE = "((A|Z)%(100000,3600000000))$"
            const mappings: CustomMap = new CustomMap();
            mappings.set({key: 'login', isRegex: false}, 'A')
            mappings.set({key: 'delete', isRegex: false}, '')
            mappings.set({key: 'logout', isRegex: false}, 'B'); 
            // Act
            const finalActualTRE = TREBuilder.buildTRE(rawTRE, mappings);
            // Assert
            expect(finalActualTRE).toEqual(expectedFinalActualTRE);

        });
        test('Should not return but throw Error from parser, (First number in time constraint must be smaller than the second number)', ()=>{
            // Arrange
            const rawTRE = "(A|   Z)    %(     1.1 h,  1 h    )";
            // const expectedFinalActualTRE = "((A|B)%(3960000,3600000))$"
            const mappings: CustomMap = new CustomMap();
            mappings.set({key: 'login', isRegex: false}, 'A')
            mappings.set({key: 'delete', isRegex: false}, '')
            mappings.set({key: 'logout', isRegex: false}, 'B'); 
            // Act
            // Assert
            expect(() => TREBuilder.buildTRE(rawTRE, mappings)).toThrowError(
                "First number in time constraint must be smaller than the second number e.g. a%(1ms,1s) or a%(1s,2s) etc."
            );

        });
    })

    describe('convertz', () => {
        test('Correctly convert z', ()=>{
            // Arrange
            const convertedTRE = "(AB)z(AB)%(100000,3600000000)"
            const expectedConvertedTre = "(AB)(A|B|Z)*(AB)%(100000,3600000000)"
            const mappings: CustomMap = new CustomMap();
            mappings.set({key: 'delete', isRegex: false}, '')
            mappings.set({key: 'login', isRegex: false}, 'A')  
            mappings.set({key: 'logout', isRegex: false}, 'B'); 
            // Act
            const actualConvertedTre = TREBuilder.convertz(convertedTRE, mappings);
            // Assert
            expect(actualConvertedTre).toEqual(expectedConvertedTre);

        });
    })
})