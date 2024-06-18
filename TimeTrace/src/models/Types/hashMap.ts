
/**
 * HashMap consisting of key-value pairs where the key is the timestamp from an event and the value is the index of the line in the logfile.
 */
export class HashMap {
    private map: Record<string, number>;

    constructor() {
        this.map = {};
    }

    set(key: string, value: number) {
        if (!(key in this.map)) {
            this.map[key] = value;
        }
    }

    get(key: string) {
        return this.map[key] !== undefined ? this.map[key] : null;
    }

    clear() {
        this.map = {};
    }
}