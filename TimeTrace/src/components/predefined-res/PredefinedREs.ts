import { generateInclusiveOverRegex, generateIntervalRegex, generateStrictOverRegex } from "../../models/helpers/predefinedRegexes";


export enum PredefinedREType {
    InclusiveOver,
    StrictOver,
    Interval,
    StrictUnder,
    InclusiveUnder,
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
    public title: string = 'Find numbers between an interval';

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
    public includesLowerBound: boolean;
    public negateRe: boolean;
    public label: string = '';

    public insertRE(): string {
        let re = '';
        if(this.includesLowerBound) {
            re = `${this.input.prependedText}${this.negateRe ? '(?!(': ''}${generateInclusiveOverRegex(this.input.lowerBound)}${this.negateRe ? '))': ''}`;
        }
        else {
            re = `${this.input.prependedText}${this.negateRe ? '(?!(': ''}${generateStrictOverRegex(this.input.lowerBound)}${this.negateRe ? '))': ''}`;
        }

        return re;
    }

    public constructor(includesLowerBound: boolean, input: OverInput = { prependedText: '',  lowerBound: '' }, negateRe: boolean = false) {
        this.includesLowerBound = includesLowerBound;
        this.title = !includesLowerBound ? 'Find numbers greater than some value' : 'Find numbers greater or equal to some value';
        this.input = input;
        this.negateRe = negateRe;
        this.label = `Lower Bound (numbers ${!this.includesLowerBound ? "larger than" : "larger or equal"})`
        if(negateRe) {
            this.title = `Find numbers ${includesLowerBound ? 'under' : 'under and including'} some value`;
            this.label = `Lower Bound (numbers ${this.includesLowerBound ? "under" : "under and including"})`
        }
    }
}
