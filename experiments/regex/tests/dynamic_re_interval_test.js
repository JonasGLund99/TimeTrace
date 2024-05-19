function generateInclusiveOverRegex(lowerBound) {
    let pattern = "((";
    let currentFactor = 0;
    const numLen = lowerBound.toString().length;
    const lowerBoundStr = lowerBound.toString();
    let roundNumbersPattern = "|(";
    const overflow = lowerBoundStr[0] === "9";
    const sum = overflow ? parseInt(lowerBoundStr[0]) : parseInt(lowerBoundStr[0]) + 1;
    roundNumbersPattern += overflow ? "[1-9][0-9]" : `[${sum}-9]`;

    for (const digitChar of lowerBoundStr) {
        const digit = parseInt(digitChar);
        const digitDiff = 9 - digit;
        const upperRangeInFactor = digit + digitDiff;
        if (currentFactor === 0) {
            pattern += `[${digit}-${upperRangeInFactor}]`;
        } else {
            pattern += `[${digit}-9]`;
            roundNumbersPattern += "[0-9]";
        }
        currentFactor++;
    }
    roundNumbersPattern += ")";
    pattern += ")";

    let largerPart = "";
    for (let i = 0; i < numLen; i++) {
        if (i === 0) {
            largerPart += "|([1-9]";
        }
        largerPart += "[0-9]";
    }
    largerPart += "+";
    largerPart += "))(\\.\\d+)?";

    const dontMatchDigitsAfterDot = "(?<!\\.)";
    let fullPattern = `${dontMatchDigitsAfterDot}${pattern}${roundNumbersPattern}${largerPart}`;

    return fullPattern;
}

function generateIntervalRegex(lowerBound, upperBound) {
    const negatedOverUpperBound = `(?!(${generateInclusiveOverRegex(upperBound)}))`;
    const overLowerBound = `${generateInclusiveOverRegex(lowerBound)}`;
    const combinedRegex = negatedOverUpperBound + overLowerBound;
    return combinedRegex;
}


// Define your test suite
describe('generateIntervalRegex', () => {
    // Test case for interval 100 to 199
    test('matches numbers in the range 100 to 199', () => {
        const regex100199 = generateIntervalRegex(100, 199);
        const reg100199 = new RegExp(regex100199);
        expect(reg100199.test("101")).toBe(true);
        expect(reg100199.test("100")).toBe(true);
    });

    // Test case for interval 1000 to 2000
    test('matches numbers in the range 1000 to 2000', () => {
        const regex10002000 = generateIntervalRegex(1000, 2000);
        const reg10002000 = new RegExp(regex10002000);
        expect(reg10002000.test("1001")).toBe(true);
        expect(reg10002000.test("1000.12323")).toBe(true);
        expect(reg10002000.test("1400")).toBe(true);
        expect(reg10002000.test("1500")).toBe(true);
        expect(reg10002000.test("2000")).toBe(false);
        expect(reg10002000.test("10.2")).toBe(false);
        expect(reg10002000.test("-123.23")).toBe(false);
        expect(reg10002000.test("-123")).toBe(false);
        expect(reg10002000.test("1000")).toBe(true);
    });
});
