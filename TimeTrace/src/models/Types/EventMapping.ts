interface MapKey {
    key: string;
    isRegex: boolean;
}

export class CustomMap {
    public stringMap: Map<string, string>;
    public regexMap: Map<string, string>;

    constructor(entries?: ([MapKey, string])[] | CustomMap | null) {
        this.stringMap = new Map<string, string>();
        this.regexMap = new Map<string, string>();

        if (entries) {
            if (entries instanceof CustomMap) {
                let oldInstance: CustomMap = entries;
                entries = []
                for (const [regex, val] of Array.from(oldInstance.regexMap.entries())) {
                    entries.push([{key: regex, isRegex: true}, val]);
                }
                for (const [str, val] of Array.from(oldInstance.stringMap.entries())) {
                    entries.push([{key: str, isRegex: false}, val]);
                }
            }

            for (const [key, value] of entries) {
                this.set(key, value)
            }
        }
    }

    set(key: MapKey, value: string) {
        if (key.isRegex)
            this.setRegex(key.key, value)
        else
            this.setString(key.key, value)
    }

    setString(key: string, value: string): this {
        this.stringMap.set(key, value);
        return this;
    }

    setRegex(key: string, value: string): this {
        this.regexMap.set(key, value);
        return this;
    }

    get(eventString: string, fullString?: string): string | undefined {
        let value = this.stringMap.get(eventString);
        if (value !== undefined && value!=="") {
            return value;
        }

        if (fullString !== undefined) {
            value = this.stringMap.get(fullString);
            if (value !== undefined && value!=="") {
                return value;
            }
            
            for (const [regex, val] of Array.from(this.regexMap.entries())) {
                if (new RegExp(regex).test(fullString)) { //only search in regex on full string
                    return val;
                }
            }
        }

        return undefined;
    }

    remove(key: string): void {
        if (this.stringMap.has(key)) {
            this.stringMap.delete(key);
            return;
        }

        if (this.regexMap.has(key)) {
            this.regexMap.delete(key);
            return;
        }
    }

    allMappings(): [string, string][] {
        let mappings: [string, string][] = [];
        for (const [regex, val] of Array.from(this.regexMap.entries())) {
            mappings.push([regex, val])
        }
        for (const [str, val] of Array.from(this.stringMap.entries())) {
            if (val !== "")
                mappings.push([str, val])
        }

        return mappings
    }
}
