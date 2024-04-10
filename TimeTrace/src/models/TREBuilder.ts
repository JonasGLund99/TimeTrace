import { TREParam } from "./TREParam";
import { TREParser } from "./TREParser";
import { CustomMap } from "./Types/EventMapping";

export abstract class TREBuilder {
    public static TREParams: TREParam[] = [];

    //TODO figure out what Anders does with regex mappings.
    public static buildTRE(TREString: string, mappings: CustomMap): string {
        TREParser.parseTRE(TREString, mappings);

        for (const TreParam of this.TREParams) {
            TREString += TreParam.convertToTre();
        }

        return TREString + "$";
    }
}
