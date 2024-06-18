
/**
 * Typically used when html classes are conditionally rendered
 * @returns a string array of all the html classes  that will be added to an element.  
 */
export function cn(...classes: String[]) {
    return classes.filter(Boolean).join(" ");
}