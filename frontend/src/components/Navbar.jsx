import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

function Navbar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length < 2) {
      setResults([]);
      setShow(false);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:3000/auth/search-students?q=${encodeURIComponent(value)}`
      );
      if (res.data.status === "success") {
        setResults(res.data.data);
        setShow(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelect = (id) => {
    setQuery("");
    setResults([]);
    setShow(false);
    navigate(`/student/${id}`);
  };

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold">Student Document System</h2>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          onBlur={() => setTimeout(() => setShow(false), 200)}
          placeholder="Search students..."
          className="border px-3 py-1 rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        {show && results.length > 0 && (
          <div className="absolute right-0 mt-1 w-64 bg-white border rounded-lg shadow-lg z-50">
            {results.map((student) => (
              <div
                key={student._id}
                onClick={() => handleSelect(student._id)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <p className="text-sm font-medium">{student.fullName}</p>
                <p className="text-xs text-gray-400">{student.course ?? "—"} • {student.status}</p>
              </div>
            ))}
          </div>
        )}

        {show && results.length === 0 && (
          <div className="absolute right-0 mt-1 w-64 bg-white border rounded-lg shadow-lg z-50">
            <p className="px-4 py-2 text-sm text-gray-400">No students found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;