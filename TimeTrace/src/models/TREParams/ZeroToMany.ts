import { TREParam } from "../TREParam";

export class ZeroToMany implements TREParam{
    convertToTre(): string {
        return '*';
    }
}