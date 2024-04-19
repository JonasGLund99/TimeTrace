export function scrollToMonaaMatch() {
    const logTable = document.querySelector("#log-table");
    if (!logTable) return;
    
    const firstMappedLineMatched = document.querySelector(".mapped-line") as HTMLElement;
    const firstUnmappedLineMatched = document.querySelector(".unmapped-line") as HTMLElement;
    
    let lineToScrollTo: HTMLElement;
    if (!firstMappedLineMatched && !firstUnmappedLineMatched) {
        logTable.scrollTo({ top: 0 , behavior: 'smooth'});
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