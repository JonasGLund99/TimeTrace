export abstract class TREParser {
  public static parseTRE(tre: string, mappings: Map<string, string>) {
    this.validateSymbols(tre);
    this.validateGroups(tre);
    this.validateTimeConstraints(tre);
    this.validateSymbolMappings(tre, mappings);
    return tre;
  }

  public static validateGroups(tre: string): void {
    let opened = 0;

    for (const char of tre) {
      if (char === "(") {
        opened++;
      } else if (char === ")") {
        if (opened === 0) {
          throw new Error("A parenthesis was opened without it being closed."); // Found closing parenthesis without matching opening parenthesis
        }
        opened--;
      }
    }

    if (opened < 0) {
      throw new Error(
        "An additional parenthesis is being closed without it having been opened."
      );
    }
  }

  public static validateTimeConstraints(tre: string): void {
    // match time units /(ms|s|m|h|d)?/;
    // match time constraints = /\d+(\.\d+)?/;
    // Regular expression to match and extract time constraints along with their time units
    const regex = /%\((\d+(\.\d+)?)(ms|s|m|h|d)?,(\d+(\.\d+)?)(ms|s|m|h|d)?\)/g;
    let match;
    let timeConstraintCount = tre.split("%").length - 1;
    let matchCount = 0;

    // Loop through all matches of time constraints in the TRE
    while ((match = regex.exec(tre)) !== null) {
      matchCount++;
      let firstNumber = parseFloat(match[1]);
      const firstTimeUnit = match[3];
      firstNumber = this.convertTimeToms(firstNumber, firstTimeUnit);
      let secondNumber = parseFloat(match[4]);
      const secondTimeUnit = match[6];
      secondNumber = this.convertTimeToms(secondNumber, secondTimeUnit);

      // Check if the first number is greater than or equal to the second number
      if (firstNumber >= secondNumber) {
        throw new Error(
          "First number in time constraint must be smaller than the second number"
        );
      }
    }

    if (matchCount !== timeConstraintCount) {
      throw new Error(
        "Something is wrong in your time constraints. Look after white space after the comma, an extra parenthesis or an invalid time unit."
      );
    }
  }

  public static validateSymbols(tre: string): void {
    const symbolsAreValid = /^[a-zA-Z()%\s\d+,.]+$/.test(tre);
    if (!symbolsAreValid) {
      throw new Error(
        "TRE contains invalid symbols. Only a-z, A-Z, %, parentheses, . , and whitespace are allowed."
      );
    }
  }

  public static validateSymbolMappings(
    tre: string,
    mappings: Map<string, string>
  ): void {
    // Extract all symbols from the TRE
    const symbols = tre.match(/[a-zA-Z]?/g)?.filter((symbol) => symbol !== "");
    if (!symbols) {
      return;
    }

    for (const symbol of symbols) {
      // Skip special symbols
      if (symbol === "z" || symbol === "Z") continue;
      if (!Array.from(mappings.values()).includes(symbol)) {
        throw new Error(
          `Symbol '${symbol}' does not have an event mapped to it.`
        );
      }
    }
  }

  public static convertTimeToms(
    timeConstraint: number,
    timeUnit: string
  ): number {
    switch (timeUnit) {
      case "s":
        return timeConstraint * 1000;
      case "m":
        return timeConstraint * 60000;
      case "h":
        return timeConstraint * 3600000;
      case "d":
        return timeConstraint * 86400000;
      default:
        return timeConstraint;
    }
  }
}
