import { TREBuilder } from "../../models/TREBuilder";
import { CustomMap } from "../../models/Types/EventMapping";
import { TREParser } from '../../models/TREParser';

describe('TREParser', () => {
    
    describe('parseTRE', () => {
        test('Should parse the without error', ()=>{
        // Arrange
        const trimmedTRE = "((A|C)*Z*)%(69s,420s)";
        const mappings: CustomMap = new CustomMap();
        mappings.set({key: 'login', isRegex: false}, 'A')
        mappings.set({key: 'logout', isRegex: false}, 'C')
        mappings.set({key: 'update', isRegex: false}, '')
        // Act and  Assert
        expect(() => TREParser.parseTRE(trimmedTRE, mappings)).not.toThrowError();
        });
        
        test('Should throw symbol error', ()=>{
            // Arrange
            const trimmedTRE = "((A|C)*D*)%(69s,420s)";
            const mappings: CustomMap = new CustomMap();
            const invalidSymbol = "D"
            mappings.set({key: 'login', isRegex: false}, 'A')
            mappings.set({key: 'logout', isRegex: false}, 'C')
            mappings.set({key: 'update', isRegex: false}, '')
            // Act and  Assert
            // Act and  Assert
            expect(() => TREParser.parseTRE(trimmedTRE, mappings)).toThrowError(
                `Symbol '${invalidSymbol}' does not have an event mapped to it.`
            );
        });

        test('Should throw special charater error', ()=>{
            // Arrange
            const trimmedTRE = "(A**|C)%(69s,420s)";
            const mappings: CustomMap = new CustomMap();
            const invalidQuantifiers = "**"
            mappings.set({key: 'login', isRegex: false}, 'A')
            mappings.set({key: 'logout', isRegex: false}, 'C')
            mappings.set({key: 'update', isRegex: false}, '')
             // Act and  Assert
             expect(() => TREParser.parseTRE(trimmedTRE, mappings)).toThrowError(
                `Expression ${invalidQuantifiers} There can not be two quantifiers (*/+) consecutivly.`
            );
        });

        test('Should trow invalid time constraints error', ()=>{
            // Arrange
            const trimmedTRE = "((A|C)*Z*)%(1d,23.999h)";
            const mappings: CustomMap = new CustomMap();
            mappings.set({key: 'login', isRegex: false}, 'A')
            mappings.set({key: 'logout', isRegex: false}, 'C')
            mappings.set({key: 'update', isRegex: false}, '')
            // Act and  Assert
            expect(() => TREParser.parseTRE(trimmedTRE, mappings)).toThrowError(
                "First number in time constraint must be smaller than the second number e.g. a%(1ms,1s) or a%(1s,2s) etc."
            );
        });
        test('Should trow invalid group error', ()=>{
            // Arrange
            const trimmedTRE = "(()(A|C)*Z*)%(69s,420s)";
            const mappings: CustomMap = new CustomMap();
            mappings.set({key: 'login', isRegex: false}, 'A')
            mappings.set({key: 'logout', isRegex: false}, 'C')
            mappings.set({key: 'update', isRegex: false}, '')
            // Act and  Assert
            expect(() => TREParser.parseTRE(trimmedTRE, mappings)).toThrowError(
                "Empty groups are not allowed. An open parenthesis should contain symbols inside it when closed e.g. (A) or (A|B)"
            );
        });
        test('Should trow number error', ()=>{
            // Arrange
            const trimmedTRE = "(A2|C)%(69s,420s)";
            const mappings: CustomMap = new CustomMap();
            mappings.set({key: 'login', isRegex: false}, 'A')
            mappings.set({key: 'logout', isRegex: false}, 'C')
            mappings.set({key: 'update', isRegex: false}, '')
            // Act and  Assert
            expect(() => TREParser.parseTRE(trimmedTRE, mappings)).toThrowError(
                `Numbers are only allowed inside time constraints.`
            );
        });
    });

    describe('validateGroups', () => {
        test('Should throw error because of empty group', ()=>{
            // Arrange
            const trimmedTREWithInvalidGroup = "((A|C)*()*)%(69s,420s)"
            // Act and  Assert
            expect(() => TREParser.validateGroups(trimmedTREWithInvalidGroup)).toThrowError(
                "Empty groups are not allowed. An open parenthesis should contain symbols inside it when closed e.g. (A) or (A|B)"
            );
        });

        test('Should throw error because of unclosed group', ()=>{
            // Arrange
            const trimmedTREWithInvalidGroup = "(((A|C)*(A|C)*)%(69s,420s)"
            // Act and  Assert
            expect(() => TREParser.validateGroups(trimmedTREWithInvalidGroup)).toThrowError(
                "A parenthesis was opened without it being closed."
            );
        });

        test('Shold throw error because of an addition closing parenthesis', ()=>{
            // Arrange
            const trimmedTREWithInvalidGroup = "((A|C))*(A|C)*)%(69s,420s)"
            // Act and  Assert
            expect(() => TREParser.validateGroups(trimmedTREWithInvalidGroup)).toThrowError(
                "An additional parenthesis is being closed without it having been opened."
            );
        });
    });

    describe('validateTimeConstraints', () => {
        test('Should throw error as first number in timecontraint is larger than the second', ()=>{
            // Arrange
            const trimmedTREWithInvalidTimeConstraint = "((A|C)*(A|Z)*)%(1.5555555s,1.5555554s)"
            // Act and  Assert
            expect(() => TREParser.validateTimeConstraints(trimmedTREWithInvalidTimeConstraint)).toThrowError(
                "First number in time constraint must be smaller than the second number e.g. a%(1ms,1s) or a%(1s,2s) etc."
            );
        });
        test('Should throw error do to unfinished timecontraint', ()=>{
            // Arrange
            const trimmedTREWithInvalidTimeConstraint = "((A|C)%(1,)*(A|Z)*)%(1.54s,1.55s)";
            // Act and  Assert
            expect(() => TREParser.validateTimeConstraints(trimmedTREWithInvalidTimeConstraint)).toThrowError(
                "Something is wrong in your time constraints. Look after an extra parenthesis or an invalid time unit. A valid time constraint could be a%(1ms,1s)"
            );
        });
        test('should throw error do to no timecontraint preceding', ()=>{
            // Arrange
            const trimmedTREWithInvalidTimeConstraint = "%(1s,2s)(A(A|Z)*)%(1.54s,1.55s)";
            // Act and  Assert
            expect(() => TREParser.validateTimeConstraints(trimmedTREWithInvalidTimeConstraint)).toThrowError(
                "Time constraints must be preceded by a mapped symbol."
            );
        });
    });
          
    describe('validateNumbers', () => {
        test('Should throw error, invalid number when outside timeconstraint', ()=>{
           // Arrange
           const trimmedTREWithInvalidNumber = "((A1|C)*(C|Z)*)%(10ms,100s)";
           // Act and  Assert
           expect(() => TREParser.validateNumbers(trimmedTREWithInvalidNumber)).toThrowError(
            `Numbers are only allowed inside time constraints.`
            );
        });
    });

    describe('validateSpecialChars', () => {
        test('Should throw error as no symbol before | in TRE', ()=>{
            // Arrange
            const trimmedTRE = "((A|C)*(|Z)*)%(10ms,100s)";
            const invalidSpecialCharacter = "|"
            // Act and Assert
            expect(() => TREParser.validateSpecialChars(trimmedTRE)).toThrowError(
                `Expression ${invalidSpecialCharacter} must be preceded by a mapped symbol.`
            );
        });
        test('Should throw error as * is not allowed after z', ()=>{
            // Arrange
            const trimmedTRE = "((A|C)z*(A|Z)*)%(10ms,100s)";
            const invalidSpecialCharacter = "z*"
            // Act and Assert
            expect(() => TREParser.validateSpecialChars(trimmedTRE)).toThrowError(
                `Expression ${invalidSpecialCharacter} is not allowed. "*" cannot be used after z as this is inferred as (a|b|c|....|Z)*.`
            );
        });

        test('Should throw error as no symbol after | in TRE', ()=>{
            // Arrange
            const trimmedTRE = "((A|C)*(A|)*)%(10ms,100s)";
            const invalidSpecialCharacter = "|"
            // Act and Assert
            expect(() => TREParser.validateSpecialChars(trimmedTRE)).toThrowError(
                `Expression ${invalidSpecialCharacter} must be followed by a mapped symbol.`
            );
        });

        test('Should throw error as no symbol after & in TRE', ()=>{
            // Arrange
            const trimmedTRE = "((A|C)*(A&)*)%(10ms,100s)";
            const invalidSpecialCharacter = "&"
            // Act and Assert
            expect(() => TREParser.validateSpecialChars(trimmedTRE)).toThrowError(
                `Expression ${invalidSpecialCharacter} must be followed by a mapped symbol.`
            );
        });

        test('Should throw error as no symbol after & in && where it should be preceded on the seconde & in TRE', ()=>{
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
                expect(actualTimeMS).toEqual(expectedTimeMS);
        });

        test('test minut unit', ()=>{
            // Arrange
            const timeContraint = 10;
            const timeUnit ="m";
            const expectedTimeMS = 600000
            // Act
            const actualTimeMS = TREParser.convertTimeToms(timeContraint, timeUnit);
            // Assert
            expect(actualTimeMS).toEqual(expectedTimeMS);
        });

        test('test hour unit', ()=>{
            // Arrange
            const timeContraint = 10;
            const timeUnit ="h";
            const expectedTimeMS = 36000000
            // Act
            const actualTimeMS = TREParser.convertTimeToms(timeContraint, timeUnit);
            // Assert
            expect(actualTimeMS).toEqual(expectedTimeMS);
        });

        test('test day unit ', ()=>{
            // Arrange
            const timeContraint = 1000;
            const timeUnit ="d";
            const expectedTimeMS = 86400000000
            // Act
            const actualTimeMS = TREParser.convertTimeToms(timeContraint, timeUnit);
            // Assert
            expect(actualTimeMS).toEqual(expectedTimeMS);
        });

        test('test with no unit found', ()=>{
            // Arrange
            const timeContraint = 10;
            const timeUnit ="";
            const expectedTimeMS = 10
            // Act
            const actualTimeMS = TREParser.convertTimeToms(timeContraint, timeUnit);
            // Assert
            expect(actualTimeMS).toEqual(expectedTimeMS);
            });
    });
})
