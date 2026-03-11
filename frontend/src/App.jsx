
import ReactDOM from "react-dom/client";
import { Routes, Route} from "react-router-dom";
import './App.css'
import Home from './pages/Home';
import Loginform from './pages/Loginform';
import Forgot from './pages/Forgot';
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";

function App() {
  return (
    
      <Routes>
      <Route path="/" element={<Loginform />} />
      <Route path="/Forgot-Password" element={<Forgot />} />
      <Route path="/home" element={<Home />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    
  );
}

export default App
