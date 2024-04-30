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