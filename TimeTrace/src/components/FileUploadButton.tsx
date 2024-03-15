import { LogFormatter } from "../models/LogFormatter";


function FileUploadButton() {
    
    return (
        <div className="mt-5">
            <input className="hidden"
              type="file"
              accept=".txt, .json"
              id="contained-button-file"
              onChange={handleFileUpload}
            />
            <button>
              <label htmlFor="contained-button-file" className="px-5 py-2 border-2 rounded-md cursor-pointer border-black-100">
                  Upload
              </label>
            </button>
          </div>
    );
}

async function handleFileUpload(e : React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log("File:", file);
    
    let mappings: Map<string, string> = new Map([
      ["login", "A"],
      ["logout", "B"]
    ]);
    
    let logFormatter : LogFormatter = new LogFormatter();
    let formattedFile : File = await logFormatter.formatLog(file, mappings)

    console.log("FormattedFile:", formattedFile);
}

export default FileUploadButton;
