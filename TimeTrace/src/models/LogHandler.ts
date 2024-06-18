import { SearchInterval } from './SearchInterval';
import { LogSearcher } from './LogSearcher';
import { MonaaZone } from './MonaaZone';

export abstract class LogHandler {
    constructor() {
        throw new Error(`${typeof this} is a static class`);
    }

    public static mapMonaaOutputToEvent(MonaaOutput: string[]): MonaaZone[] {
        return LogSearcher.findZones(this.extractSearchIntervals(MonaaOutput));
    }

    public static extractSearchIntervals(MonaaOutput: string[]): SearchInterval[] {
        let foundStart: number = -1;
        let foundEnd: number = -1;
        let foundIntervals: SearchInterval[] = [];

        for (let i = 0; i < MonaaOutput.length; i++) {
            const line = MonaaOutput[i]; 
            
            //Indicates that a new match begins
            if (line.includes("=======") && foundStart !== -1 && foundEnd !== -1) { //RESET interval
                let SearchInterval: SearchInterval = { start: foundStart, end: foundEnd };
                foundIntervals.push(SearchInterval);

                foundStart = -1;
                foundEnd = -1;
            }
            //Lower bound of Monaazone
            else if (MonaaOutput[i].includes("<= t <") || MonaaOutput[i].includes("< t <") || MonaaOutput[i].includes("< t <=") || MonaaOutput[i].includes("<= t <=")) {  //FIND Start

                foundStart = parseFloat(MonaaOutput[i].split(/\s+/).filter(part => !isNaN(parseFloat(part))).pop() || '');
            }

            //Upper bound of Monaazone
            else if (MonaaOutput[i].includes("<= t' <") || MonaaOutput[i].includes("< t' <") || MonaaOutput[i].includes("< t' <=") || MonaaOutput[i].includes("<= t' <=")) { //FIND End

                foundEnd = parseFloat(MonaaOutput[i].split(/\s+/).filter(part => !isNaN(parseFloat(part))).shift() || '');
            }
        }
        return foundIntervals;
    }
}
