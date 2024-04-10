import { TREParam } from "./TREParam";
import { TREParser } from "./TREParser";
export abstract class TREBuilder {
    public static TREParams: TREParam[] = [];

    //TODO figure out what Anders does with regex mappings.
    public static buildTRE(TREString: string, mappings: Map<string, string>): string {
        TREParser.parseTRE(TREString, mappings);

        for (const TreParam of this.TREParams) {
            TREString += TreParam.convertToTre();
        }

        return TREString + "$";
    }
}
