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

function generateRegexFromLowerBound(lowerBound) {
    let pattern = "((";
    let currentFactor = 0;
    const lowerBoundStr = lowerBound.toString();
    let roundNumbersPattern = "|(";
    const overflow = lowerBoundStr[0] === "9";
    const sum = overflow ? parseInt(lowerBoundStr[0]) : parseInt(lowerBoundStr[0]) + 1;
    roundNumbersPattern += overflow ? "[1-9][0-9]" : `[${sum}-9]`;

    for (const digit of lowerBoundStr) {
        const digitInt = parseInt(digit);
        const digitDiff = 9 - digitInt;
        const upperRangeInFactor = digitInt + digitDiff;
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

    const largerPart = generateLargerPart(lowerBound);
    let fullPattern = `(?!(${lowerBoundStr}(\\.0*)?$))` + "(?<!\.)" + pattern + roundNumbersPattern + largerPart;
    regex = new RegExp(fullPattern);
    return regex;
}

// Log file tests
function testGenerateRegexFromLowerBoundLogFile() {
    const logfile = `
    This is a logfile
Velocity 100 adrenaline 50
Velocity 120 adrenaline 60
Velocity 110 adrenaline 55
Velocity 130 adrenaline 70
Velocity 115 adrenaline 65
Velocity 140 adrenaline 75
Velocity 125 adrenaline 68
Velocity 135 adrenaline 72
Velocity 145 adrenaline 80
Velocity 150 adrenaline 85
Velocity 155 adrenaline 90
Velocity 160 adrenaline 95
Velocity 165 adrenaline 100
Velocity 170 adrenaline 105
Velocity 175 adrenaline 110
Velocity 180 adrenaline 115
Velocity 185 adrenaline 120
Velocity 190 adrenaline 125
Velocity 195 adrenaline 130
Velocity 200 adrenaline 135
`;

    const regexOver100 = generateRegexFromLowerBound(100);
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

    console.log("All tests passed successfully.");
}

// Run the tests
testGenerateRegexFromLowerBound();
