import { TREParam } from './TREParam';
export abstract class TREBuilder {
    public static TREParams: TREParam[] = [];
    public static TREString: string = ""


    public static buildTRE(TREString: string): string {
        this.TREString = TREString;

        for (const TreParam of this.TREParams) {
            this.TREString += TreParam.convertToTre();
        }

        return this.TREString;
    }
}

