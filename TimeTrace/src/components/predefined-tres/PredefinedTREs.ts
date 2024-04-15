export enum PredefinedTre {
    None,
    Between,
}

interface IHTMLInput {
    value: string;
}

export interface IPredefinedTRE {
    input: IHTMLInput[];
    type: PredefinedTre;
    insertTRE: () => string;
}

export class BetweenTREClass implements IPredefinedTRE {
    public type: PredefinedTre = PredefinedTre.Between;
    //[0] = First group of events, [1] = Second group of events, [2] = Start time, [3] = End time
    public input: IHTMLInput[] = [{ value: "" }, { value: "" }, { value: "" }, { value: "" }];
    public insertTRE(): string {
        return `(${this.input[0].value.toString()}${this.input[1].value.toString()})%(${this.input[2].value.toString()},${this.input[3].value.toString()})`;
    }

    public constructor(input?: IHTMLInput[]) {
        if (input) {
            this.input = input;
        } 
        else {
            this.input = [{ value: "" }, { value: "" }, { value: "" }, { value: "" }];
        }
    }
}