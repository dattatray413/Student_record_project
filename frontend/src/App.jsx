import { useState } from 'react'
import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/Home';
import Loginform from './pages/Loginform'
import Forgot from './pages/Forgot';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Loginform" element={<Loginform />} />
      <Route path="/Forgot" element={<Forgot />} />
    </Routes>
  );
}

export default App
