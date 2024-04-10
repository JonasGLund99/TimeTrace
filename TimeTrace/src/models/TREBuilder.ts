import { TREParser } from "./TREParser";
import { CustomMap } from "./Types/EventMapping";

export abstract class TREBuilder {

    public static buildTRE(rawTRE: string, mappings: CustomMap): string {
        const trimmedTRE = rawTRE.trim();
        TREParser.parseTRE(trimmedTRE, mappings);
        const converted_tre = this.convertTimeConstraint(rawTRE);
        
        return converted_tre + "$";
    }

    public static convertTimeConstraint(tre: string) : string{
    const regex = /(\d+(.\d+)*)(ms|s|m|h|d)/g;

        return tre.replace(regex, (match, value, decimal, unit) => {
            const numericValue = parseFloat(value + (decimal || ''));
            let milliseconds = numericValue;
            switch (unit) {
                case 'ms':
                    milliseconds = numericValue;
                    break;
                case 's':
                    milliseconds = numericValue * 1000;
                    break;
                case 'm':
                    milliseconds = numericValue * 60000;
                    break;
                case 'h':
                    milliseconds = numericValue * 3600000;
                    break;
                case 'd':
                    milliseconds = numericValue * 86400000;
                    break;
                default:
                    throw new Error(`Unknown unit: ${unit}`);
            }
            return Math.floor(milliseconds).toString();
        });
    }
}
