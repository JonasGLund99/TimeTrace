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
 * @returns A regex that matches all numbers above the lower bound.
 */
function generateStrictOverRegex(lowerBound) {
    let pattern = "((";
    let currentFactor = 0;
    const lowerBoundStr = lowerBound.toString();
    
    // This pattern ensures that when 33 is entered, 40, 50, 60 and so on can be matched.
    let roundNumbersPattern = "|(";
    const overflow = lowerBoundStr[0] === "9";
    const sum = overflow ? parseInt(lowerBoundStr[0]) : parseInt(lowerBoundStr[0]) + 1;
    // If the number begins with a 9 then we must go to the next factor, therefore we add two parts.
    roundNumbersPattern += overflow ? "[1-9][0-9]" : `[${sum}-9]`;

    for (const digit of lowerBoundStr) {
        if (currentFactor === 0) {
            pattern += `[${digit}-9]`;
        } 
        else {
            pattern += `[${digit}-9]`;
            roundNumbersPattern += "[0-9]";
        }
        currentFactor++;
    }
    roundNumbersPattern += ")";
    pattern += ")";

    const largerPart = generateLargerPart(lowerBound);
    const dontMatchDigitsAfterDot = "(?<!\.)";
    const dontMatchLowerBound = `(?!(${lowerBoundStr}(\\.0*)?))`;
    let fullPattern = dontMatchLowerBound + dontMatchDigitsAfterDot + pattern + roundNumbersPattern + largerPart;
    regex = new RegExp(fullPattern);
    return regex;
}



test('generateStrictOverRegex with lower bound 100', () => {
    const regex100 = generateStrictOverRegex(100);
    expect(regex100.test("100.")).toBe(false);
    expect(regex100.test("100.000")).toBe(false);
    expect(regex100.test("901.12234")).toBe(true);
    expect(regex100.test("900")).toBe(true);
    expect(regex100.test("100")).toBe(false);
    expect(regex100.test("101")).toBe(true);
    expect(regex100.test("102")).toBe(true);
    expect(regex100.test("121")).toBe(true);
    expect(regex100.test("123")).toBe(true);
    expect(regex100.test("201")).toBe(true);
    expect(regex100.test("110")).toBe(true);
    expect(regex100.test("120")).toBe(true);
    expect(regex100.test("130")).toBe(true);
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

// Repeat similar tests for other bounds
test('generateStrictOverRegex with lower bound 199', () => {
    const regex199 = generateStrictOverRegex(198);
    expect(regex199.test("100")).toBe(false);
    expect(regex199.test("300")).toBe(true);
    expect(regex199.test("200")).toBe(true);
    expect(regex199.test("301")).toBe(true);
});

test('generateStrictOverRegex with lower bound 188', () => {
    const regex188 = generateStrictOverRegex(188);
    expect(regex188.test("100")).toBe(false);
    expect(regex188.test("198")).toBe(true);
    expect(regex188.test("199")).toBe(true);
    expect(regex188.test("189")).toBe(true);
    expect(regex188.test("201")).toBe(true);
    expect(regex188.test("201")).toBe(true);
});

test('generateStrictOverRegex with lower bound 5000', () => {
    const regex5000 = generateStrictOverRegex(5000);
    expect(regex5000.test("5001")).toBe(true);
    expect(regex5000.test("5999")).toBe(true);
    expect(regex5000.test("9999")).toBe(true);
    expect(regex5000.test("5000")).toBe(false);
    expect(regex5000.test("4999")).toBe(false);
    expect(regex5000.test("4")).toBe(false);
    expect(regex5000.test("440")).toBe(false);
    expect(regex5000.test("10000")).toBe(true);
});

test('generateStrictOverRegex with lower bound 1', () => {
    const regex1 = generateStrictOverRegex(1);
    expect(regex1.test("2")).toBe(true);
    expect(regex1.test("9")).toBe(true);
    expect(regex1.test("99")).toBe(true);
    expect(regex1.test("0")).toBe(false);
    expect(regex1.test("1")).toBe(false);
    expect(regex1.test("100")).toBe(true);
});

test('generateStrictOverRegex with lower bound 9', () => {
    const regex9 = generateStrictOverRegex(9);
    expect(regex9.test("9")).toBe(false);
    expect(regex9.test("10")).toBe(true);
    expect(regex9.test("11")).toBe(true);
    expect(regex9.test("12")).toBe(true);
    expect(regex9.test("13")).toBe(true);
});

test('generateStrictOverRegex with lower bound 0', () => {
    const regex0 = generateStrictOverRegex(0);
    expect(regex0.test("1")).toBe(true);
    expect(regex0.test("0")).toBe(false);
    expect(regex0.test("0.232323")).toBe(true);
    expect(regex0.test("9")).toBe(true);
    expect(regex0.test("99")).toBe(true);
    expect(regex0.test("-1")).toBe(false);
    expect(regex0.test("-1.232")).toBe(false);
    expect(regex0.test("100")).toBe(true);
});

test('generateStrictOverRegex with lower bound 999', () => {
    const regex999 = generateStrictOverRegex(999);
    expect(regex999.test("1000")).toBe(true);
    expect(regex999.test("1099")).toBe(true);
    expect(regex999.test("1999")).toBe(true);
    expect(regex999.test("998")).toBe(false);
    expect(regex999.test("1")).toBe(false);
    expect(regex999.test("88")).toBe(false);
    expect(regex999.test("999")).toBe(false);
    expect(regex999.test("9999")).toBe(true);
});

test('generateStrictOverRegex with lower bound 100000', () => {
    const regex100000 = generateStrictOverRegex(100000);
    expect(regex100000.test("100001")).toBe(true);
    expect(regex100000.test("100999")).toBe(true);
    expect(regex100000.test("199999")).toBe(true);
    expect(regex100000.test("99999")).toBe(false);
    expect(regex100000.test("100000")).toBe(false);
    expect(regex100000.test("1000000")).toBe(true);
});
