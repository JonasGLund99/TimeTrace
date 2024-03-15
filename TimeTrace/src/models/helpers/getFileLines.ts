
export async function getFileLines(originalLog: File): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => { //must return promise because reader is async
        let reader = new FileReader();
        reader.onload = async (event) => {
            let textLines = (reader.result as string).split("\n"); //split file on newlines
            resolve(textLines); //all went well, return textLines
        };
        reader.onerror = async (e) => { //on error reject
            console.error("Unable to read file", originalLog.name, e);
            reject(e);
        };
        reader.readAsText(originalLog); //call reader
    });
}