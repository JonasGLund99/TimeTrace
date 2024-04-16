import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages
import Home from './pages/Home';
import MappingsPage from './pages/MappingsPage';
import LogPage from './pages/LogPage';

//Components
import Navbar from './components/Navbar';
import AppdataProvider from './context/AppContext';
import Warning from './components/Warning';
import Loader from './components/Loader';

import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

export default function App() {
  return (
    <BrowserRouter>
      <AppdataProvider>
        <Warning />
        <ReactNotifications />
        <Navbar />
        <div className="relative w-full h-[94%] p-5">
          <Loader />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-mappings" element={<MappingsPage />} />
            <Route path="/view-log" element={<LogPage />} />
          </Routes>
        </div>
      </AppdataProvider>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
