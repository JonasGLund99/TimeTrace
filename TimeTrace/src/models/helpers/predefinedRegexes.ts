
/**
 * Generates a regex that maches all numbers from the next factor i.e. 100 -> [1-9][0-9][0-9][0-9]+
 * @param {*} lowerBound
 * @returns A regex that matches all numbers from the next factor.
 */
function generateLargerPart(lowerBound: string): string  {
    const numLen: number = lowerBound.toString().length;
    let largerPart: string = "";
    for (let i = 0; i < numLen; i++) {
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
 * @param {*} lowerBound: string
 * @returns A regex that matches all numbers above and including the lower bound.
 */
export function generateInclusiveOverRegex(lowerBound: string): string {
    let pattern = "((";
    let currentFactor = 0;
    const lowerBoundStr = lowerBound.toString();
    // This pattern ensures that when 33 is entered, 40, 50, 60 and so on can be matched.
    let roundNumbersPattern = "|(";
    const overflow: boolean = lowerBoundStr[0] === "9";
    const sum: number = overflow ? parseInt(lowerBoundStr[0]) : parseInt(lowerBoundStr[0]) + 1;
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
    const dontMatchDigitsAfterDot = "(?<!\\.)";
    let fullPattern = `${dontMatchDigitsAfterDot}${pattern}${roundNumbersPattern}${largerPart}`;

    return fullPattern;
}

/**
 * @param {*} lowerBound: string
 * @returns A regex that matches all numbers above the lower bound.
 */
export function generateStrictOverRegex(lowerBound: string): string {
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
    const dontMatchDigitsAfterDot = "(?<!\\.)";
    const dontMatchLowerBound = `(?!(${lowerBoundStr}(\\.0*)?))`;
    let fullPattern = dontMatchLowerBound + dontMatchDigitsAfterDot + pattern + roundNumbersPattern + largerPart;
    return fullPattern;
}

export function generateIntervalRegex(lowerBound: string, upperBound: string): string {
    const negatedOverUpperBound = `(?!(${generateInclusiveOverRegex(upperBound)}))`;
    const overLowerBound = `${generateInclusiveOverRegex(lowerBound)}`;
    const combinedRegex = negatedOverUpperBound + overLowerBound;
    return combinedRegex;
}

