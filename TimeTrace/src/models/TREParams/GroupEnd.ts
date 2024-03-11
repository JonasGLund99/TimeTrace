import { TREParam } from "../TREParam";

export class GroupEnd implements TREParam{
    convertToTre(): string {
        return(')');
    }

}