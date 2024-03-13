import { TREParam } from "../TREParam";

export class Or implements TREParam{
    
    convertToTre(): string {
        return '|';
    }
}