// This function generates a regex pattern that matches all numbers above and including the lower bound.
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


let regex100199 = generateIntervalRegex(1000, 2000);

function testGenerateRegexFromInterval() {
    const regex100199 = generateIntervalRegex(100, 199);
    const reg100199 = new RegExp(regex100199);
    console.log(reg100199.test("101"));
    console.log(reg100199.test("100"));
    
    const regex10002000 = generateIntervalRegex(1000, 2000);
    const reg10002000 = new RegExp(regex10002000);
    console.log(reg10002000.test("1001"));
    console.log(reg10002000.test("1000.12323"));
    console.log(reg10002000.test("1400"));
    console.log(reg10002000.test("1500"));
    console.log(!reg10002000.test("2000"));
    console.log(!reg10002000.test("10.2"));
    console.log(!reg10002000.test("-123.23"));
    console.log(!reg10002000.test("-123"));
    console.log(reg10002000.test("1000"));
}
testGenerateRegexFromInterval();