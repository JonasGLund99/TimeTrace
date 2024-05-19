
// This function generates a regex pattern that matches all numbers above and including the lower bound.
function generateRegexFromLowerBound(lowerBound) {
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
    const upperBoundStr = `(?!(${generateRegexFromLowerBound(upperBound)}))`;
    const lowerBoundStr = `${generateRegexFromLowerBound(lowerBound)}`;
    const combinedRegex = upperBoundStr + lowerBoundStr;
    return combinedRegex;
}


let regex100199 = generateIntervalRegex(1000, 2000);
console.log(regex100199);