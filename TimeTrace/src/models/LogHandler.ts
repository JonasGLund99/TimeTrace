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
            if (MonaaOutput[i].includes("=======") && foundStart !== -1 && foundEnd !== -1) { //RESET interval
                let SearchInterval: SearchInterval = { start: foundStart, end: foundEnd };
                foundIntervals.push(SearchInterval);

                foundStart = -1;
                foundEnd = -1;
            }
            else if (MonaaOutput[i].includes("<= t <") || MonaaOutput[i].includes("< t <") || MonaaOutput[i].includes("< t <=") || MonaaOutput[i].includes("<= t <=")) {  //FIND Start

                foundStart = parseFloat(MonaaOutput[i].split(/\s+/).filter(part => !isNaN(parseFloat(part))).pop() || '');
            }
            else if (MonaaOutput[i].includes("<= t' <") || MonaaOutput[i].includes("< t' <") || MonaaOutput[i].includes("< t' <=") || MonaaOutput[i].includes("<= t' <=")) { //FIND End

                foundEnd = parseFloat(MonaaOutput[i].split(/\s+/).filter(part => !isNaN(parseFloat(part))).shift() || '');
            }
        }
        return foundIntervals;
    }
}
