class CustomMap {
    private stringMap: Map<string, string>;
    private regexMap: Map<RegExp, string>;

    constructor(entries?: readonly (readonly [string | RegExp, string])[] | null) {
        this.stringMap = new Map<string, string>();
        this.regexMap = new Map<RegExp, string>();

        if (entries) {
            for (const [key, value] of entries) {
                if (typeof key === 'string') {
                    this.set(key, value);
                } else if (key instanceof RegExp) {
                    this.setRegex(key, value);
                } else {
                    throw new TypeError('Keys must be strings or regular expressions.');
                }
            }
        }
    }

    set(key: string, value: string): this {
        this.stringMap.set(key, value);
        return this;
    }

    setRegex(key: RegExp, value: string): this {
        this.regexMap.set(key, value);
        return this;
    }

    get(key: string): string | undefined {
        let value = this.stringMap.get(key);
        if (value !== undefined) {
            return value;
        }

        // Check for matching regex keys
        for (const [regex, val] of Array.from(this.regexMap.entries())) {
            if (regex.test(key)) {
                return val;
            }
        }

        return undefined;
    }

    // Other methods similar to Map can be added here
}

// Example usage:
const customMap = new CustomMap([
    ["test", "Value for test"],
    [/pattern\d+/, "Value for pattern"]
]);