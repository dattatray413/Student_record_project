import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-white shadow p-4 flex justify-between">

      <h2 className="text-xl font-semibold">
        Student Document System
      </h2>

      <div className="flex items-center gap-4">

        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-1 rounded"
        />

        <div className="bg-gray-300 w-8 h-8 rounded-full"></div>

      </div>

    </div>
  );
}

export default Navbar;