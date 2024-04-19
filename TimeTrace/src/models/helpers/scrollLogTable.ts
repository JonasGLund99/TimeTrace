export function scrollToMonaaMatch() {
    const logTable = document.querySelector("#log-table");
    if (!logTable) return;

    const firstMappedLineMatched = document.querySelector(".mapped-line") as HTMLElement;
    const firstUnmappedLineMatched = document.querySelector(".unmapped-line") as HTMLElement;

    let lineToScrollTo: HTMLElement;
    if (!firstMappedLineMatched && !firstUnmappedLineMatched) {
        logTable.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    };

    if (!firstMappedLineMatched) {
        lineToScrollTo = firstUnmappedLineMatched;
    }
    else if (!firstUnmappedLineMatched) {
        lineToScrollTo = firstMappedLineMatched;
    }
    else {
        lineToScrollTo = firstMappedLineMatched.offsetTop < firstUnmappedLineMatched.offsetTop ? firstMappedLineMatched : firstUnmappedLineMatched;
    }
    logTable.scrollTo({ top: lineToScrollTo.offsetTop });
}

export function calcStartEndOfRender(minPage: number, maxPage: number, startOfMatchIndex: number, endOfMatchIndex: number, linesPerPage: number): { startOfRender: number, endOfRender: number } {
    const offsetIndex = 5;
    let startOfRender = Math.floor(startOfMatchIndex / linesPerPage);
    let endOfRender = Math.ceil(endOfMatchIndex / linesPerPage);

    if (startOfRender === minPage)
        startOfRender = minPage;
    else if (startOfMatchIndex % linesPerPage < offsetIndex)
        startOfRender = startOfRender - 1;

    if (endOfRender === maxPage)
        endOfRender = maxPage;
    else if (endOfMatchIndex % linesPerPage > linesPerPage - offsetIndex)
        endOfRender = endOfRender + 1;

    return { startOfRender, endOfRender };
}
