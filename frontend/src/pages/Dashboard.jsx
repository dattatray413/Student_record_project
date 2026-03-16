import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Card from "../components/Card";
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import App from '../App';


function Dashboard() {

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const result = await axios.get("http://localhost:3000/auth/dashboard")
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

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1">

          <Navbar />
          <div>
            <h1 className="text-[50px] font-bold mb-10">
              Dashboard
            </h1>

            <div className="grid grid-cols-3 gap-6">

              <Card
                title="Total Students"
                value="120"
                color="bg-blue-500"
              />

              <Card
                title="Uploaded Documents"
                value="320"
                color="bg-green-500"
              />

              <Card
                title="Pending Verification"
                value="15"
                color="bg-orange-500"
              />

            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Dashboard