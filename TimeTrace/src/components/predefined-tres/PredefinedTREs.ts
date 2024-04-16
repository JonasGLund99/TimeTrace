export enum PredefinedTre {
    None,
    Between,
}

export interface IPredefinedTRE {
    type: PredefinedTre;
    insertTRE: () => string;
}


export interface BetweenTREInput {
    firstGroup: string;
    secondGroup: string;
    startTime: string;
    endTime: string;

}

export class BetweenTREClass implements IPredefinedTRE {
    public type: PredefinedTre = PredefinedTre.Between;
    public input: BetweenTREInput;
    //[0] = First group of events, [1] = Second group of events, [2] = Start time, [3] = End time
    public insertTRE(): string {
        return `((${this.input.firstGroup})(${this.input.secondGroup}))%(${this.input.startTime},${this.input.endTime})`;
    }

    public constructor(input?: BetweenTREInput) {
        if (input) {
            this.input = input;
        } 
        else {
            this.input = { firstGroup: "", secondGroup: "" ,  startTime: "" ,  endTime: ""};
        }
    }
}