
/**
 * Generates a regex that maches all numbers from the next factor of the lowerbound
 * e.g., lowerBound = 100 then this will return -> [1-9][0-9][0-9][0-9]+
 * @param {*} lowerBound
 * @returns A regex that matches all numbers from the next factor.
 */
function generateLargerPart(lowerBound: string): string  {
    const numLen: number = lowerBound.toString().length;
    let largerPart: string = "";
    for (let i = 0; i < numLen; i++) {
        if (i === 0) {
            //The beginning of the next factor | is prepended because this is also a pattern we want to match.
            largerPart += "|([1-9]";
        }
        largerPart += "[0-9]";
    }
    largerPart += "+";
    //To match numbers with decimals
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
    // The roundNumbersPattern ensures that when 33 is entered, 40, 50, 60 and so on can be matched.
    let roundNumbersPattern = "|(";
    const overflow: boolean = lowerBoundStr[0] === "9";
    const sum: number = overflow ? parseInt(lowerBoundStr[0]) : parseInt(lowerBoundStr[0]) + 1;
    // If there is overflow then we must go to the next factor, therefore we add two parts.
    // e.g., when lowerBound is '99' then this pattern should be able to match 100, 110 and so on.
    roundNumbersPattern += overflow ? "[1-9][0-9]" : `[${sum}-9]`;

    //Constructs the inclusive over part.
    //This simply repeats the digits in the lowerBound and then allows the range to go up to 9.
    // e.g., if lowerbound is one this would be [1-9] the other patterns will handle the rest.
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
    // Ensures that the pattern will not match any digits that are provided as decimals.
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
    
    //Constructs an inclusive over part.
    //This simply repeats the digits in the lowerBound and then allows the range to go up to 9.
    // e.g., if lowerbound is one this would be [1-9] the other patterns will handle the rest.
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
    // ensures that lowerBound may not be matched, crucial because pattern allows the lowerBound to be matched.
    const dontMatchLowerBound = `(?!(${lowerBoundStr}(\\.0*)?))`;
    let fullPattern = dontMatchLowerBound + dontMatchDigitsAfterDot + pattern + roundNumbersPattern + largerPart;
    return fullPattern;
}

export function generateIntervalRegex(lowerBound: string, upperBound: string): string {
    //negate the regex for the upperbound to get integers lower than the upperBound.
    const negatedOverUpperBound = `(?!(${generateInclusiveOverRegex(upperBound)}))`;
    
    //regex that matches the lower bound and all numbers above.
    const overLowerBound = `${generateInclusiveOverRegex(lowerBound)}`;
    
    //Regex that only matches numbers between and including the lowerBound up till the upperbound.
    const combinedRegex = negatedOverUpperBound + overLowerBound;
    return combinedRegex;
}

