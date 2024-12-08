import './App.css';
import ScaleFinder from './pages/ScaleFinder';
import { ScaleSettingsProvider } from "./ScaleSettingsContext";

import { Route, Routes } from 'react-router-dom';


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
