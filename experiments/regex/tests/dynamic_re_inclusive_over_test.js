/**
 * Generates a regex that maches all numbers from the next factor i.e. 100 -> [1-9][0-9][0-9][0-9]+
 * @param {*} lowerBound
 * @returns A regex that matches all numbers from the next factor.
 */
function generateLargerPart(lowerBound) {
    let largerPart = "";
    for (let i = 0; i < lowerBound.toString().length; i++) {
        if (i === 0) {
            largerPart += "|([1-9]";
        }
        largerPart += "[0-9]";
    }
    largerPart += "+";
    largerPart += "))(\\.\\d+)?";
    return largerPart;
}


/**
 * @param {*} lowerBound 
 * @returns A regex that matches all numbers above and including the lower bound.
 */
function generateInclusiveOverRegex(lowerBound) {
    const lowerBoundStr = lowerBound.toString();
    const overflow = lowerBoundStr[0] === "9";
    const sum = overflow ? parseInt(lowerBoundStr[0]) : parseInt(lowerBoundStr[0]) + 1;
    let pattern = "((";
    let currentFactor = 0;
    // This pattern ensures that when 33 is entered, 40, 50, 60 and so on can be matched.
    let roundNumbersPattern = "|(";
    // If there is overflow then we must go to the next factor, therefore we add two parts.
    roundNumbersPattern += overflow ? "[1-9][0-9]" : `[${sum}-9]`;

    for (const digit of lowerBoundStr) {
        if (currentFactor === 0) {
            pattern += `[${digit}-9]`;
        } else {
            pattern += `[${digit}-9]`;
            roundNumbersPattern += "[0-9]";
        }
        currentFactor++;
    }
    roundNumbersPattern += ")";
    pattern += ")";

    const largerPart = generateLargerPart(lowerBound);
    const dontMatchDigitsAfterDot = "(?<!\.)";
    const fullPattern = `${dontMatchDigitsAfterDot}${pattern}${roundNumbersPattern}${largerPart}`;
    const regex = new RegExp(fullPattern);

    return regex;
}


// Define your test suite
describe('generateInclusiveOverRegex', () => {
    // Test case for lower bound 100
    test('matches numbers greater than or equal to 100', () => {
        const regex100 = generateInclusiveOverRegex(100);
        expect(regex100.test(".2345")).toBe(false);
        expect(regex100.test("901.12234")).toBe(true);
        expect(regex100.test("900")).toBe(true);
        expect(regex100.test("100")).toBe(true);
        expect(regex100.test("100.00000")).toBe(true);
        expect(regex100.test("101")).toBe(true);
        expect(regex100.test("102")).toBe(true);
        expect(regex100.test("121")).toBe(true);
        expect(regex100.test("123")).toBe(true);
        expect(regex100.test("201")).toBe(true);
        expect(regex100.test("110")).toBe(true);
        expect(regex100.test("120")).toBe(true);
        expect(regex100.test("130")).toBe(true);
        expect(regex100.test("100")).toBe(true);
        expect(regex100.test("140")).toBe(true);
        expect(regex100.test("150")).toBe(true);
        expect(regex100.test("160")).toBe(true);
        expect(regex100.test("170")).toBe(true);
        expect(regex100.test("180")).toBe(true);
        expect(regex100.test("190")).toBe(true);
        expect(regex100.test("199")).toBe(true);
        expect(regex100.test("999")).toBe(true);
        expect(regex100.test("990.12234")).toBe(true);
        expect(regex100.test("99")).toBe(false);
        expect(regex100.test("0")).toBe(false);
        expect(regex100.test("15")).toBe(false);
        expect(regex100.test("1000")).toBe(true);
    });

    // Repeat similar tests for other lower bounds
    test('matches numbers greater than or equal to 198', () => {
        const regex199 = generateInclusiveOverRegex(198);
        expect(regex199.test("100")).toBe(false);
        expect(regex199.test("300")).toBe(true);
        expect(regex199.test("200")).toBe(true);
        expect(regex199.test("301")).toBe(true);
    });

    test('matches numbers greater than or equal to 188', () => {
        const regex188 = generateInclusiveOverRegex(188);
        expect(regex188.test("100")).toBe(false);
        expect(regex188.test("198")).toBe(true);
        expect(regex188.test("199")).toBe(true);
        expect(regex188.test("189")).toBe(true);
        expect(regex188.test("201")).toBe(true);
        expect(regex188.test("201")).toBe(true);
    });

    // Test with lower bound 5000
    test('matches numbers greater than or equal to 5000', () => {
        const regex5000 = generateInclusiveOverRegex(5000);
        expect(regex5000.test("5001")).toBe(true);
        expect(regex5000.test("5999")).toBe(true);
        expect(regex5000.test("9999")).toBe(true);
        expect(regex5000.test("4999")).toBe(false);
        expect(regex5000.test("4")).toBe(false);
        expect(regex5000.test("440")).toBe(false);
        expect(regex5000.test("10000")).toBe(true);
    });

    // Repeat similar tests for other lower bounds
    // You can continue adding test cases for other lower bounds here
});
