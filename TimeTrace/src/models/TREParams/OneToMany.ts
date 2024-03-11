import { TREParam } from "../TREParam";

export class OneToMany implements TREParam{
    convertToTre(): string {
        return '+';
    }

}