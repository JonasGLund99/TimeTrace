const fs = require('fs');

function addMillisecondsToTimestamps(filePath) {
    const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
    let previousTimestamp = null;
    let millisecondsCounter = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const timestamp = line.match(/\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}/);
        if (timestamp) {
            const currentTimestamp = new Date(timestamp[0]).getTime();
            if (previousTimestamp !== null && currentTimestamp <= previousTimestamp) {
                millisecondsCounter++;
            } else {
                millisecondsCounter = 0;
            }
            const newTimestamp = new Date(currentTimestamp + millisecondsCounter).toISOString().replace('T', ' ').replace('Z', '');
            const formattedTimestamp = `${newTimestamp}`;
            lines[i] = line.replace(timestamp[0], formattedTimestamp);
            previousTimestamp = currentTimestamp + millisecondsCounter;
        }
    }

    fs.writeFileSync(filePath, lines.join('\n'));
}

function pad(num, size) {
    return ('000' + num).slice(-size);
}

// Example usage:
const filePath = './SMSDIRECT_202401_fixed_ms.log';
addMillisecondsToTimestamps(filePath);
console.log('Timestamps adjusted successfully.');