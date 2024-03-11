import React from 'react';
import logo from './logo.svg';
import './App.css';
import { QueryHandler } from './models/QueryHandler';

function App() {
  const queryHandler = new QueryHandler();
  queryHandler.search("(AB)%(0,20)$", new File(["../../../experiments/logfiles/logMappedAB.txt"], "logMappedAB.txt"));

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
