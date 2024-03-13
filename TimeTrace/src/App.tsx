import React from 'react';
import logo from './logo.svg';
import './App.css';
import { LogHandler } from './models/LogHandler';

function App() {
  const logHandler = new LogHandler();
  logHandler.extractSearchInterval([
      " -0.000000       <= t <   1.000000\n",
      "  8.000000        < t' <=  15.000000\n",
      "  7.000000        < t' - t <=  15.000000\n",
      "=============================\n",
      "  8.000000       <= t <  15.000000\n",
      " 20.000000        < t' <=  23.000000\n",
      "  5.000000        < t' - t <=  15.000000\n",
      "=============================\n",
      " 20.000000       <= t <  23.000000\n",
      " 27.000000        < t' <=  30.000000\n",
      "  4.000000        < t' - t <=  10.000000\n",
      "=============================\n",
      " 27.000000       <= t <  30.000000\n",
      " 34.000000        < t' <=  40.000000\n",
      "  4.000000        < t' - t <=  13.000000\n",
      "=============================\n"
  ]);
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
