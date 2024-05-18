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

    let fullPattern = `(?<!\\.)${pattern}${roundNumbersPattern}${largerPart}`;

    return fullPattern;
}

function generateIntervalRegex(lowerBound, upperBound) {
    const upperBoundStr = `(?!(${generateRegexFromLowerBound(upperBound)}))`;
    const lowerBoundStr = `${generateRegexFromLowerBound(lowerBound)}`;
    const combinedRegex = upperBoundStr + lowerBoundStr;
    return combinedRegex;
}

// Test cases

//Inclusive over for the lower bound up to the upper bound. [lower_bound - upper_bound)
function findMatchesInInterval(lowerBound, upperBound, logfile) {
    const upperBoundStr = `(?!(${generateRegexFromLowerBound(upperBound)}))`;
    const underRegex = new RegExp(upperBoundStr);
    const matches = [];

    for (const line of logfile) {
        const match = underRegex.exec(line);
        if (match) {
            matches.push(line);
        }
    }

    const lowerBoundStr = `${generateRegexFromLowerBound(lowerBound)}`;
    const aboveRegex = new RegExp(lowerBoundStr);

    const finalMatches = [];
    for (let i = 0; i < matches.length; i++) {
        const match = aboveRegex.exec(matches[i]);
        if (match) {
            finalMatches.push(matches[i]);
        }
    }

    const combinedRegex = upperBoundStr + lowerBoundStr;
    const combinedRe = new RegExp(combinedRegex);
    const combinedMatches = [];
    for (const line of logfile) {
        const match = combinedRe.exec(line);
        if (match) {
            combinedMatches.push(line);
        }
    }
    return finalMatches;
}

function testGenerateRegexFromInterval() {
    const logfile = ["101", "101.1232", "100.123", "99.23", "100", "200", "300", "301", "299", "199", "999", "99", "0", "15", "1000", "-1", "-100", "-1000", "-10000", "10000", "75.5234", "10.52"];
    const regex100199 = findMatchesInInterval(100, 199, logfile);
    console.log(regex100199.includes("101"));
    console.log(regex100199.includes("100"));

    const logfile2 = ["1001", "1400", "1500", "1000", "1000.12323", "999.23", "10.2", "-123.23", "-123", "2000"];
    const regex10002000 = findMatchesInInterval(1000, 2000, logfile2);
    console.log(regex10002000.includes("1001"));
    console.log(regex10002000.includes("1000.12323"));
    console.log(regex10002000.includes("1400"));
    console.log(regex10002000.includes("1500"));
    console.log(!regex10002000.includes("2000"));
    console.log(!regex10002000.includes("10.2"));
    console.log(!regex10002000.includes("-123.23"));
    console.log(!regex10002000.includes("-123"));
    console.log(regex10002000.includes("1000"));
    
    console.log("All tests passed successfully.");
}

// Run the tests
testGenerateRegexFromInterval();
let regex100199 = generateIntervalRegex(100, 199);
console.log(regex100199);
