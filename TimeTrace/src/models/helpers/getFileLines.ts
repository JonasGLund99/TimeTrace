/**
 * @returns A promise Promise<string[]>. That is a promise that when resolved contains all the lines from a logfile. 
 */
export async function getFileLines(file: File): Promise<string[]> {
    //must return promise because reader is async
    return new Promise<string[]>((resolve, reject) => { 
        let reader = new FileReader();
        reader.onload = async (event) => {
            //split file on newlines
            let textLines = (reader.result as string).split("\n"); 
            textLines = textLines.filter(line => line.replace(/(\r\n|\n|\r)/gm, "") !== '')
            //all went well, return textLines
            resolve(textLines); 
        };
        //on error reject
        reader.onerror = async (e) => { 
            console.error("Unable to read file", file.name, e);
            reject(e);
        };
        //call reader
        reader.readAsText(file); 
    });
}