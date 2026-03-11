import { Link } from "react-router-dom";

function Sidebar() {
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

      </ul>

    </div>
  );
}

export default Sidebar;