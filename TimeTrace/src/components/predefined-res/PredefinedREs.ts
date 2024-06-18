import { generateInclusiveOverRegex, generateIntervalRegex, generateStrictOverRegex } from "../../models/helpers/predefinedRegexes";


export enum PredefinedREType {
    InclusiveOver,
    StrictOver,
    Interval,
    StrictUnder,
    InclusiveUnder,
}

/**
 * Every predefinedRE must have a title for its modal and a method to insert the RE.
 * {@link PredefinedRE.title}
 * {@link PredefinedRE.insertRE}
 */
export interface PredefinedRE {
    title: string;
    insertRE: () => string;
}


/**
 * These interfaces are just to make the predefinedRE classes more compact
 */
export interface IntervalInput {
    prependedText: string;
    lowerBound: string;
    upperBound: string;
}

export class IntervalClass implements PredefinedRE {
    public input: IntervalInput;
    public title: string = 'Find integers between an interval';

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

/**
 * This class is used for the predefinedREs: "Greater or Equal", "Greater", "Smaller", "Smaller or Equal"
 */
export class OverClass implements PredefinedRE {
    public input: OverInput;
    public title: string = '';
    public includesLowerBound: boolean;
    /**
     * {@link negateRe} is used to turn the over into an under predefined RE.
     */
    public negateRe: boolean;
    public label: string = '';

    public insertRE(): string {
        let re = '';
        //We want to include the lowerbound, this is done using inclusiveOver.
        if(this.includesLowerBound) {
            //If the RE should be negated that is turned into under we prepend (?!(
            re = `${this.input.prependedText}${this.negateRe ? '(?!(': ''}${generateInclusiveOverRegex(this.input.lowerBound)}${this.negateRe ? '))': ''}`;
        }
        //We want to exclude the lowerbound, this is done using strictOver.
        else {
            //If the RE should be negated that is turned into under we prepend (?!(
            re = `${this.input.prependedText}${this.negateRe ? '(?!(': ''}${generateStrictOverRegex(this.input.lowerBound)}${this.negateRe ? '))': ''}`;
        }

        return re;
    }

    public constructor(includesLowerBound: boolean, input: OverInput = { prependedText: '',  lowerBound: '' }, negateRe: boolean = false) {
        this.includesLowerBound = includesLowerBound;
        this.title = !includesLowerBound ? 'Find integers greater than some value' : 'Find integers greater or equal to some value';
        this.input = input;
        this.negateRe = negateRe;
        this.label = `Lower Bound (integers ${!this.includesLowerBound ? "larger than" : "larger or equal"})`
        if(negateRe) {
            this.title = `Find integers ${includesLowerBound ? 'under' : 'under and including'} some value`;
            this.label = `Lower Bound (integers ${this.includesLowerBound ? "under" : "under and including"})`
        }
    }
}
