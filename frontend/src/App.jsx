
import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/Home';
import Loginform from './pages/Loginform';
import Forgot, { ResetPassword } from './pages/Forgot';
import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
    return (

        <Routes>
            <Route path="/" element={<Loginform />} />
            <Route path="/Forgot-Password" element={<Forgot />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/teacher-Dashboard" element={<Dashboard />} />
            <Route path="/student-Dashboard" element={<Home />} />
            
            {/* <Route path="/teacher-Dashboard" element={
                <ProtectedRoute allowedRole="teacher">
                    <Dashboard />
                </ProtectedRoute>} />
            <Route path="/student-Dashboard" element={
                <ProtectedRoute allowedRole="student">
                    <Home />
                </ProtectedRoute>} /> */}
            <Route path="/unauthorized" element={<h1 className="text-red-500">Access Denied</h1>} />
        </Routes>

    );
}

export default App
