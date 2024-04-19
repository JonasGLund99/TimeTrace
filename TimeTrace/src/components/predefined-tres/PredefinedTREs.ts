export enum PredefinedTre {
    None,
    Within,
    Sequential,
    After,
}

export interface IPredefinedTRE {
    type: PredefinedTre;
    title: string;
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
    public title: string = 'Event followed by an event within a duration';

    public insertTRE(): string {
        return `((${this.input.firstGroup})(${this.input.secondGroup}))%(${this.input.startTime},${this.input.endTime})`;
    }

    public constructor(input?: WithinTREInput) {
        if (input) {
            this.input = input;
        } 
        else {
            this.input = { firstGroup: '', secondGroup: '' ,  startTime: '' ,  endTime: ''};
        }
    }
}

export interface SequentialTREInput {
    firstGroup: string;
    secondGroup: string;
}

export class SequentialTREClass implements IPredefinedTRE {
    public title: string = 'Event followed by an event';
    public input: SequentialTREInput;
    public type: PredefinedTre = PredefinedTre.Sequential;
    public insertTRE(): string {
        return `(${this.input.firstGroup})(${this.input.secondGroup})`
    }

    public constructor(input?: SequentialTREInput) {
        if (input) {
            this.input = input;
        } 
        else {
            this.input = { firstGroup: '', secondGroup: ''};
        }
    }
}

export interface AfterTREInput {
    firstGroup: string;
    startTime: string;
    endTime: string;
}

export class AfterTREclass implements IPredefinedTRE {
    public title: string = 'An event with a time constraint';
    public type: PredefinedTre = PredefinedTre.After;
    public input: AfterTREInput;
    public insertTRE(): string {
        return `(${this.input.firstGroup})%(${this.input.startTime},${this.input.endTime})`;
    }

    public constructor(input?: AfterTREInput) {
        if (input) {
            this.input = input;
        } 
        else {
            this.input = { firstGroup: '', startTime: '', endTime: ''};
        }
    }
}