export abstract class TREBuilder {
    public static TREString: string = ""

    public static buildTRE(rawTRE: string): string {
        this.TREString = rawTRE;
        const converted_tre = this.convertTimeConstraint(rawTRE);
        
        return converted_tre;
    }

    public static convertTimeConstraint(tre: string) : string{
    const regex = /(\d+(.\d+)*)(ms|s|m|h|d)/g;

        return tre.replace(regex, (match, value, unit) => {
            const numericValue = parseInt(value);
            let milliseconds = numericValue;
            switch (unit) {
                case 'ms':
                    milliseconds = numericValue;
                    break;
                case 's':
                    milliseconds = numericValue * 1000;
                    break;
                case 'm':
                    milliseconds = numericValue * 60000;
                    break;
                case 'h':
                    milliseconds = numericValue * 3600000;
                    break;
                case 'd':
                    milliseconds = numericValue * 86400000;
                    break;
            }
            return milliseconds.toString();
        });
    }
}

