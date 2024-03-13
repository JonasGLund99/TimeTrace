import logo from './logo.svg';
import './App.css';
import { LogFormatter } from './models/LogFormatter';
import React, { useEffect, useState } from 'react'

function App() {
  //This is to test the log formatter******************** */
  // let lf: LogFormatter = new LogFormatter()
  //   let mappings: Map<string, string> = new Map([
  //       ["login", "A"],
  //       ["logout", "B"]
  //   ]);

  //   const [formattedFile, setFormattedFile] = useState<File | null>(null);

  //   useEffect(() => {
  //       (async () => {
  //           try {
  //               let res: File = await lf.formatLog(lf.file, mappings);
  //               setFormattedFile(res);
  //           } catch (e) {
  //               console.error(e);
  //           }
  //       })();
  //   }, []); 
    //********************************' */

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
