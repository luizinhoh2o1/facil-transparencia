import './App.css';
import React from 'react';
import Portaria from './pages/Portaria';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/portaria" element={<Portaria/>}/>
      </Routes>
    </div>
  );
}

export default App;
