import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Sidebar() {

  const navigate = useNavigate();
  const handleLogout = async (e)=>{
    try {
      const result = await axios.get("http://localhost:3000/auth/logout")
      if(result.data.status === "logged out successfully"){
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5">

      <h1 className="text-2xl font-bold mb-10">
        Admin Panel
      </h1>

      <ul className="space-y-4">

        <li>
          <Link to="/" className="hover:text-blue-400">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/students" className="hover:text-blue-400">
            Students
          </Link>
        </li>

        <li>
          <Link to="/documents" className="hover:text-blue-400">
            Documents
          </Link>
        </li>

        <li>
            {/* your dashboard UI */}
            <button onClick={handleLogout}>Logout</button> {/* ✅ just add this button */}
        </li>


      </ul>

    </div>
  );
}

export default Sidebar;