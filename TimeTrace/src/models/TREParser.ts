export abstract class TREParser {
  public static parseTRE(tre: string): string {
    return tre;
  }

  public static isValidGroup(): boolean {
    return true;
  }

  public static isValidTimeConstraint(): boolean {
    return true;
  }

  public static isValidTimeUnit(): boolean {
    return true;
  }

  public static isValidSymbol(): boolean {
    return true;
  }

  public static isSymbolMapped(): boolean {
    return true;
  }
}
