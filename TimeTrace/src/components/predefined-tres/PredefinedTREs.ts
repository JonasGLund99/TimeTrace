export enum PredefinedTre {
    None,
    Within,
}

export interface IPredefinedTRE {
    type: PredefinedTre;
    insertTRE: () => string;
}


export interface WithinTREInput {
    firstGroup: string;
    secondGroup: string;
    startTime: string;
    endTime: string;
}

export class WithinTREClass implements IPredefinedTRE {
    public type: PredefinedTre = PredefinedTre.Within;
    public input: WithinTREInput;
    public insertTRE(): string {
        return `((${this.input.firstGroup})(${this.input.secondGroup}))%(${this.input.startTime},${this.input.endTime})`;
    }

    public constructor(input?: WithinTREInput) {
        if (input) {
            this.input = input;
        } 
        else {
            this.input = { firstGroup: "", secondGroup: "" ,  startTime: "" ,  endTime: ""};
        }
    }
}