import { SearchInterval } from './SearchInterval';
import { LogSearcher } from './LogSearcher';
import { MonaaZone } from './MonaaZone';

export abstract class LogHandler {
    constructor() {
        throw new Error(`${typeof this} is a static class`);
    }

    public static mapMonaaOutputToEvent(MonaaOutput: string[], logFile: string[]): MonaaZone[] {
        return LogSearcher.findZones(logFile, this.extractSearchIntervals(MonaaOutput));
    }

    public static extractSearchIntervals(MonaaOutput: string[]): SearchInterval[] {
        let foundStart: number = -1;
        let foundEnd: number = -1;
        let foundIntervals: SearchInterval[] = [];

        for (let i = 0; i < MonaaOutput.length; i++) {
            const line = MonaaOutput[i]; 
            // const numbersInLine = line.split(/\s+/).filter(part => !isNaN(parseFloat(part)));
            // const previousLine = MonaaOutput[i - 1] || undefined;
            // const numbersInPreviousLine: string[] = previousLine? previousLine.split(/\s+/).filter(part => !isNaN(parseFloat(part))) : [];
            if (line.includes("=======") && foundStart !== -1 && foundEnd !== -1) { //RESET interval
                let SearchInterval: SearchInterval = { start: foundStart, end: foundEnd };
                foundIntervals.push(SearchInterval);

                foundStart = -1;
                foundEnd = -1;
            }
            else if ((line.includes("<= t <") || line.includes("< t <" ) || line.includes("< t <=") || line.includes("<= t <="))) {  //FIND Start
                foundStart = parseFloat(line.split(/\s+/).filter(part => !isNaN(parseFloat(part))).pop() || '');
            }
            else if (line.includes("<= t' <=")) {
                foundEnd = parseFloat(line.split(/\s+/).filter(part => !isNaN(parseFloat(part))).pop() || '');
            }
            // else if (!line.includes("t' - t") && numbersInLine[1] === numbersInPreviousLine[1]) {
            //     foundEnd = parseFloat(numbersInLine[1]);
            // }
            else if (line.includes("<= t' <") || line.includes("< t' <") || line.includes("< t' <=")) { //FIND End
                foundEnd = parseFloat(line.split(/\s+/).filter(part => !isNaN(parseFloat(part))).shift() || '');
            }
        }
        return foundIntervals;
    }
}

