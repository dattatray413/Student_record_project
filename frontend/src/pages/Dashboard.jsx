import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Card from "../components/Card";
import Sidebar from '../components/sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import App from '../App';


function Dashboard() {

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [stats, setStats] = useState({
    studentcount: null,
    pendingcount: null,
  });
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const result = await axios.get("http://localhost:3000/auth/dashboard")
        if (result.data.status === "success") {
          console.log("auth success");
        }
      } catch (err) {
        console.log(err);
        navigate('/');
      }
    }

    const fetchCount = async () => {
      try {
        const [students, Pending] = await Promise.all([
          axios.get("http://localhost:3000/auth/student-count"),
          axios.get("http://localhost:3000/auth/pending-count"),
        ]);
        // console.log(students, Pending);

        setStats({
          studentcount: students.data.count,
          pendingcount : Pending.data.count,
        });

      } catch (err) {
        console.log(err);
      }
      finally{
        setLoading(false);
      }
    }

    fetchDashboard();
    fetchCount();

  }, [navigate])

  return (
    <>
      <div className="flex">
        <Sidebar />
      
        <div className="flex-1">
    
          <div>
            <h1 className="text-[50px] font-bold mb-10">
              Dashboard
            </h1>

            <div className="grid grid-cols-3 gap-6">

              <Card
                title="Total Students"
                value={loading ? "...." : stats.studentcount ?? "_"}
                color="bg-blue-500"
                onClick={()=>{
                  navigate("/all-students");
                }
                }
              />

              <Card
                title="Pending Verification"
                value={loading ? "...." : stats.pendingcount ?? "_"}
                color="bg-orange-500"
                onClick={()=>{
                  navigate("/pending");
                }
                }
              />

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard