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

    /**
     * Generic set that will either insert a key-value pair into the string or regexMap
     */
    set(key: MapKey, value: string) {
        if (key.isRegex)
            this.setRegex(key.key, value)
        else
            this.setString(key.key, value)
    }

    /**
     * Creates an entry in the stringMap
     */
    setString(key: string, value: string): this {
        this.stringMap.set(key, value);
        return this;
    }

    /**
     * Creates an entry in the regexMap
     */
    setRegex(key: string, value: string): this {
        this.regexMap.set(key, value);
        return this;
    }

    /**
     * Used to retrieve the mapping of an event
     * @returns string | undefined 
     */
    get(eventString: string, fullString?: string): string | undefined {
        let value = this.stringMap.get(eventString);
        if (value !== undefined && value !=="") {
            return value;
        }

        if (fullString !== undefined) {
            value = this.stringMap.get(fullString);
            // A mapping for the event was found in the stringMap.
            if (value !== undefined && value!=="") {
                return value;
            }
            
            // A mapping for the event was found in the regexMap.
            for (const [regex, val] of Array.from(this.regexMap.entries())) {
                if (new RegExp(regex).test(fullString)) { //only search in regex on full string
                    return val;
                }
            }
        }

        return undefined;
    }

    /**
     * Removes either a key from the string or regex map
     */ 
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

    /**
     * 
     * @returns An array of tuples [string, string], where each tuple is an entry in the map.
     * The first item of the tuple is the key from one of the maps and the value is the value. 
     */
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

    /**
     * 
     * @returns A string[] containing the values from the regexMap concatenated with the values from the stringMap.
     */
    values(): string[] {
        return Array.from(this.regexMap.values()).concat(Array.from(this.stringMap.values()));
    }
}
