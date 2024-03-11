import { TREParam } from "../TREParam";

export class GroupStart implements TREParam{
    convertToTre(): string {
        return('(');
    }

}