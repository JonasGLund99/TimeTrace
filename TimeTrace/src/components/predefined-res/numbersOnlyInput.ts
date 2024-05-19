export function validateNumberInput(number: string): boolean {
    if(Number(number)) {
        return true;
    }

    return false;
}