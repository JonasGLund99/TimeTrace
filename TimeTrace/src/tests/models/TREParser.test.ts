import { TREBuilder } from "../../models/TREBuilder";
import { CustomMap } from "../../models/Types/EventMapping";
import { TREParser } from '../../models/TREParser';

describe('TREParser', () => {
    
    describe('parseTRE', () => {
         test('', ()=>{
        // Arrange
        const trimmedTRE = "";
        const mappings: CustomMap = new CustomMap();
        //mappings.set({key: 'login', isRegex: false}, 'A')
        
        // Act
        //    const convertedTRE = TREBuilder.convertTimeConstraint(trimmedTRE)
        // Assert
        //     expect(trimmedTRE).toEqual(convertedTRE);

        });
        describe('validateGroups', () => {
            test('', ()=>{
            // Arrange
            const tre = "";

           // Act
           //     const convertedTRE = TREBuilder.convertTimeConstraint(trimmedTRE)
           // Assert
           //     expect(trimmedTRE).toEqual(convertedTRE);
   
           });
        });
           describe('validateTimeConstraints', () => {
            test('', ()=>{
           // Arrange
                const tre = "";

           // Act
           //     const convertedTRE = TREBuilder.convertTimeConstraint(trimmedTRE)
           // Assert
           //     expect(trimmedTRE).toEqual(convertedTRE);
   
           });
        });
           describe('validateSymbols', () => {
            test('', ()=>{
           // Arrange
           const tre = "";

           // Act
           //     const convertedTRE = TREBuilder.convertTimeConstraint(trimmedTRE)
           // Assert
           //     expect(trimmedTRE).toEqual(convertedTRE);
   
           });
        });
        describe('validateNumbers', () => {
            test('', ()=>{
           // Arrange
           const tre = "";

           // Act
           //     const convertedTRE = TREBuilder.convertTimeConstraint(trimmedTRE)
           // Assert
           //     expect(trimmedTRE).toEqual(convertedTRE);
   
           });
        });
        describe('validateSpecialChars', () => {
            test('Should trow error as no symbol before | in TRE', ()=>{
                // Arrange
                const trimmedTRE = "((A|C)*(|Z)*)%(10ms,100s)";
                const invalidSpecialCharacter = "|"
                // Act and Assert
                expect(() => TREParser.validateSpecialChars(trimmedTRE)).toThrowError(
                    `Expression ${invalidSpecialCharacter} must be preceded by a mapped symbol.`
                );
           });
           test('Should trow error as * is not allowed after z', ()=>{
                // Arrange
                const trimmedTRE = "((A|C)z*(A|Z)*)%(10ms,100s)";
                const invalidSpecialCharacter = "z*"
                // Act and Assert
                expect(() => TREParser.validateSpecialChars(trimmedTRE)).toThrowError(
                    `Expression ${invalidSpecialCharacter} is not allowed. "*" cannot be used after z as this is inferred as (a|b|c|....|Z)*.`
                );
            });

           test('Should trow error as no symbol after | in TRE', ()=>{
                // Arrange
                const trimmedTRE = "((A|C)*(A|)*)%(10ms,100s)";
                const invalidSpecialCharacter = "|"
                // Act and Assert
                expect(() => TREParser.validateSpecialChars(trimmedTRE)).toThrowError(
                    `Expression ${invalidSpecialCharacter} must be followed by a mapped symbol.`
                );
            });

            test('Should trow error as no symbol after & in TRE', ()=>{
                // Arrange
                const trimmedTRE = "((A|C)*(A&)*)%(10ms,100s)";
                const invalidSpecialCharacter = "&"
                // Act and Assert
                expect(() => TREParser.validateSpecialChars(trimmedTRE)).toThrowError(
                    `Expression ${invalidSpecialCharacter} must be followed by a mapped symbol.`
                );
            });

            test('Should trow error as no symbol after & in && where it should be preceded on the seconde & in TRE', ()=>{
                // Arrange
                const trimmedTRE = "((A|C)*(A&&)*)%(10ms,100s)";
                const invalidSpecialCharacter = "&"
                // Act and Assert
                expect(() => TREParser.validateSpecialChars(trimmedTRE)).toThrowError(
                    `Expression ${invalidSpecialCharacter} must be preceded by a mapped symbol.`
                );
            });

            test('Should not throw error as (AC)* & (AB)* are allowed ', ()=>{
                // Arrange
                const trimmedTRE = "(A|B)*&(C|B)*%(10ms,100s)";
                // Act and Assert
                expect(() => TREParser.validateSpecialChars(trimmedTRE)).not.toThrowError();
            });

            test('Should throw error as because ++ are not allowed', ()=>{
                // Arrange
                const trimmedTRE = "(A|B++)%(10ms,100s)";
                const invalidSpecialCharacter = "++"
                // Act and Assert
                expect(() => TREParser.validateSpecialChars(trimmedTRE)).toThrowError(
                    `Expression ${invalidSpecialCharacter} There can not be two quantifiers (*/+) consecutivly.`
                );
            });

            test('Should throw error as ** are not allowed', ()=>{
                // Arrange
                const trimmedTRE = "(A|B**)%(10ms,100s)";
                const invalidSpecialCharacter = "**"
                // Act and Assert
                expect(() => TREParser.validateSpecialChars(trimmedTRE)).toThrowError(
                    `Expression ${invalidSpecialCharacter} There can not be two quantifiers (*/+) consecutivly.`
                );
            });

            test('Should throw error as *+ are not allowed  ', ()=>{
                // Arrange
                const trimmedTRE = "(A|B**)%(10ms,100s)";
                const invalidSpecialCharacter = "**"
                // Act and Assert
                expect(() => TREParser.validateSpecialChars(trimmedTRE)).toThrowError(
                    `Expression ${invalidSpecialCharacter} There can not be two quantifiers (*/+) consecutivly.`
                );
            });
            
            test('Should not throw error as +)+ are allowed allowed', ()=>{
                // Arrange
                const trimmedTRE = "(A|B+)+%(10ms,100s)";
                // Act and Assert
                expect(() => TREParser.validateSpecialChars(trimmedTRE)).not.toThrowError();
            });

            test('should not throw error as *)* are allowed', ()=>{
                // Arrange
                const trimmedTRE = "(A|B*)*%(10ms,100s)";
                // Act and Assert
                expect(() => TREParser.validateSpecialChars(trimmedTRE)).not.toThrowError();
            });

        });

        describe('validateSymbolMappings', () => {
            test('Should trow error as symbol C in not mapped to event', ()=>{
                // Arrange
                const trimmedTRE = "((A|C)*(A|B)*)%(10ms,100s)";
                const mappings: CustomMap = new CustomMap();
                const invalidSymbol = 'C';
                mappings.set({key: 'login', isRegex: false}, 'A')
                mappings.set({key: 'delete', isRegex: false}, '')
                mappings.set({key: 'logout', isRegex: false}, 'B');
                // Act and Assert
                expect(() => TREParser.validateSymbolMappings(trimmedTRE,mappings)).toThrowError(
                    `Symbol '${invalidSymbol}' does not have an event mapped to it.`
                );
           });

           test('Should not trow error as z event are ignored', ()=>{
                // Arrange
                const trimmedTRE = "((A|z)*(A|C)*)%(10ms,100s)";
                const mappings: CustomMap = new CustomMap();
                mappings.set({key: 'login', isRegex: false}, 'C')
                mappings.set({key: 'delete', isRegex: false}, 'A')
                mappings.set({key: 'logout', isRegex: false}, '');
                // Act and Assert
                expect(() => TREParser.validateSymbolMappings(trimmedTRE,mappings)).not.toThrowError();
            });
        });

        describe('convertTimeToms', () => {
           test('test second unit', ()=>{
                // Arrange
                const timeContraint = 10;
                const timeUnit ="s";
                const expectedTimeMS = 10000
                // Act
                const actualTimeMS = TREParser.convertTimeToms(timeContraint, timeUnit);
                // Assert
                 expect(expectedTimeMS).toEqual(actualTimeMS);
            });

            test('test minut unit', ()=>{
                // Arrange
                const timeContraint = 10;
                const timeUnit ="m";
                const expectedTimeMS = 600000
                // Act
                const actualTimeMS = TREParser.convertTimeToms(timeContraint, timeUnit);
                // Assert
                expect(expectedTimeMS).toEqual(actualTimeMS);
            });

            test('test hour unit', ()=>{
                // Arrange
                const timeContraint = 10;
                const timeUnit ="h";
                const expectedTimeMS = 36000000
                // Act
                const actualTimeMS = TREParser.convertTimeToms(timeContraint, timeUnit);
                // Assert
                expect(expectedTimeMS).toEqual(actualTimeMS);
            });

            test('test day unit ', ()=>{
                // Arrange
                const timeContraint = 1000;
                const timeUnit ="d";
                const expectedTimeMS = 86400000000
                // Act
                const actualTimeMS = TREParser.convertTimeToms(timeContraint, timeUnit);
                // Assert
                expect(expectedTimeMS).toEqual(actualTimeMS);
            });

            test('test with no unit found', ()=>{
                // Arrange
                const timeContraint = 10;
                const timeUnit ="";
                const expectedTimeMS = 10
                // Act
                const actualTimeMS = TREParser.convertTimeToms(timeContraint, timeUnit);
                // Assert
                expect(expectedTimeMS).toEqual(actualTimeMS);
             });
        });
})
});