import logo from './logo.svg';
import './App.css';
import Navbar from './pages/Navbar';
import ScaleFinder from './pages/ScaleFinder';
import { ScaleSettingsProvider } from "./ScaleSettingsContext";

import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';


function App() {

  return (
    <>
    
      {/* <Navbar /> */}
      <ScaleSettingsProvider>
        <Routes>
          <Route path="/" element={<ScaleFinder />}/>
          <Route path="/ScaleFinder" element={<ScaleFinder />}/>
        </Routes>
      </ScaleSettingsProvider>
    </>
  );
}

export default App;
