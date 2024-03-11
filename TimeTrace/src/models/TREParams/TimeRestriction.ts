import { TREParam } from "../TREParam";

export class TimeRestriction implements TREParam{
    s: number = 0;
    t: number = 0;

    convertToTre(): string {
        return `%(${this.s},${this.t})`
    }
}
