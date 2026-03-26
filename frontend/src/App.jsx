
import { Routes, Route } from "react-router-dom";
import './App.css'
import Loginform from './pages/Loginform';
import Forgot from './pages/Forgot';
import StudentForm from "./pages/Form";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import Students from "./pages/Students";
import Pending from "./pages/Pending";
import StudentInfo from "./pages/StudentInfo";
import StudentPanel from "./pages/StudentPanel";


function App() {
    return (

        <Routes>
            <Route path="/" element={<Loginform />} />
            <Route path="/student-form" element={<StudentForm />} />
            <Route path="/Forgot-Password" element={<Forgot />} />
            {/* <Route path="/teacher-Dashboard" element={<Dashboard />} /> */}
            {/* <Route path="/student-Dashboard" element={<Home />} /> */}
            <Route path="/all-students" element={<Students />} />
            <Route path="/student/:id" element={<StudentInfo />} />
            {/* <Route path="/pending" element={<Pending />} /> */}

            <Route path="/pending" element={
                <ProtectedRoute allowedRole="teacher">
                    <Pending />
                </ProtectedRoute>} />
            
            <Route path="/teacher-Dashboard" element={
                <ProtectedRoute allowedRole="teacher">
                    <Dashboard />
                </ProtectedRoute>} />
            <Route path="/student-Dashboard" element={
                <ProtectedRoute allowedRole="student">
                    <StudentPanel />
                </ProtectedRoute>} />
            <Route path="/unauthorized" element={<h1 className="text-red-500">Access Denied</h1>} />
        </Routes>

    );
}

export default App
