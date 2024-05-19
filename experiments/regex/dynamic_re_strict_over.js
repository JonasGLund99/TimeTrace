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
function generateRegexFromLowerBound(lowerBound) {
    let pattern = "((";
    let currentFactor = 0;
    const lowerBoundStr = lowerBound.toString();
    
    // This pattern ensures that when 33 is entered, 40, 50, 60 and so on can be matched.
    let roundNumbersPattern = "|(";
    const overflow = lowerBoundStr[0] === "9";
    const sum = overflow ? parseInt(lowerBoundStr[0]) : parseInt(lowerBoundStr[0]) + 1;
    // If there is overflow then we must go to the next factor, therefore we add two parts.
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
    const dontMatchLowerBound = `(?!(${lowerBoundStr}(\\.0*)?$))`;
    let fullPattern = dontMatchLowerBound + dontMatchDigitsAfterDot + pattern + roundNumbersPattern + largerPart;
    regex = new RegExp(fullPattern);
    return regex;
}

// Test cases
function testGenerateRegexFromLowerBound() {
    // Test with lower bound 100
    const regex100 = generateRegexFromLowerBound(100);
    console.log(!regex100.test("100."));
    console.log(!regex100.test("100.000"));
    console.log(regex100.test("901.12234"));
    console.log(regex100.test("900"));
    console.log(!regex100.test("100"));
    console.log(regex100.test("101"));
    console.log(regex100.test("102"));
    console.log(regex100.test("121"));
    console.log(regex100.test("123"));
    console.log(regex100.test("201"));
    console.log(regex100.test("110"));
    console.log(regex100.test("120"));
    console.log(regex100.test("130"));
    console.log(regex100.test("140"));
    console.log(regex100.test("150"));
    console.log(regex100.test("160"));
    console.log(regex100.test("170"));
    console.log(regex100.test("180"));
    console.log(regex100.test("190"));
    console.log(regex100.test("199"));
    console.log(regex100.test("999"));
    console.log(regex100.test("990.12234"));
    console.log(!regex100.test("99"));
    console.log(!regex100.test("0"));
    console.log(!regex100.test("15"));
    console.log(regex100.test("1000"));

    const regex199 = generateRegexFromLowerBound(198);
    console.log(!regex199.test("100"));
    console.log(regex199.test("300"));
    console.log(regex199.test("200"));
    console.log(regex199.test("301"));

    const regex188 = generateRegexFromLowerBound(188);
    console.log(!regex188.test("100"));
    console.log(regex188.test("198"));
    console.log(regex188.test("199"));
    console.log(regex188.test("189"));
    console.log(regex188.test("201"));
    console.log(regex188.test("201"));

    // Test with lower bound 5000
    const regex5000 = generateRegexFromLowerBound(5000);
    console.log(regex5000.test("5001"));
    console.log(regex5000.test("5999"));
    console.log(regex5000.test("9999"));
    console.log(!regex5000.test("4999"));
    console.log(!regex5000.test("4"));
    console.log(!regex5000.test("440"));
    console.log(regex5000.test("10000"));

    // Test with lower bound 1
    const regex1 = generateRegexFromLowerBound(1);
    console.log(regex1.test("2"));
    console.log(regex1.test("9"));
    console.log(regex1.test("99"));
    console.log(!regex1.test("0"));
    console.log(regex1.test("100"));
    
    // Test with lower bound 1
    const regex9 = generateRegexFromLowerBound(9);
    console.log(!regex9.test("9"));
    console.log(regex9.test("10"));
    console.log(regex9.test("11"));
    console.log(regex9.test("12"));
    console.log(regex9.test("13"));

    const regex0 = generateRegexFromLowerBound(0);
    console.log(regex0.test("1"));
    console.log(!regex0.test("0"));
    console.log(regex0.test("0.232323"));
    console.log(regex0.test("9"));
    console.log(regex0.test("99"));
    console.log(!regex0.test("-1"));
    console.log(!regex0.test("-1.232"));
    console.log(regex0.test("100"));

    // Test with lower bound 999
    const regex999 = generateRegexFromLowerBound(999);
    console.log(regex999.test("1000"));
    console.log(regex999.test("1099"));
    console.log(regex999.test("1999"));
    console.log(!regex999.test("998"));
    console.log(!regex999.test("1"));
    console.log(!regex999.test("88"));
    console.log(!regex999.test("999"));
    console.log(regex999.test("9999"));

    // Test with lower bound 100000
    const regex100000 = generateRegexFromLowerBound(100000);
    console.log(regex100000.test("100001"));
    console.log(regex100000.test("100999"));
    console.log(regex100000.test("199999"));
    console.log(!regex100000.test("99999"));
    console.log(regex100000.test("1000000"));
}

// Run the tests
testGenerateRegexFromLowerBound();
