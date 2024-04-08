interface MapKey {
    key: string;
    isRegex: boolean;
}

export class CustomMap {
    private stringMap: Map<string, string>;
    private regexMap: Map<string, string>;

    constructor(entries?: readonly (readonly [MapKey, string])[] | null) {
        this.stringMap = new Map<string, string>();
        this.regexMap = new Map<string, string>();

        if (entries) {
            for (const [key, value] of entries) {
                if (typeof key === 'string') {
                    this.setString(key, value);
                } else {
                    throw new TypeError('Keys must be strings or regular expressions.');
                }
            }
        }
    }

    set(key:MapKey, value:string) {
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

    get(key: string): string | undefined {
        let value = this.stringMap.get(key);
        if (value !== undefined) {
            return value;
        }

        for (const [regex, val] of Array.from(this.regexMap.entries())) {
            if (new RegExp(regex).test(key)) {
                return val;
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
}
