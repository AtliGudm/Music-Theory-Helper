import './App.css';
import ScaleFinder from './pages/ScaleFinder';
import { ScaleSettingsProvider } from "./ScaleSettingsContext";
import MidiInput from './pages/MidiInput';
import { Route, Routes } from 'react-router-dom';
import ScaleFinderContainer from './pages/ScaleFinderContainer';


function App() {
  return (
    <>
      {/* <Navbar /> */}
      <ScaleSettingsProvider>
        <Routes>
          <Route path="/" element={<ScaleFinder />}/>
          <Route path="/ScaleFinder" element={<ScaleFinder />}/>
          <Route path="/Music-Theory-Helper" element={<ScaleFinderContainer />}/>
        </Routes>
      </ScaleSettingsProvider>
    </>
  );
}

export default App;
