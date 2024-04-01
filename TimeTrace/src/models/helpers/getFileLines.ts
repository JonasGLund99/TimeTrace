
export async function getFileLines(file: File): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => { //must return promise because reader is async
        let reader = new FileReader();
        reader.onload = async (event) => {
            let textLines = (reader.result as string).split("\n"); //split file on newlines
            textLines = textLines.filter(line => line.replace(/(\r\n|\n|\r)/gm, "") !== '')
            resolve(textLines); //all went well, return textLines
        };
        reader.onerror = async (e) => { //on error reject
            console.error("Unable to read file", file.name, e);
            reject(e);
        };
        reader.readAsText(file); //call reader
    });
}