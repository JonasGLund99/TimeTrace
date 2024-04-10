export enum DateFormat {
    ISO_8601 = "ISO 8601",
    YYMMDD_HH_MM_SS = "YYMMDD HH.MM.SS",
    DD_MM_YYYY_HH_MM_SS = "DD/MM/YYYY HH:MM:SS",
    YYYY_MM_DD_HH_MM_SS_MMM = "YYYY-DD-MM HH:MM:SS.MMM",
}

interface DateFormats {
    [DateFormat.ISO_8601]: RegExp;
    [DateFormat.YYMMDD_HH_MM_SS]: RegExp;
    [DateFormat.DD_MM_YYYY_HH_MM_SS]: RegExp;
    [DateFormat.YYYY_MM_DD_HH_MM_SS_MMM]: RegExp;
}

export const dateFormats : DateFormats = {
    [DateFormat.ISO_8601]: /\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{1,6}(Z|[+-]\d{2}:\d{2})\b/g,
    [DateFormat.YYMMDD_HH_MM_SS]: /\b\d{6} \d{2}\.\d{2}\.\d{2}\b/g,
    [DateFormat.DD_MM_YYYY_HH_MM_SS]: /\b\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}\b/g,
    [DateFormat.YYYY_MM_DD_HH_MM_SS_MMM]: /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}/
}
