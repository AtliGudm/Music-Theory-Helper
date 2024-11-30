import logo from './logo.svg';
import './App.css';
import Navbar from './pages/Navbar';
import Page_1 from './pages/Page_1';
import HomePage from './pages/HomePage';
import ScaleFinder from './pages/ScaleFinder';

import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';

const things = [2, 5, 35,65,18,12];


function App() {
  const betterThings = things.filter((thing) => thing >= 18);
  console.log(betterThings);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/Page_1" element={<Page_1/ >}/>
        <Route path="/ScaleFinder" element={<ScaleFinder />}/>
      </Routes>

    </>
  );
}

export default App;
