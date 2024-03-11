import { TREParam } from "../TREParam";

export class And implements TREParam{
    convertToTre(): string {
        return '&';
    }

}