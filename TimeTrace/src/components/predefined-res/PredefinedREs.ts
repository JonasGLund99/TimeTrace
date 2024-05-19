import { generateInclusiveOverRegex, generateIntervalRegex, generateStrictOverRegex } from "../../models/helpers/predefinedRegexes";


export enum PredefinedREType {
    InclusiveOver,
    StrictOver,
    Interval,
}

export interface PredefinedRE {
    title: string;
    insertRE: () => string;
}


export interface IntervalInput {
    prependedText: string;
    lowerBound: string;
    upperBound: string;
}

export class IntervalClass implements PredefinedRE {
    public input: IntervalInput;
    public title: string = 'Event followed by an event within a duration';

    public insertRE(): string {
        return `${this.input.prependedText}${generateIntervalRegex(this.input.lowerBound, this.input.upperBound)}`;
    }

    public constructor(input?: IntervalInput) {
        if (input) {
            this.input = input;
        } 
        else {
            this.input = { prependedText: '',  lowerBound: '' ,  upperBound: ''};
        }
    }
}

export interface OverInput {
    prependedText: string;
    lowerBound: string;
}

export class OverClass implements PredefinedRE {
    public input: OverInput;
    public title: string = '';
    public isStrictlyOver: boolean;

    public insertRE(): string {
        if(this.isStrictlyOver) {
            return `${this.input.prependedText}${generateStrictOverRegex(this.input.lowerBound)}`;
        }
        else {
            return `${this.input.prependedText}${generateInclusiveOverRegex(this.input.lowerBound)}`;
        }
    }

    public constructor(isStrictlyOver: boolean, input?: OverInput,) {
        this.isStrictlyOver = isStrictlyOver;
        this.title = isStrictlyOver ? 'Find numbers greater than some value' : 'Find numbers greater or equal to some value';
        if (input) {
            this.input = input;
        } 
        else {
            this.input = { prependedText: '',  lowerBound: '' };
        }
    }
}