// import React from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";

function Home() {

  const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    useEffect(() => {
      const fetchDashboard = async () => {
        try {
          const result = await axios.get("http://localhost:3000/auth/student-dashboard")
          if (result.data.status === "success") {
            console.log("success");
          }
        } catch (err) {
          console.log(err);
          navigate('/');
        }
      }
       fetchDashboard();
  
    }, [])

  return (
  <>
  <div className="flex">
    <Sidebar />
    
    <div className="flex-1">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">
        Students
      </h1>

      <table className="w-full bg-white shadow rounded">

        <thead className="bg-gray-200 ">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Course</th>
            <th className="p-3">Documents</th>
          </tr>
        </thead>

        <tbody>

          <tr className="text-center border-t">
            <td className="p-3">Rahul</td>
            <td>rahul@gmail.com</td>
            <td>BCA</td>
            <td>
              <button className="bg-blue-500 text-white px-3 py-1 rounded">
                View
              </button>
            </td>
          </tr>

        </tbody>

      </table>
    </div>
  </div>
  </>
  )
}

export default Home