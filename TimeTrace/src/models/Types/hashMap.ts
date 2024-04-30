

export class HashMap {
    private map: Map<string, number>

    constructor() {
        this.map = new Map<string, number>()
    }

    set(key: string, value: number) {
        if (!this.map.has(key))
            this.map.set(key, value)
    }

    get(key: string) {
        return this.map.get(key)
    }

    clear() {
        this.map = new Map<string, number>()
    }
}