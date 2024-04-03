export function cn(...classes: String[]) {
    return classes.filter(Boolean).join(" ");
}