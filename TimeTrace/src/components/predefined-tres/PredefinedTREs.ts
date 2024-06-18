export enum PredefinedTre {
    None,
    Within,
    Sequential,
    TimedEvent,
    TimedSequential,
}

/**
 * Every predefinedTRE must have a title ({@link IPredefinedTRE.title}) used for the title of the modal
 * Every predefiendTRE must have a method ({@link IPredefinedTRE.insertTRE}) that returns the predefinedTRE as a string 
 */
export interface IPredefinedTRE {
    title: string;
    insertTRE: () => string;
}

/**
 * To make the {@link WithinTREClass} a bit more compact
 */
export interface WithinTREInput {
    firstGroup: string;
    secondGroup: string;
    startTime: string;
    endTime: string;
}

export class WithinTREClass implements IPredefinedTRE {
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

export interface TimedEventTREInput {
    firstGroup: string;
    startTime: string;
    endTime: string;
}

export class TimedEventTREClass implements IPredefinedTRE {
    public title: string = 'An event with a time constraint';
    public input: TimedEventTREInput;
    public insertTRE(): string {
        return `(${this.input.firstGroup})%(${this.input.startTime},${this.input.endTime})`;
    }

    public constructor(input?: TimedEventTREInput) {
        if (input) {
            this.input = input;
        } 
        else {
            this.input = { firstGroup: '', startTime: '', endTime: ''};
        }
    }
}

export interface TimedSequentialTREInput {
    firstGroup: string;
    firstStartTime: string;
    firstEndTime: string;
    secondGroup: string;
    secondStartTime: string;
    secondEndTime: string;
}

export class TimedSequentialClass implements IPredefinedTRE {
    public title: string = 'Two sequential events with time constraints';
    public input: TimedSequentialTREInput;

    public insertTRE(): string {
        return `(${this.input.firstGroup})%(${this.input.firstStartTime},${this.input.firstEndTime})(${this.input.secondGroup})%(${this.input.secondStartTime},${this.input.secondEndTime})`;
    }

    public constructor(input?: TimedSequentialTREInput) {
        if (input) {
            this.input = input;
        } 
        else {
            this.input = { firstGroup: '', firstStartTime: '', firstEndTime: '', secondGroup: '', secondStartTime: '', secondEndTime: ''};
        }
    }
}